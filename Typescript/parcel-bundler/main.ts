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

// --------------- Type --------------- //
/**
 * interface vs type
 * 과거 버전에서는 type의 경우는 implements 혹은 extends 와 같은 확장 옵션 사용 불가
 * 최근 버전에서는 union이 사용된경우를 제외하고 extends, implements 모두 interface와 동일하게 동작
 * interface는 같은 이름으로 여러 번 선언해도 컴파일 시점에서 하나의 단위로 합쳐지지만
 * type의 경우는 같은 이름을 여러 번 선언 불가
 * interface로 표현할 수 없는 형태이거나 union 또는 tuple 을 이용해야 하는 경우엔 type 추천
 */

type TUser =
  | {
      name: string;
      age: number;
      isValid: boolean;
    }
  | [string, number, boolean];

let userA: TUser = {
  name: "KG",
  age: 18,
  isValid: true,
};

let userB: TUser = ["SJ", 29, false];

// --------------- Generics --------------- //
/**
 * Generic은 재사용 목적으로 함수 또는 클래스 선언 시점이 아닌,
 * 사용 시점에 타입을 선언할 수 있는 방법을 제공 (타입을 인자로 받아서 사용하는것과 유사)
 */

function toArray(a: number, b: number): number[] {
  return [a, b];
}
toArray(1, 2);
// toArray('1', '2')  Error - TS2345

// union 을 이용해 해결할 수 있지만
// 1. 가독성이 떨어지고
// 2. 3번의 호출처럼 의도치 않은 경우 발생 가능
function toArrayExtend(
  a: number | string,
  b: number | string
): (number | string)[] {
  return [a, b];
}
toArrayExtend(1, 2);
toArrayExtend("1", "2");
toArrayExtend(1, "2");

function toArrayGeneric<T>(a: T, b: T) {
  return [a, b];
}
toArrayGeneric<number>(1, 2);
toArrayGeneric<string>("1", "2");
// 타입 추론 활용 가능
toArrayGeneric(1, 2);
toArrayGeneric("1", "2");

// --------------- Constraints --------------- //
/**
 * 인터페이스 또는 타입 별칭을 사용하는 제너릭 작성 가능
 */

// 1. 별도의 제약 조건이 없는 경우 - 모든 타입 허용
interface MyType<T> {
  name: string;
  value: T;
}

const dataA: MyType<string> = {
  name: "KG",
  value: "hello world",
};

const dataB: MyType<number> = {
  name: "HG",
  value: 12345,
};

const dataC: MyType<number[]> = {
  name: "SJ",
  value: [1, 2, 3, 4, 5],
};

// 2. 제약 조건은 extends 를 이용해 추가 가능
// Ex. 제너릭변수 T가 string 과 number 일때만 허용하는 경우

interface MyTypeConstranints<T extends string | number> {
  name: string;
  value: T;
}

// --------------- Conditional Types --------------- //
/**
 * 제약 조건과 다르게 '타입 구현' 영역에서 사용하는 extends는
 * 삼항연산자 사용 가능 => 조건부 타입
 */
type U = string | number | boolean;
type MyTypeEx<T> = T extends U ? string : never;

interface MyInterEx<T> {
  name: string;
  age: T extends U ? number : never;
}

interface MyUser<T extends boolean> {
  name: string;
  // T의 타입이 true면 string, false인 경우 number 반환
  age: T extends true ? string : number;
}

// --------------- function overload --------------- //
/**
 * 함수의 이름은 같지만 매개변수 타입과 반환 타입이 다른
 * 여러 함수를 가질 수 있는 것
 * 여러개의 선언부와 1개의 구현부
 * 함수 선언부와 구현부의 매개변수 개수는 동일해야 함
 * 함수 구현부에는 주로 any 사용
 */

function addOverload(a: string, b: string): string; // 선언부
function addOverload(a: number, b: number): number; // 선언부
function addOverload(a: any, b: any): any {
  // 구현부
  return a + b;
}

// --------------- Class --------------- //
/**
 * 클래스의 생성자(constructor)와 일반 메소드 멤버와는 다르게
 * 클래스 속성(Properties)은 클래스 바디에 별도로 타입을 선언
 */

class Aniaml {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class MyCat extends Aniaml {
  getName(): string {
    return `Cat name is ${this.name}`;
  }
}

let myCat: MyCat = new MyCat("Lucy");
console.log(myCat.getName());

/**
 * 3가지 접근 제어자 지원
 * 1. public : 어디서나 자유롭게 접근 가능 (생략가능)
 * 2. protected : 나와 파생된 후손 클래스 내에서 접근 가능
 * 3. private : 내 클래스에서만 접근 가능
 * 최근 ECMA 스펙 stage3에 JS 자체에서 '#'을 통해 private 접근 제어자 기능 제공
 * 접근 제어자와 같이 쓸 수 있는 수식어
 * 1. static : 정적으로 사용
 * 2. readonly : 읽기전용으로 사용 (속성값에만 할당 가능)
 */

class PrivateAnimal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class PrivateCat extends PrivateAnimal {
  getName(): string {
    return `Cat name is ${this.name}`; // Error - TS2341
  }
}

let privateCat = new PrivateCat("Lucy");
console.log(privateCat.getName());
console.log(privateCat.name); // Error - TS2341

// 생성자에서 인수 타입 선언과 동시에 접근 제어자를 사용하면
// 바로 속성 멤버로 정의할 수 있다.

class AutoCat {
  constructor(public name: string, protected age: number) {}
  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}

let autoCat = new AutoCat("Neo", 2);
console.log(autoCat.getName());
console.log(autoCat.getAge());

// 접근제어자 + 수식어 순서로 작성 가능

class Test {
  public readonly name: string;
  protected static eyes: number;
  constructor(n: string) {
    this.name = n;
    // static 값은 클래스 바디에서 초기화가 불가하기에
    // 생성자 혹은 메소드에서 초기화 필요
    Test.eyes = 2;
  }

  private static getLeg() {
    return 5;
  }
}

/**
 * 추상 클래스
 * 인터페이스와 굉장히 유사
 * 클래스뿐만 아니라 속성과 메소드에서도 사용 가능
 * 직접 인스턴스 생성이 불가하기 때문에
 * 파생된 후손 클래스에서 인스턴스 생성 필요
 */

abstract class Abstract {
  abstract name: string; // 파생된 클래스에서 구현되어야 함
  abstract getName(): string; // 파생된 클래스에서 구현되어야 함
}

class ACat extends Abstract {
  constructor(public name: string) {
    super();
  }

  getName() {
    return this.name;
  }
}

const aCat = new ACat("Lucy");
console.log(aCat.getName());

interface IAnimal {
  name: string;
  getName(): string;
}

class Dog implements IAnimal {
  constructor(public name: string) {}
  getName() {
    return this.name;
  }
}

// --------------- Optional Chaining --------------- //
/**
 * 기존 Type Assertion 등으로 해결하던 문제를
 * 체이닝으로 간단히 해결할 수 있다
 * && 연산자를 사용해 각 속성을 Nullish 체크하는 부분에서 특히 유용
 */

function toString(str: string | undefined) {
  return (str as string).toString();
}

function toStringOptionalChaining(str?: string) {
  return str?.toString();
}
const foo = {
  bar: {
    baz: "hello world",
  },
};

if (foo && foo.bar && foo.bar.baz) {
  console.log(1);
}

if (foo?.bar?.baz) {
  console.log(1);
}

// --------------- Nullish coalescing operator --------------- //
/**
 * 일반적으로 논리 연산자 || 를 사용하여 Falsy 체크를 진행
 * 이때 0이나 ''와 같은 값을 유효 값으로 사용하면 원치 않은 결과 리턴 가능
 * Nullish 병합 연산자 ?? 를 사용하여 해결 가능
 * JS에서도 ES2020에 추가됨
 * 왼쪽 피연산자가 null 또는 undefined 일때 오른쪽 피연산자를 반환하고,
 * 그렇지 않으면 왼쪽 피연산자를 반환
 */

const test1 = null ?? "default string";
const test2 = 0 ?? 42;

console.log(test1, test2);
