const input = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`;

let real_input = input
  .trim()
  .split(",")
  .map((id) => id.trim().split("-"));

let invalid_IDs: number[] = [];

real_input.forEach(id => {
  let result = check_invalid(id as [string, string]);
  if (result) invalid_IDs.push(result);
})

// Part 1
function check_invalid(range: [string, string]) {
  let minLen = range[0].length;

  if (
    minLen % 2 !== 0 &&
    10 ** minLen > Number(range[1])
  ) return null;

  if (minLen % 2 !== 0) {
    range[0] = (10 ** range[0].length).toString();
    minLen = range[0].length;
  }

  let result = []

  let halfLen = minLen / 2;
  let multiplier = 10 ** halfLen + 1;

  let xMin = Math.ceil(Number(range[0]) / multiplier);
  let xMax = Math.floor(Number(range[1]) / multiplier);

  xMin = Math.max(xMin, 10 ** (halfLen - 1));
  xMax = Math.min(xMax, 10 ** halfLen - 1);

  for (let x = xMin; x <= xMax; x++) {
    let candidate = x * multiplier;
    result.push(candidate);
  }

  return result.reduce((a, b) => a + b, 0);
}

let sum = invalid_IDs.reduce((a, b) => a + b, 0)

console.log(`Part 1: ${sum}`)
