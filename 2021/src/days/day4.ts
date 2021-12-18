interface Board {
  grid: number[][];
  horizontal: Map<number, Set<number>[]>;
  vertical: Map<number, Set<number>[]>;
}

interface Game {
  rolls: number[];
  boards: Set<Board>;
}

const format = (file: string): Game => {
  const split = file.split("\n\n");
  const rolls = split[0].split(",").map((el) => Number(el));
  const getBoard = (board: string): Board => {
    const grid = board
      .split("\n")
      .filter((row) => row)
      .map((row) =>
        row
          .trim()
          .split(/\s+/g)
          .map((el) => Number(el))
      );

    const buildMap = (sets: Set<number>[]) => {
      const map = new Map<number, Set<number>[]>();

      for (const set of sets) {
        for (const el of set) {
          if (!map.has(el)) {
            map.set(el, []);
          }

          map.get(el)!.push(set);
        }
      }

      return map;
    };

    const horizontal = grid.map((row) => new Set(row));

    const vertical: Set<number>[] = [];

    for (let column = 0; column < grid.length; column++) {
      const set = new Set<number>();
      for (const row of grid) {
        set.add(row[column]);
      }
      vertical.push(set);
    }

    return {
      grid,
      horizontal: buildMap(horizontal),
      vertical: buildMap(vertical),
    };
  };

  return {
    rolls,
    boards: new Set(split.slice(1).map(getBoard)),
  };
};

const getScore = (map: Board["horizontal"], lastNumber: number) => {
  const sets = [...map.values()].flat();
  const references = new WeakSet();

  let sum = 0;
  for (const set of sets) {
    if (references.has(set)) {
      continue;
    }
    references.add(set);

    for (const el of set) {
      sum += el;
    }
  }

  return sum * lastNumber;
};

export const day4Part1 = (file: string) => {
  const game = format(file);

  for (const roll of game.rolls) {
    for (const board of game.boards) {
      const sets = [
        ...(board.vertical.get(roll) ?? []),
        ...(board.horizontal.get(roll) ?? []),
      ];

      for (const set of sets) {
        set.delete(roll);
        if (set.size === 0) {
          return getScore(board.horizontal, roll);
        }
      }
    }
  }
};

export const day4Part2 = (file: string) => {
  const game = format(file);

  for (const roll of game.rolls) {
    for (const board of game.boards) {
      const sets = [
        ...(board.horizontal.get(roll) ?? []),
        ...(board.vertical.get(roll) ?? []),
      ];

      for (const set of sets) {
        set.delete(roll);
      }
      for (const set of sets) {
        if (set.size === 0) {
          if (game.boards.size === 1) {
            console.log(
              roll,
              new Set([...board.horizontal.values()].flat()),
              board.grid
            );
            return getScore(board.horizontal, roll);
          }

          game.boards.delete(board);
          continue;
        }
      }
    }
  }
};
