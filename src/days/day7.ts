const format = (file: string) => {
  return file.split(",").map((el) => Number(el));
};

const calculate = (crabs: number[], index: number) =>
  crabs.reduce((a, b) => a + Math.abs(b - index), 0);

export const day7Part1 = (file: string) => {
  const crabs = format(file).sort((a, b) => a - b);
  let maxValue = crabs[crabs.length - 1];
  let min = Infinity;

  for (let position = 0; position < maxValue; position++) {
    min = Math.min(min, calculate(crabs, position));
  }

  return min;
};

const getMovementCosts = (max: number) => {
  const arr: number[] = [];
  let cost = 0;
  for (let i = 0; i < max; i++, cost += i) {
    arr.push(cost);
  }
  return arr;
};

const costs = getMovementCosts(10000);

const calculatePart2 = (crabs: number[], position: number) => {
  return crabs.reduce((a, b) => a + costs[Math.abs(b - position)], 0);
};

export const day7Part2 = (file: string) => {
  const crabs = format(file).sort((a, b) => a - b);
  let maxValue = crabs[crabs.length - 1];
  let min = Infinity;

  for (let position = 0; position < maxValue; position++) {
    const cost = calculatePart2(crabs, position);
    min = Math.min(min, cost);
  }
  console.log(costs);

  return min;
};
