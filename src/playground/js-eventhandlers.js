//addEventListener
<div>
<button>Click me</button>
<p>No handler here.</p>
</div>

let button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked.");
});

//removeEventListener
<button>Act-once button</button>

let button = document.querySelector("button");

function once() {
  console.log("Done.");
  button.removeEventListener("click", once);
}

button.addEventListener("click", once);

//mousedown
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

//target.textContent
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

//preventDefault
<a href="https://developer.mozilla.org/">MDN</a>
let link = document.querySelector("a");
link.addEventListener("click", event => {
  console.log("Nope.");
  vent.preventDefault(); //prevent default behavior that opens link
});

//keydown
<p>This page turns violet when you hold the V key.</p>
window.addEventListener("keydown", event => {
  if (event.key == "v") {
  document.body.style.background = "violet";
}
});

window.addEventListener("keyup", event => {
  if (event.key == "v") {
  document.body.style.background = "";
  }
});

//Modifier keys such as shiftKey, ctrlKey, altKey, and metaKey properties
<p>Press Control-Space to continue.</p>

window.addEventListener("keydown", event => {
  if (event.key == " " && event.ctrlKey) {
    console.log("Continuing!");
  }
});


/* style
body {
  height: 200px;
  background: beige;
}
.dot {
  height: 8px; width: 8px;
  border-radius: 4px;  // rounds corners
  background: blue;
  position: absolute;
}
*/

//click == mouse down + mouse up -- click event fires on mouse up
window.addEventListener("click", event => {
  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = (event.pageX - 4) + "px";
  dot.style.top = (event.pageY - 4) + "px";
  document.body.appendChild(dot);
});

//clientX, clientY, pageX, pageY
/*
body {
  height: 200px;
  background: beige;
}
.dot {
  height: 8px; width: 8px;
  border-radius: 4px; // round corners
  background: blue;
  position: absolute;
}
*/

window.addEventListener("click", event => {
  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = (event.pageX - 4) + "px";
  dot.style.top = (event.pageY - 4) + "px";
  document.body.appendChild(dot);
});

//mouse motion with mousemove event
<div>
  <p>Drag the bar to change its width:</p>
  <div style="background: orange; width: 60px; height: 20px">
  </div>
</div>

let lastX; // tracks the last observed mouse X position
let bar = document.querySelector("div");
bar.addEventListener("mousedown", event => { //track first click
  if (event.button == 0) { //instanceOfMouseEvent.button
    lastX = event.clientX;
    window.addEventListener("mousemove", moved); //track mouse drag movement along window (includes outside the bar)
    event.preventDefault(); // prevent selection
  }
});

function moved(event) {
  if (event.buttons == 0) { //instanceOfMouseEvent.buttons == sum of codes of buttons held (note different values and order than instanceOfMouseEvent.button)
    window.removeEventListener("mousemove", moved); //remove listener when user releases click
  } else {
    let dist = event.clientX - lastX; //calculates mousemove distance
    let newWidth = Math.max(10, bar.offsetWidth + dist); //moves at least 10 pixels with any mouse movement
    bar.style.width = newWidth + "px";
    lastX = event.clientX; //sets last x position after mousemove event stops (click may still be held down)
  }
}

//touch screens with touches array (multiple fingers)
function update(event) {
  for (let dot; dot = document.querySelector("dot");) {
    dot.remove();
  }
  for (let i = 0; i < event.touches.length; i++) {
    let {pageX, pageY} = event.touches[i];
    let dot = document.createElement("dot");
    dot.style.left = (pageX - 50) + "px";
    dot.style.top = (pageY - 50) + "px";
    document.body.appendChild(dot);
  }
}
window.addEventListener("touchstart", update);
window.addEventListener("touchmove", update);
window.addEventListener("touchend", update);

//scroll events
/*
<style>
  #progress {
    border-bottom: 2px solid blue;
    width: 0;
    position: fixed; //fixes progress bar to the top of the page
    top: 0; left: 0;
  }
</style>*/
<div id="progress"></div>

document.body.appendChild(document.createTextNode(
  "supercalifragilisticexpialidocious ".repeat(1000))); // Create content

let bar = document.querySelector("#progress");
window.addEventListener("scroll", () => {              //scrollHeight is full page height & innerHeight is window height
  let max = document.body.scrollHeight - innerHeight;  //scrollHiehgt - innerHeight == max scroll length
  bar.style.width = `${(pageYOffset / max) * 100}%`;   //pageYOffset is the vertical distance from the top of the page
});


//focus & blur
/*
<p>Name: <input type="text" data-help="Your full name"></p>
<p>Age: <input type="text" data-help="Your age in years"></p>
<p id="help"></p>
*/

let help = document.querySelector("#help");
let fields = document.querySelectorAll("input");
for (let field of Array.from(fields)) {
  field.addEventListener("focus", event => { //focus
    let text = event.target.getAttribute("data-help");
    help.textContent = text; //display data-help value as textContent
  });
  field.addEventListener("blur", event => { //no longer focused
    help.textContent = "";
  });
};

//load and beforeunload events

//events and the event loop
//web worker is a JS process that runs alongside the main script

addEventListener("message", event => {
  postMessage(event.data * event.data); //worker receives message with event.data = 10 and posts message with event.data = 100;
});

let squareWorker = new Worker("code/squareworker.js");
squareWorker.addEventListener("message", event => {
  console.log("The worker responded:", event.data); //listener receives post from worker and logs the value 100
});
squareWorker.postMessage(10); //message is posted with event.data = 10

//timers

let bombTimer = setTimeout(() => {
  console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) { // 50% chance
  console.log("Defused.");
  clearTimeout(bombTimer);
}

let ticks = 0;
let clock = setInterval(() => {
  console.log("tick", ticks++);
  if (ticks == 10) {
    clearInterval(clock);
    console.log("stop.");
  }
}, 200);


//Debouncing to make sure event is not firing too often
let textarea = document.querySelector("textarea");
let timeout;
textarea.addEventListener("input", () => {
  clearTimeout(timeout); //clear anytimeouts within 500ms
  timeout = setTimeout(() => console.log("Typed!"), 500); //logs Typed! 500ms after input event
});

let scheduled = null;
window.addEventListener("mousemove", event => {
  if (!scheduled) {
    setTimeout(() => {
      document.body.textContent =
        `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
      scheduled = null; //after 250ms scheduled is reset to null
    }, 250);
  }
  scheduled = event; //scheduled is set to event after
});