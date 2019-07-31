/*
\d	Any digit character
\w	An alphanumeric character (“word character”)
\s	Any whitespace character (space, tab, newline, and similar)
\D	A character that is not a digit
\W	A nonalphanumeric character
\S	A nonwhitespace character
.	Any character except for newline
*/

//set of chars
let notBinary = /[^01]/; //caret char after opening square bracket inverts a set of chars

//repeating parts of a pattern
console.log(/[0-9]/.test("in 1992")); // - matches a range

console.log(/'\d+'/.test("'123'")); // + matches one or more digits

console.log(/'\d*'/.test("''")); // * allows patterns to match zero times

console.log(/neighbou?r/.test("neighbor")); // ? makes match optional

let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/; // {2} matches 2x, {2-4} matches 2-4x, {5, } matches at 5+
console.log(dateTime.test("1-30-2003 8:45"));

//subexpressions
let cartoonCrying = /boo+(hoo+)+/i; // (match) to group subexpressions
console.log(cartoonCrying.test("Boohoooohoohooo"));

let match = /\d+/.exec("one two 100");
console.log(match); // → ["100"] exec returns null if no match is found
console.log(match.index); // → 8

console.log("one two 100".match(/\d+/)); // similar string match method

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // → ["'hello'", "hello"] shows full match, then subexpression groups in order

console.log(/bad(ly)?/.exec("bad"));  // → ["bad", undefined] shows undefined when subexpression groups don't match

console.log(/(\d)+/.exec("123")); // → ["123", "3"] multiple matches only show the last match

//Date
console.log(new Date()); // → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)
console.log(new Date(2009, 11, 9)); // → Wed Dec 09 2009 00:00:00 GMT+0100 (CET) -- JS months start at index 0

console.log(new Date(2009, 11, 9)); // → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)

//Date.getYear gives you the year minus 1900 (98 or 119) and is mostly useless

function getDate(string) {
  let [_, month, day, year] =
    /(\^d{1,2})-(\d{1,2})-(\d{4})$/.exec(string); //markers ^ and $  match start and end of the string
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003")); // → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

console.log(/cat/.test("concatenate")); // → true
console.log(/\bcat\b/.test("concatenate")); // → false \b adds word boundary at start or end of a string
//white space, non-word chars like symbols are allowed

//choice patterns
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs")); // → true
console.log(animalCount.test("15 pigchickens")); // → false


//backtracking
console.log(/^.*x/.test("abcxe")); //matcher initially goes past x, goes back to abc, then adds x

console.log(/([01]+)+b/.test("000000000000000"));
//matcher passes through all 0s, finds no b char, then backtracks each 0 at a time and the work doubles with each additional char

//replace method
console.log("papa".replace("p", "m")); // → mapa

console.log("Borobudur".replace(/[ou]/, "a")); // → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // → Barabadar g == global (all matches)

console.log("Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(/(\w+), (\w+)/g, "$2 $1")); //$2 = group 2 and $1 = group 1, with new format $2 $1
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler

let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase())); // → the CIA and FBI

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs

//greedy operators

// (+, *, ?, and {})  are greedy operators

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}

console.log(stripComments("1 /* a */+/* b */ 1")); // → 1  1 - incorrect due to greedy operator

// (+?, *?, ??, {}?) are non-greedy operators

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, ""); //remove // and /* */
}

console.log(stripComments("1 /* a */+/* b */ 1")); // → 1 + 1 - correct due to non-greedy operator