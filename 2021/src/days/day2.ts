interface SyntaxNode {
  type: "forward" | "down" | "up";
  value: number;
}

const format = (file: string): SyntaxNode[] => {
  return file.split("\n").map((line) => {
    const [type, value] = line.split(" ");

    return {
      type: type as SyntaxNode["type"],
      value: Number(value),
    };
  });
};

export const day2Part1 = (file: string) => {
  const nodes = format(file);
  let depth = 0;
  let distance = 0;

  for (const node of nodes) {
    switch (node.type) {
      case "down":
        depth += node.value;
        break;
      case "up":
        depth -= node.value;
        break;
      case "forward":
        distance += node.value;
    }
  }

  return depth * distance;
};

export const day2Part2 = (file: string) => {
  const nodes = format(file);
  let aim = 0;
  let depth = 0;
  let distance = 0;

  for (const node of nodes) {
    switch (node.type) {
      case "down":
        aim += node.value;
        break;
      case "up":
        aim -= node.value;
        break;
      case "forward":
        distance += node.value;
        depth += aim * node.value;
    }
  }

  return depth * distance;
};
