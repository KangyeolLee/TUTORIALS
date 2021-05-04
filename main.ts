function add(a: number, b: number) {
  return a + b;
}

const sum: number = add(1, 2);

console.log(sum);

// --------------- tuple --------------- //

let tuple: [string, number];
tuple = ["a", 1];

console.log(tuple);

tuple = ["b", 2];

console.log(tuple);

tuple.push(3);
tuple.push("abc");
console.log(tuple);

// --------------- enum --------------- //

enum Week {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Week);
console.log(Week[0]);
console.log(Week.Sun);
console.log(Week["Sun"]);

// --------------- null & undefined --------------- //
/**
 * 기본적으로 null 과 undefined 는 모든 타입의 하위 타입 => 서로 할당도 가능
 * strictNullChecks: true 옵션을 통해 막을 수 있음
 * 그러나 void 에는 undefined 할당 가능
 */
let num: number = undefined;
let str: string = null;
let und: undefined = null;
let nul: null = undefined;
let voi: void = undefined;
