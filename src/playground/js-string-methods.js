let string = "coconut";

//has array like methods
console.log(string.slice(0, 4), string.slice(4, 7));
console.log(string.indexOf("u"));

//string method can search for more than one element
console.log("hello ee".indexOf("ee"));

//trim to remove white space
console.log(" okay \n".trim());

console.log(String(6).padStart(3, "0"));

//split and join methods
let sentence = "This is the way we do things.";

let words = sentence.split(" ");

console.log(words);

console.log(words.join(" "));

//spread operator
let numbers = [6, 5, 3, 2, 1, 15];

function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result ) result = number;
  }
  return result;
}

console.log(max(5, 3, 2, 1, 14, 13));
console.log(numbers);
console.log(...numbers);
console.log(max(...numbers));

let array = ["never", "fully"];
console.log(["will", ...array, "understand"]);

//array destructuring
const item = ["Coffee [hot]", "$2.00", "$2.50", "$3.00"];
const [itemName, mediumPrice] = item;

console.log(`${itemName} medium size cost ${mediumPrice}.`);

//object destructuring
const {fullName} = {fullName: "Kevin Tsai", age: "31"};
console.log(`My name is ${fullName}.`);

//JSON serialization - convert to a flat description

//convert a JS object to JSON: note the double quotes around property names
let stringJSON = JSON.stringify({
  squirrel: false,
  events: ["weekend"]
});

console.log(stringJSON);

//convert a JSON string to an JS object
console.log(JSON.parse(stringJSON).events);
