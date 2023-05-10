const sentence = "Saya sangat senang mengerjakan soal algoritma";

const longest = (sentence) => {
  const arraySentence = sentence.split(" ");
  let result;
  let max = 0;
  for (let i = 0; i < arraySentence.length; i++) {
    if (arraySentence[i].length > max) {
      max = arraySentence[i].length;
      result = `${arraySentence[i]}: ${max} character`;
    }
  }
  return result;
};

console.log(longest(sentence));
