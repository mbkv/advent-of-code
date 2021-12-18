const getMostCommonBits = (bitsArray: string[]) => {
  const array: number[] = Array(bitsArray[0].length).fill(0);

  for (let i = 0; i < array.length; i++) {
    array[i] = getMostCommonBitAt(bitsArray, i, 1);
  }

  return array.join("");
};

const getMostCommonBitAt = (
  bitsArray: string[],
  index: number,
  tieBreaker: 1 | 0
) => {
  const bits = bitsArray.map((bits) => Number(bits[index]));
  const ones = bits.reduce((a, b) => a + b);
  const zeros = bitsArray.length - ones;

  return ones === zeros ? tieBreaker : ones > zeros ? 1 : 0;
};

const format = (file: string) => file.split("\n").filter((el) => el);

const inverseBits = (bits: string) =>
  [...bits].map((bit) => (bit === "1" ? 0 : 1)).join("");

export const day3Part1 = (file: string) => {
  const bits = getMostCommonBits(format(file));

  const gamma = parseInt(bits, 2);
  const epsilon = parseInt(inverseBits(bits), 2);

  return gamma * epsilon;
};

const filterBits = (bitArray: string[], inverse?: boolean) => {
  for (let i = 0; bitArray.length > 1 && i < bitArray[0].length; i++) {
    const mostCommonBit = getMostCommonBitAt(bitArray, i, 1);
    const bit = String(Number(Number(!inverse) === mostCommonBit));
    bitArray = bitArray.filter((bits) => bits[i] === bit);
  }

  return bitArray[0];
};

export const day3Part2 = (file: string) => {
  const bits = format(file);

  const oxygen = filterBits(bits);
  const co2Scrubber = filterBits(bits, true);

  console.log({ oxygen, co2Scrubber });

  return parseInt(oxygen, 2) * parseInt(co2Scrubber, 2);
};
