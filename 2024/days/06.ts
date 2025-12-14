import * as fs from 'fs';

type Position = [number, number];

function simulateGuardPath(map: string[]): [boolean, Set<string>] {
  const directions: Position[] = [
    [-1, 0], // up
    [0, 1],  // right
    [1, 0],  // down
    [0, -1], // left
  ];

  let guardPosition: Position | null = null;
  for (let r = 0; r < map.length; r++) {
    const c = map[r].indexOf("^");
    if (c !== -1) {
      guardPosition = [r, c];
      break;
    }
  }

  if (!guardPosition) return [false, new Set()];

  let [r, c] = guardPosition;
  let directionIndex = 0;
  const visitedPositions = new Set<string>();
  visitedPositions.add(`${r},${c}`);

  const stateSet = new Set<string>();

  while (true) {
    const [dr, dc] = directions[directionIndex];
    const nr = r + dr, nc = c + dc;

    if (nr < 0 || nr >= map.length || nc < 0 || nc >= map[0].length) {
      break;
    }

    const nextCell = map[nr][nc];

    if (nextCell === "#") {
      directionIndex = (directionIndex + 1) % 4;

      const state = `${r},${c},${directionIndex}`;
      if (stateSet.has(state)) {
        return [true, visitedPositions];
      }
      stateSet.add(state);
    } else {
      r = nr;
      c = nc;
      visitedPositions.add(`${r},${c}`);

      const state = `${r},${c},${directionIndex}`;
      if (stateSet.has(state)) {
        return [true, visitedPositions];
      }
      stateSet.add(state);
    }
  }

  return [false, visitedPositions];
}

function simulateGuardLoop(visitedPositions: Set<string>, originalMap: string[]): void {
  let rockLoop = 0;

  visitedPositions.forEach((position) => {
    const mapClone = originalMap.map((row) => row.split(""));

    const [r, c] = position.split(",").map((x) => parseInt(x, 10));

    if (mapClone[r][c] === "^") return;

    mapClone[r][c] = "#";
    const result = simulateGuardPath(mapClone.map((row) => row.join("")));

    if (result[0]) rockLoop++;
  });

  console.log("Number of loops detected by placing rocks:", rockLoop);
}

function readAndProcessInput(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.split('\n').map(line => line.trim());
}

function main() {
  const filePath = 'input.txt';
  const map = readAndProcessInput(filePath);

  const [loopDetected, visitedPositions] = simulateGuardPath(map);
  console.log("Number of distinct positions visited:", visitedPositions.size);

  simulateGuardLoop(visitedPositions, map);
}

main();

