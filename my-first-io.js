const fs = require("fs");
const target = process.argv[2];

const buffer = fs.readFileSync(target);
const str = buffer.toString();

const count = str.split("\n").length - 1;

console.log(count);
