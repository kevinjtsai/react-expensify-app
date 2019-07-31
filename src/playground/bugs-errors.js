function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}

const accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}


//try finally - finally block says “no matter what happens, run this code after trying to run the code in the try block.”
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}

try {
  console.log(getAccount());
} catch (error) {
  console.log("Something went wrong: " + error);
}

//selective catching
for (;;) { //(;;) construct is a way to intentionally create a loop that doesn’t terminate on its own
  try {
    let dir = promtDirection("Where?"); // ← typo! prompt is mispelled
    console.log("You chose ", dir);
    break;
  } catch (e) {
    console.log("Not a valid direction. Try again.");
  }
}

class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result); //throw new input error for invalid inputs
}

for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) { //catch instances of input error
      console.log("Not a valid direction. Try again.");
    } else {
      throw e; //throw other errors
    }
  }
}

//assertions are checks inside a program that verify that something is the way it is supposed to be
function firstElement(array) {
  if (array.length == 0) { //assert array is not empty
    throw new Error("firstElement called with []");
  }
  return array[0];
}