interface Fish {
  timer: number;
}

interface SchoolOfFish {
  byAge: Map<number, number>;
}

const format = (file: string): SchoolOfFish => {
  const timers = file.split(",").map((el) => Number(el));

  const map: SchoolOfFish["byAge"] = new Map();

  for (const timer of timers) {
    map.set(timer, (map.get(timer) ?? 0) + 1);
  }

  return {
    byAge: map,
  };
};

const ageFish = ({ byAge }: SchoolOfFish): SchoolOfFish => {
  const map: SchoolOfFish["byAge"] = new Map();

  for (const [age, amount] of byAge) {
    if (age > 0) {
      map.set(age - 1, amount);
    }
  }
  map.set(8, byAge.get(0) ?? 0);
  map.set(6, (byAge.get(0) ?? 0) + (map.get(6) ?? 0));

  return { byAge: map };
};

const run = (school: SchoolOfFish, amount: number) => {
  for (let i = 0; i < amount; i++) {
    school = ageFish(school);
  }

  return [...school.byAge.values()].reduce((a, b) => a + b);
};

export const day6Part1 = (file: string) => {
  return run(format(file), 80);
};

export const day6Part2 = (file: string) => {
  return run(format(file), 256);
};
