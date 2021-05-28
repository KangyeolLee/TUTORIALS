"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var sumArray = function (numbers) {
    return numbers.reduce(function (acc, cur) { return acc + cur; }, 0);
};
var total = sumArray([1, 2, 3, 4, 5]);
var Circle = /** @class */ (function () {
    // radius: number;
    function Circle(radius) {
        var _this = this;
        this.radius = radius;
        this.getArea = function () {
            return _this.radius * _this.radius * Math.PI;
        };
        this.radius = radius;
    }
    return Circle;
}());
var Reactangle = /** @class */ (function () {
    // width: number;
    // height: number;
    function Reactangle(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.getArea = function () {
            return _this.width * _this.height;
        };
        this.width = width;
        this.height = height;
    }
    return Reactangle;
}());
var shapes = [new Circle(5), new Reactangle(10, 5)];
shapes.forEach(function (shape) {
    console.log(shape.getArea());
});
var person = {
    name: 'KG',
    age: 20,
};
var expert = {
    name: 'GK',
    skills: ['js', 'ts'],
};
var people = [person, expert];
var person2 = {
    name: 'KK',
};
var dev2 = {
    name: 'GG',
    skills: ['react', 'js', 'jsx', 'ts', 'tsx'],
    age: 44,
};
var _people = [person, expert];
var __people = [person, expert];
var ___people = [person2, dev2];
var ____people = [person2, dev2];
// ----------------------------------------------------------------
var merge = function (a, b) {
    return __assign(__assign({}, a), b);
};
var wrap = function (param) {
    return { param: param };
};
var wrapped = wrap(true);
var items = {
    list: ['a', 'b', 'c', 'd'],
};
var items2 = {
    list: [1, 2, 3, 4],
};
var Queue = /** @class */ (function () {
    function Queue() {
        this.list = [];
    }
    Object.defineProperty(Queue.prototype, "length", {
        get: function () {
            return this.list.length;
        },
        enumerable: false,
        configurable: true
    });
    Queue.prototype.enqueue = function (item) {
        this.list.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.list.shift();
    };
    return Queue;
}());
var queue = new Queue();
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
