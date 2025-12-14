import fs from "fs/promises";

type Rule = [number, number];
type Update = number[];

function parseInput(input: string): { rules: Rule[]; updates: Update[] } {
  const [rulesSection, updatesSection] = input.trim().split("\n\n");

  const rules: Rule[] = rulesSection.split("\n").map(line =>
    line.split("|").map(Number) as Rule
  );

  const updates: Update[] = updatesSection.split("\n").map(line =>
    line.split(",").map(Number)
  );

  return { rules, updates };
}

function isCorrectOrder(update: Update, rules: Rule[]): boolean {
  const indexMap = new Map<number, number>(
    update.map((page, index) => [page, index])
  );

  return rules.every(([before, after]) =>
    !(indexMap.has(before) && indexMap.has(after) && indexMap.get(before)! > indexMap.get(after)!)
  );
}

function isIncorrectOrder(update: Update, rules: Rule[]): boolean {
  const indexMap = new Map<number, number>(
    update.map((page, index) => [page, index])
  );

  return rules.some(([before, after]) =>
    indexMap.has(before) && indexMap.has(after) && indexMap.get(before)! > indexMap.get(after)!
  );
}

function correctOrder(update: Update, rules: Rule[]): Update {
  const indexMap = new Map<number, number>();

  for (let corrected = true; corrected;) {
    corrected = false;
    update.forEach((page, index) => indexMap.set(page, index));

    for (const [before, after] of rules) {
      if (
        indexMap.has(before) &&
        indexMap.has(after) &&
        indexMap.get(before)! > indexMap.get(after)!
      ) {
        const beforeIndex = indexMap.get(before)!;
        const afterIndex = indexMap.get(after)!;

        [update[beforeIndex], update[afterIndex]] = [
          update[afterIndex],
          update[beforeIndex]
        ];

        corrected = true;
        break;
      }
    }
  }

  return update;
}

function findMiddlePage(update: Update): number {
  return update[Math.floor(update.length / 2)];
}

async function day5() {
  try {
    const input = await fs.readFile("input.txt", "utf8");

    const { rules, updates } = parseInput(input);

    const correctlyOrderedUpdates = updates.filter(update =>
      isCorrectOrder(update, rules)
    );

    const middlePagesSumPart1 = correctlyOrderedUpdates
      .map(findMiddlePage)
      .reduce((sum, page) => sum + page, 0);

    console.log(
      "Part 1 - Sum of middle pages from correctly ordered updates:",
      middlePagesSumPart1
    );

    const incorrectlyOrderedUpdates = updates.filter(update =>
      isIncorrectOrder(update, rules)
    );

    const correctedUpdates = incorrectlyOrderedUpdates.map(update =>
      correctOrder(update, rules)
    );

    const middlePagesSumPart2 = correctedUpdates
      .map(findMiddlePage)
      .reduce((sum, page) => sum + page, 0);

    console.log(
      "Part 2 - Sum of middle pages from incorrectly ordered updates:",
      middlePagesSumPart2
    );
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

day5();

