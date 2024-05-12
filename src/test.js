const generateCombinition = (n) => {
  const generations = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        const newGen = [i, j, k];
        // const sorted = newGen.sort((a, b) => a - b);
        generations.push(newGen.join("-"));
      }
    }
  }

  // const list = [...new Set(generations)];

  return generations.map((element) => {
    return {
      a: element.split("-")[2],
      b: element.split("-")[1],
      c: element.split("-")[0],
    };
  });
};

const getExe = (n) => {
  const gen = generateCombinition(n);
  let i = 0;
  gen.forEach((g) => {
    let math =
      Math.sqrt(Math.pow((g.a * g.b) / (g.b + g.c), 2) + Math.pow(g.b, 2)) +
      Math.sqrt(
        Math.pow(g.a - (g.a * g.b) / (g.b + g.c), 2) + Math.pow(g.c, 2)
      );
    // console.log(math)
    if (math % 1 === 0) {
      i = i + 1;
    }
  });
  return i;
};

function solution(a, b, c) {
  let result = 0;

  for (let a = 1; ; a++) {
    for (let b = 1; b <= a; b++) {
      for (let c = 1; c <= b; c++) {
        if (shortestPathIsInteger(a, b, c)) {
          result += 1;

          if (result > 1000000) {
            return a;
          }
        }
      }
    }
  }
}

console.log(getExe(100));
