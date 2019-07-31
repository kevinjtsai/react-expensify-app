//values of the type object are arbitrary collections of properties
let rabbit = {};
rabbit.speak = (phrase) => {
  console.log(`The rabbit says, '${phrase}'`);
}
rabbit.speak("I''m alive!");

//console.log(rabbit.toString);

let array = [];

console.log(Object.getPrototypeOf(Function.prototype) == Object.prototype);

//constructor functions are capitalized by convention

/*
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = (line) => {
  console.log(`This ${this.type} says ${line}`);
}
*/

//class notation

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  //methods below are bound to Rabbit.prototype
  speak(line) {
    console.log(`This ${this.type} says ${line}`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

console.log(Object.getPrototypeOf(blackRabbit) == Rabbit.prototype);

Rabbit.prototype.teeth = "small";

killerRabbit.teeth = "long, sharp, bloody"; //override derived teeth prototype property for killerRabbit instance

console.log(`killerRabbit has ${killerRabbit.teeth} teeth.`);
console.log(`blackRabbit has ${blackRabbit.teeth} teeth.`);

console.log(Array.prototype.toString.call([1, 2]));
console.log(Object.prototype.toString.call([1, 2]));

//Using an object as a map requires setting the prototype to null to avoid unexpected properties like toString

console.log("toString" in {}); //true
console.log("toString" in Object.create(null)); //false

//Map data structure with set, get, has interface properties
let ages = new Map();
ages.set("Kevin", 31);
ages.set("Esther", 26);

console.log(`Kevin is ${ages.get("Kevin")} years old.`);
console.log(`Do we know Jack's age?`, ages.has("Jack")); //false
console.log(ages.has("toString")); //false

//Object.keys only returns

console.log({x: 1}.hasOwnProperty("x")); //true
console.log({x: 1}.hasOwnProperty("toString")); //false

//polymorphism with String function which calls an object's toString method
Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
}

console.log(String(killerRabbit));

//Symbols, unlike strings, are unique
let sym = Symbol("name");
console.log(sym == Symbol("name")); //false
Rabbit.prototype[sym] = 55;
console.log(Rabbit.prototype);

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
console.log([1, 2][toStringSymbol]());

//include symbol properties in object expressions and classes by using square brackets around the property name
//that causes the property name to be evaluated, much like the square bracket property access notation

let stringObject = {
  [toStringSymbol]()  { return "using a symbol as a property name"; }
};
console.log(stringObject[toStringSymbol]());

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next()); // {value: "O", done: false}
console.log(okIterator.next()); // {value: "K", done: false}
console.log(okIterator.next()); // {value: undefined, done: true}

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}

//getters, setters, and statics

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  //methods that have static written before their name are stored on the constructor
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

//let temp = new Temperature(22);
let temp = Temperature.fromFahrenheit(22);
console.log(temp.fahrenheit); // 71.6
temp.fahrenheit = 86;
console.log(temp.celsius); // 30

//inheritance with extends

class SymmetricMatrix extends Matrix { //inherit from Matrix instead of Object.prototype
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => { //call super class' constructor
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value); // set x,y to value using super class' set method
    if (x != y) {
      super.set(y, x, value); // also set y,x to value using super class' set method
    }
  }
}

//0,0	1,0	2,0	3,0	4,0
//0,1	1,1	2,1	3,1	4,1
//0,2	2,1	2,2	3,2	4,2
//0,3	3,1	3,2	3,3	4,3
//0,4	4,1	4,2	4,3	4,4

let symmetricMatrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix.get(2, 3));