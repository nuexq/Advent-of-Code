import * as fs from "fs";

// Read the input file
const input: string = fs.readFileSync("input.txt", "utf-8");
const grid = input
  .split("\n")
  .filter((x) => x.trim() !== "")
  .map((x) => x.split(""));

const rows = grid.length;
const cols = grid[0].length;

// Part 1: Antenna nodes
let antennas = new Map<string, [number, number][]>();

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] !== ".") {
      if (!antennas.has(grid[row][col])) antennas.set(grid[row][col], []);
      antennas.set(grid[row][col], [
        ...antennas.get(grid[row][col])!,
        [row, col],
      ]);
    }
  }
}

let antinodes = new Map<string, [number, number][]>();
let seenAntinodes = new Set<string>();
let resultPart1: number = 0;

for (const [key, value] of antennas.entries()) {
  let possible = new Set<string>();

  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const pair = `${value[i]}|${value[j]}`;

      const antinodesPair = [
        [2 * value[j][0] - value[i][0], 2 * value[j][1] - value[i][1]],
        [2 * value[i][0] - value[j][0], 2 * value[i][1] - value[j][1]],
      ];

      const validAntinodes = antinodesPair.filter(
        ([x, y]) => x >= 0 && x < rows && y >= 0 && y < cols
      );

      const uniqueAntinodes = validAntinodes.filter(([x, y]) => {
        const coord = `${x},${y}`;
        if (seenAntinodes.has(coord)) return false;
        seenAntinodes.add(coord);
        return true;
      });

      // Skip if no unique valid antinodes remain
      if (uniqueAntinodes.length === 0) continue;

      possible.add(pair);
      antinodes.set(pair, uniqueAntinodes);
      resultPart1 += uniqueAntinodes.length;
    }
  }
}

console.log("Part 1 result:", resultPart1);

// Part 2: Antinode generation
let antennasPart2 = new Map<string, [number, number][]>();

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    const char = grid[r][c];
    if (char !== ".") {
      if (!antennasPart2.has(char)) antennasPart2.set(char, []);
      antennasPart2.get(char).push([r, c]);
    }
  }
}

// Initialize the antinodes set for part 2
let antinodesPart2 = new Set<string>();

for (const array of antennasPart2.values()) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i === j) continue;
      let [r1, c1] = array[i];
      let [r2, c2] = array[j];
      const dr = r2 - r1;
      const dc = c2 - c1;
      while (0 <= r1 && r1 < rows && 0 <= c1 && c1 < cols) {
        antinodesPart2.add(`${r1},${c1}`);
        r1 += dr;
        c1 += dc;
      }
    }
  }
}

const validAntinodesPart2 = [...antinodesPart2].filter((coord) => {
  const [r, c] = coord.split(",").map(Number);
  return r >= 0 && r < rows && c >= 0 && c < cols;
});

console.log("Part 2 result:", validAntinodesPart2.length);
