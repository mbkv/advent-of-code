import { readFile } from "fs/promises";
import path from "path";
import { day7Part1, day7Part2 } from "./days/day7";

const main = async () => {
  const filename = path.join(__dirname, "inputs", "day7.txt");

  const file = await readFile(filename);

  console.log(day7Part2(file.toString()));
};

main();
