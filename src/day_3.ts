let input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

let banks = input.trim().split("\n");
let results: number[] = [];

banks.forEach(bank => {
  let firstLargest: number | undefined;
  let secondLargest: number | undefined;
  let combinedNumber: number | undefined;

  for (let i = 0; i < bank.length; i++) {
    const digit = Number(bank[i]);

    if (firstLargest === undefined) {
      firstLargest = digit;
      continue;
    }

    if (secondLargest === undefined) {
      secondLargest = digit;
    } else {
      if (digit > secondLargest) {
        secondLargest = digit;
      }
    }

    combinedNumber = (firstLargest * 10) + secondLargest;

    if (digit > firstLargest) {
      firstLargest = digit;
      secondLargest = undefined;
      continue;
    }
  }

  results.push(combinedNumber!);
});

console.log("Part 1: " + results.reduce((a, b) => a + b, 0));
