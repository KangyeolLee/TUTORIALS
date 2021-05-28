const sumArray = (numbers: number[]): number => {
  return numbers.reduce((acc, cur) => acc + cur, 0);
};

const total = sumArray([1, 2, 3, 4, 5]);

// ----------------------------------------------------------------
interface Shape {
  getArea: () => number;
}

class Circle implements Shape {
  // radius: number;

  constructor(public radius: number) {
    this.radius = radius;
  }

  getArea = (): number => {
    return this.radius * this.radius * Math.PI;
  };
}

class Reactangle implements Shape {
  // width: number;
  // height: number;

  constructor(private width: number, private height: number) {
    this.width = width;
    this.height = height;
  }

  getArea = (): number => {
    return this.width * this.height;
  };
}

const shapes: Shape[] = [new Circle(5), new Reactangle(10, 5)];

shapes.forEach((shape) => {
  console.log(shape.getArea());
});

// ----------------------------------------------------------------
interface Person {
  name: string;
  age?: number;
}
// interface Developer {
//   name: string;
//   age?: number;
//   skills: string[];
// }
interface Developer extends Person {
  skills: string[];
}

const person: Person = {
  name: 'KG',
  age: 20,
};

const expert: Developer = {
  name: 'GK',
  skills: ['js', 'ts'],
};

const people: Person[] = [person, expert];

// ----------------------------------------------------------------
type Person2 = {
  name: string;
  age?: number;
};

type Developer2 = Person2 & {
  skills: string[];
};

const person2: Person2 = {
  name: 'KK',
};

const dev2: Developer2 = {
  name: 'GG',
  skills: ['react', 'js', 'jsx', 'ts', 'tsx'],
  age: 44,
};

type People = Person[];
type People2 = Person2[];
const _people: People = [person, expert];
const __people: People2 = [person, expert];
const ___people: People2 = [person2, dev2];
const ____people: People = [person2, dev2];

// ----------------------------------------------------------------
const merge = <A, B>(a: A, b: B): A & B => {
  return { ...a, ...b };
};

const wrap = <T>(param: T) => {
  return { param };
};

const wrapped = wrap(true);
// const wrapped = wrap(10);
// const wrapped = wrap("true");

interface Items<T> {
  list: T[];
}

const items: Items<string> = {
  list: ['a', 'b', 'c', 'd'],
};

type Items2<T> = {
  list: T[];
};

const items2: Items2<number> = {
  list: [1, 2, 3, 4],
};

class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

export {};
