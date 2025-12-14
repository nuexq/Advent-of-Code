import fs from "fs/promises";

async function part1(input: string): Promise<void> {
  const lines: string[][] = input
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.split(""));

  let newInput: string[][] = Array.from({ length: lines.length }, () =>
    Array(lines[0].length).fill("."),
  );

  let c1 = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      let horz = [
        lines[y][x],
        lines[y][x + 1],
        lines[y][x + 2],
        lines[y][x + 3],
      ];
      if (["XMAS", "SAMX"].includes(horz.join(""))) {
        c1 += 1;
        newInput[y][x] = lines[y][x];
        newInput[y][x + 1] = lines[y][x + 1];
        newInput[y][x + 2] = lines[y][x + 2];
        newInput[y][x + 3] = lines[y][x + 3];
      }

      if (y + 3 < lines.length) {
        let vert = [
          lines[y][x],
          lines[y + 1][x],
          lines[y + 2][x],
          lines[y + 3][x],
        ];
        if (["XMAS", "SAMX"].includes(vert.join(""))) {
          c1 += 1;
          newInput[y][x] = lines[y][x];
          newInput[y + 1][x] = lines[y + 1][x];
          newInput[y + 2][x] = lines[y + 2][x];
          newInput[y + 3][x] = lines[y + 3][x];
        }
      }

      if (y + 3 < lines.length) {
        let tlbr = [
          lines[y][x],
          lines[y + 1][x + 1],
          lines[y + 2][x + 2],
          lines[y + 3][x + 3],
        ];
        if (["XMAS", "SAMX"].includes(tlbr.join(""))) {
          c1 += 1;
          newInput[y][x] = lines[y][x];
          newInput[y + 1][x + 1] = lines[y + 1][x + 1];
          newInput[y + 2][x + 2] = lines[y + 2][x + 2];
          newInput[y + 3][x + 3] = lines[y + 3][x + 3];
        }
      }

      if (y + 3 < lines.length) {
        let trbl = [
          lines[y][x],
          lines[y + 1][x - 1],
          lines[y + 2][x - 2],
          lines[y + 3][x - 3],
        ];
        if (["XMAS", "SAMX"].includes(trbl.join(""))) {
          c1 += 1;
          newInput[y][x] = lines[y][x];
          newInput[y + 1][x - 1] = lines[y + 1][x - 1];
          newInput[y + 2][x - 2] = lines[y + 2][x - 2];
          newInput[y + 3][x - 3] = lines[y + 3][x - 3];
        }
      }
    }
  }
  console.log("Part 1 Answer:", c1);
}

async function part2(input: string): Promise<void> {
  const lines: string[][] = input
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.split(""));

  let c2 = 0;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (y + 2 < lines.length) {
        let scan = [
          [lines[y][x], lines[y][x + 1], lines[y][x + 2]],
          [lines[y + 1][x], lines[y + 1][x + 1], lines[y + 1][x + 2]],
          [lines[y + 2][x], lines[y + 2][x + 1], lines[y + 2][x + 2]],
        ];
        let diag1 = [scan[0][0], scan[1][1], scan[2][2]];
        let diag2 = [scan[0][2], scan[1][1], scan[2][0]];

        if (
          ["MAS", "SAM"].includes(diag1.join("")) &&
          ["MAS", "SAM"].includes(diag2.join(""))
        )
          c2 += 1;
      }
    }
  }
  console.log("Part 2 Answer:", c2);
}

async function day4() {
  try {
    const input = await fs.readFile("input.txt", "utf8");

    await part1(input);
    await part2(input);
  } catch (err) {
    console.error("Error processing the file:", err);
  }
}

day4();
