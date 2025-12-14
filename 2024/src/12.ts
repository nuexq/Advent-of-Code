import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

const grid = input
  .split("\n")
  .filter((x) => x.trim() !== "")
  .map((row) => row.split(""));

const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];


// part 1
let regionDetails: any = [];

function calculateRegionPropertiesP1(
  x: number,
  y: number,
  visited: Set<string>,
  regionKey: string,
) {
  const key = `${x},${y}`;
  if (visited.has(key)) return { area: 0, perimeter: 0 };
  visited.add(key);

  let localArea = 1;
  let localPerimeter = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
      localPerimeter++;
    } else if (grid[nx][ny] !== regionKey) {
      localPerimeter++;
    } else if (!visited.has(`${nx},${ny}`)) {
      const { area, perimeter } = calculateRegionPropertiesP1(
        nx,
        ny,
        visited,
        regionKey,
      );
      localArea += area;
      localPerimeter += perimeter;
    }
  }

  return { area: localArea, perimeter: localPerimeter };
}

const visitedP1 = new Set<string>();

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    const regionKey = grid[r][c];
    const cellKey = `${r},${c}`;

    if (!visitedP1.has(cellKey)) {
      const { area: regionArea, perimeter: regionPerimeter } =
        calculateRegionPropertiesP1(r, c, visitedP1, regionKey);

      regionDetails.push({
        key: regionKey,
        area: regionArea,
        perimeter: regionPerimeter,
      });
    }
  }
}

let totalP1 = 0;

regionDetails.forEach(({ area, perimeter }) => {
  const cost = area * perimeter;
  totalP1 += cost;
});

console.log("Part 1:", totalP1);
