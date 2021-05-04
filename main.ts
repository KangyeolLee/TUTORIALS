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

function fnE(x: number | null | undefined) {
  // return (x as number).toFixed(2);

  // non-null 단언 연산자(!)를 통해 해결 가능
  // 특히 컴파일 환경에서 체크하기 어려운 DOM 사용에서 유용
  const str = x!.toFixed(2);
  document.querySelector(".menu-item")!.innerHTML;
}

// --------------- Type Guard --------------- //
/**
 * 타입을 매번 보장하기 위해 타입 단언을 여러 번 사용하게 되는 경우
 * 타입 가드를 제공하면 타입스크립트가 추론 가능한 특정 범위에서 타입을 보장 가능
 * Ex. NAME is TyYPE 형태
 */

function isNumber(val: string | number): val is number {
  return typeof val === "number";
}

function check(val: string | number) {
  if (isNumber(val)) {
    val.toFixed(2);
  } else {
    val.split("");
  }
}

// --------------- functional Interface --------------- //

interface IUser2 {
  name: string;
}

interface IGetUser {
  (name: string): IUser2;
}

const getUser: IGetUser = function (n) {
  const user: IUser2 = { name: n };
  return user;
};

console.log(getUser("Socra"));

// --------------- construct signature --------------- //

interface ICat {
  name: string;
}

interface ICatConstructor {
  // new 키워드를 사용하여 Constructor Signature Interface 생성
  new (name: string): ICat;
}

class Cat implements ICat {
  constructor(public name: string) {}
}

function makeKitten(c: ICatConstructor, n: string) {
  return new c(n);
}

const kitten = makeKitten(Cat, "Lucy");
console.log(kitten);

// --------------- index signature --------------- //
/**
 * 인덱싱에 사용할 인덱서(Indexer)의 이름과 타입 그리고 인덱싱 결과의 반환 값 지정
 * 타입은 string 또는 number 만 지정 가능
 */

interface IItem {
  [itemIndex: number]: string;
}

let item: IItem = ["a", "b", "c"];
console.log(item[0]);
console.log(item[1]);
// console.log(item["0"]);  Error - TS7015: ... index expression is not of type 'number'

interface IUser3 {
  // union 을 활용해 반환타입 지정 가능
  [userProp: string]: string | boolean;
}
let user2: IUser3 = {
  name: "Neo",
  email: "thesecon@gamil.com",
  isValid: true,
  0: false,
};

console.log(user2["name"]);
console.log(user2["email"]);
console.log(user2["isValid"]);

/**
 * keyof 를 사용하여 속성 이름을 타입으로 사용 가능
 * 인덱싱 가능 타입의 속성 이름들이 유니온 타입으로 적용
 */

interface ICountries {
  KR: "대한민국";
  US: "미국";
  DE: "독일";
}

let country: keyof ICountries; // 'KR' | 'US' | 'DE'
country = "KR";
country = "US";
// country = 'RS' Error - TS2322

let values: ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'DE' ]
values = "대한민국";
values = "미국";
