import fs from "fs/promises";

async function part1(input: string) {
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  const matches = input.match(mulRegex) || [];
  const result = matches.map((match) => {
    const [num1, num2] = match
      .slice(4, -1)
      .split(",")
      .map(Number);
    return num1 * num2;
  });
  const finalResult = result.reduce((acc, num) => acc + num, 0);
  console.log("Part 1 Answer:", finalResult);
}

async function part2(input: string) {
  const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
  const mulRegex = /mul\((\d+),(\d+)\)/;
  const matches = input.match(regex) || [];
  let isDo = true;
  const result = [];

  for (const match of matches) {
    if (match.startsWith("mul") && isDo) {
      const nums = match.match(mulRegex).slice(1).map(Number);
      result.push(nums.reduce((acc, num) => acc * num, 1));
    } else if (match === "don't()") {
      isDo = false;
    } else if (match === "do()") {
      isDo = true;
    }
  }

  const finalResult = result.reduce((acc, num) => acc + num, 0);
  console.log("Part 2 Answer:", finalResult);
}

async function day3() {
  try {
    const input = await fs.readFile("input.txt", "utf8");

    await part1(input);
    await part2(input); 
  } catch (err) {
    console.error("Error processing the file:", err);
  }
}

day3();

