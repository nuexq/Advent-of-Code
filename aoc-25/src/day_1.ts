const CIRCLE_SIZE = 100;
const START = 50;

const rotations_document = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`;

const rotations = rotations_document.trim().split(/\r?\n/);

const parseRotation = (rotation: string) => {
  const [direction, ...rest] = [...rotation];
  return [direction, Number(rest.join(""))] as const;
};

// Part 1
const countZerosAtEnd = (rotations: string[], start: number) => {
  let pointer = start;
  let zeroCount = 0;

  rotations.forEach(rotation => {
    const [direction, distance] = parseRotation(rotation);

    pointer = (pointer + (direction === "R" ? distance : -distance + CIRCLE_SIZE)) % CIRCLE_SIZE;
    if (pointer === 0) zeroCount++;
  });

  return zeroCount;
};

// Part 2
const countZerosDuring = (rotations: string[], start: number) => {
  let pointer = start;
  let zeroCount = 0;

  rotations.forEach(rotation => {
    const [direction, distance] = parseRotation(rotation);
    const step = direction === "R" ? 1 : -1;

    for (let i = 0; i < distance; i++) {
      pointer = (pointer + step + CIRCLE_SIZE) % CIRCLE_SIZE;
      if (pointer === 0) zeroCount++;
    }
  });

  return zeroCount;
};

console.log("Part 1 zeros:", countZerosAtEnd(rotations, START));
console.log("Part 2 zeros:", countZerosDuring(rotations, START));

