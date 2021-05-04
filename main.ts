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

// --------------- union & intersection --------------- //

let union: string | number;
union = "Hello World";
union = 123;

interface IUser {
  name: string;
  age: number;
}

interface IValidation {
  isValid: boolean;
}

const neo: IUser & IValidation = {
  name: "Neo",
  age: 85,
  isValid: true,
};

// --------------- function in 2 ways --------------- //

function first(num: number): void {
  console.log(num);
}

const second = (num: number): void => {
  console.log(num);
};

// --------------- Assertions --------------- //
/**
 * 프로그래머가 타입스크립트보다 타입을 더 잘 이해하고 있는 상황에서
 * 타입스크립트가 타입 추론을 통해 판단할 수 있는 타입 범주를 넘는 경우
 * 더 이상 추론하지 않도록 지시
 */

function someFunc(val: string | number, isNumber: boolean) {
  if (isNumber) {
    // val.toFixed(2);
    // Error = TS2339: ... Property 'toFixed' does not exist on type 'string'

    // 1. Assertion
    (val as number).toFixed(2);

    // 2. JSX(TSX) 경우엔 파싱에 문제 발생
    (<number>val).toFixed(2);
  }
}
