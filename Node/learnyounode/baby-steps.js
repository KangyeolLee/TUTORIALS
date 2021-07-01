const numbers = process.argv.slice(2);
const sum = numbers.reduce((a, b) => +a + +b);

console.log(sum);
