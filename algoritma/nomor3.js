const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

const cekArray = (array1, array2) => {
  const output = array2.map((value) => {
    let count = 0;

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === value) {
        count++;
      }
    }

    array1 = array1.filter((v) => v !== value);

    return count;
  });

  return output;
};

console.log(cekArray(INPUT, QUERY));
