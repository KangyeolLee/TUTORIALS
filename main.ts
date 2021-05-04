function add(a: number, b: number) {
  return a + b;
}

const sum: number = add(1, 2);

console.log(sum);

let tuple: [string, number];
tuple = ["a", 1];

console.log(tuple);

tuple = ["b", 2];

console.log(tuple);

tuple.push(3);
tuple.push("abc");
console.log(tuple);
