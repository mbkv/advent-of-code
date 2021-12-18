interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

const isLineOnGrid = ({ start, end }: Line) => {
  return start.x === end.x || start.y === end.y;
};

const format = (file: string) => {
  const regex = /(\d+),(\d+) -> (\d+),(\d+)/g;

  return [...file.matchAll(regex)].map(
    ([_, x1, y1, x2, y2]): Line => ({
      start: {
        x: Number(x1),
        y: Number(y1),
      },
      end: {
        x: Number(x2),
        y: Number(y2),
      },
    })
  );
};

const getGrid = (lines: Line[]) => {
  const maxX =
    lines.reduce((a, b) => Math.max(a, b.start.x, b.end.x), -Infinity) + 1;
  const maxY =
    lines.reduce((a, b) => Math.max(a, b.start.y, b.end.y), -Infinity) + 1;

  const grid: number[][] = Array(maxY)
    .fill(null)
    .map(() => Array(maxX).fill(0));

  return grid;
};

const draw = (grid: number[][], line: Line) => {
  let { x, y } = line.start;
  const xInc = Math.sign(line.end.x - line.start.x);
  const yInc = Math.sign(line.end.y - line.start.y);
  while (x !== line.end.x || y !== line.end.y) {
    grid[y][x] += 1;

    x += xInc;
    y += yInc;
  }

  grid[line.end.y][line.end.x] += 1;
};

const getTotalPoints = (grid: number[][]) => {
  return grid
    .map((row) => row.filter((el) => el > 1).length)
    .reduce((a, b) => a + b);
};

export const day5Part1 = (file: string) => {
  const lines = format(file).filter(isLineOnGrid);
  const grid = getGrid(lines);

  for (const line of lines) {
    draw(grid, line);
  }

  return getTotalPoints(grid);
};

export const day5Part2 = (file: string) => {
  const lines = format(file);
  const grid = getGrid(lines);

  for (const line of lines) {
    draw(grid, line);
  }

  return getTotalPoints(grid);
};
