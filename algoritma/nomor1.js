const string = "NEGIE1";
const angka = string.charAt(string.length - 1);
let karakter = string.slice(0, -1);
karakter = karakter.split("").reverse().join("");
const hasil = karakter + angka;
console.log(hasil);
