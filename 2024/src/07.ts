import * as fs from "fs";

let total = 0;

// Part 1
function canObtainPart1(target: number, array: number[]): boolean {
  if (array.length === 1) return target === array[0];

  const last = array[array.length - 1];
  const rest = array.slice(0, -1);

  if (target % last === 0 && canObtainPart1(target / last, rest)) return true;
  if (target > last && canObtainPart1(target - last, rest)) return true;

  return false;
}

// Part 2
function canObtainPart2(target: number, array: number[]): boolean {
  if (array.length === 1) return target === array[0];

  const last = array[array.length - 1];
  const rest = array.slice(0, -1);

  if (target % last === 0 && canObtainPart2(target / last, rest)) return true;
  if (target > last && canObtainPart2(target - last, rest)) return true;

  const sTarget = target.toString();
  const sLast = last.toString();

  if (
    sTarget.length > sLast.length &&
    sTarget.endsWith(sLast) &&
    canObtainPart2(parseInt(sTarget.slice(0, -sLast.length)), rest)
  ) {
    return true;
  }

  return false;
}

// Read the input file
const input: string = fs.readFileSync("input.txt", "utf-8");
const lines = input.split("\n");

// Part 1 logic
for (const line of lines) {
  if (!line.includes(": ")) continue;

  const [left, right] = line.split(": ");
  if (!right) continue;

  const target = parseInt(left);
  const array = right.split(" ").map((x) => parseInt(x));

  if (canObtainPart1(target, array)) {
    total += target;
  }
}

console.log("Part 1 result:", total);

// Reset total for Part 2
total = 0;

// Part 2 logic
for (const line of lines) {
  if (!line.includes(": ")) continue;

  const [left, right] = line.split(": ");
  if (!right) continue;

  const target = parseInt(left);
  const array = right.split(" ").map((x) => parseInt(x));

  if (canObtainPart2(target, array)) {
    total += target;
  }
}

console.log("Part 2 result:", total);

