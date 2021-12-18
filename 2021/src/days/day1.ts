const getIncreasingValues = (arr: number[]) => {
  return arr.reduce(
    (sum, currentValue, index) => sum + Number(currentValue > arr[index - 1]),
    0
  );
};

const format = (input: string) => {
  const array = input.split("\n");

  return array.map((el) => Number(el));
};

export const day1Part1 = (input: string) => {
  getIncreasingValues(format(input));
};

export const day1Part2 = (input: string) => {
  const arr = format(input);
  const chunks = 3;

  for (let i = 0; i + chunks - 1 < arr.length; i++) {
    arr[i] += arr[i + 1] + arr[i + 2];
  }

  return getIncreasingValues(arr.slice(0, -2));
};
