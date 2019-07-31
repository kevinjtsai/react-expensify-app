//traversing through the dom tree

function talksAbout(node, string) {
  if(node.nodeType == Node.ELEMENT_NODE) {
    for (i = 0; i < node.childNodes.length; i++) { //childNodes is array-like, but not an array with array methods
      if (talksAbout(node.childNodes[i], string)) { //loop through all children nodes
        return true; // indexOf returns true, if is then true and body returns true
      }
    }
    return false; //return false if all nodes are traversed and match is not found
  }
  else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1; //returns -1 when string is not found
  }
}

//finding elements
let link = document.body.getElementsByTagName("a")[0]; //get first link by tag name

console.log(link.href); //prints the href property

let ostrich = document.getElementById("gertrude"); //get specific element by ID

//updating the DOM
let paragraphs = document.body.getElementsByTagName("p");
document.body.insertBefore(paragraphs[2], paragraphs[0]); //move 2 and place before 0

//creating nodes
function replaceImages() {
  let images = document.body.getElementsByTagName("img"); //get all img elements and returns live tree
  for (let i = images.length - 1; i >= 0; i--) { //starts at the end and moves up due to removal during replace step
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt); //create a new node
      image.parentNode.replaceChild(text, image); //replace old node with new node
    }
  }
}

let arrayish = {0: "one", 1: "two", length: 2};
let array = Array.from(arrayish); //'solid' collection by converting to array
console.log(array.map(s => s.toUpperCase()));


//JavaScript code can directly manipulate the style of an element through the element’s style property.
//This property holds an object that has properties for all possible style properties.

<p id="para" style="color: purple">
  Nice text
</p>

let para = document.getElementById("para");
console.log(para.style.color);
para.style.color = "magenta";

<div>
  <p>And if you go chasing
    <span class="animal">rabbits</span></p>
  <p>And you know you're going to fall</p>
  <p>Tell 'em a <span class="character">hookah smoking
    <span class="animal">caterpillar</span></span></p>
  <p>Has given you the call</p>
</div>

function count(selector) {
  return document.querySelectorAll(selector).length; //query is not a live tree
}
console.log(count("p"));           // All <p> elements // → 4
console.log(count(".animal"));     // Class animal // → 2
console.log(count("p .animal"));   // Animal inside of <p> // → 2
console.log(count("p > .animal")); // Direct child of <p> // → 1

<div>
  <button>Click me</button>
  <p>No handler here.</p>
</div>

let button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("Button clicked.");
});

<button>Act-once button</button>
let button = document.querySelector("button");
function once() {
  console.log("Done.");
  button.removeEventListener("click", once);
}
button.addEventListener("click", once);

<button>Click me any way you want</button>

let button = document.querySelector("button");
button.addEventListener("mousedown", event => {
  if (event.button == 0) { //left click
    console.log("Left button");
  } else if (event.button == 1) {
    console.log("Middle button");
  } else if (event.button == 2) { //right click
    console.log("Right button");
  }
});

//propagation

<p>A paragraph with a <button>button</button>.</p>

let para = document.querySelector("p");
let button = document.querySelector("button");
para.addEventListener("mousedown", () => {
  console.log("Handler for paragraph.");
});
button.addEventListener("mousedown", event => {
  console.log("Handler for button."); //paragraph mousedown event gets triggered with left click
  if (event.button == 2) event.stopPropagation(); //paragraph mousedown event does not get triggered with right click
});

<div>
  <button>A</button>
  <button>B</button>
  <button>C</button>
</div>

document.body.addEventListener("click", event => {
if (event.target.nodeName == "BUTTON") {
  console.log("Clicked", event.target.textContent);
}
});

<a href="https://developer.mozilla.org/">MDN</a>
let link = document.querySelector("a");
link.addEventListener("click", event => {
  console.log("Nope.");
  event.preventDefault(); //prevent default behavior that opens link
});