import {bigOak} from "./crow-tech";
import {defineRequestType} from "./crow-tech";
import {everywhere} from "./crow-tech";

bigOak.readStorage("food caches", caches => {
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    console.log(info);
  });
});

bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
            () => console.log("Note delivered."));

defineRequestType("note", (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done(); //callback function
});

//A promised value is a value that might already be there or might appear at some point in the future
let fifteen = Promise.resolve(15); //fifteen is wrapped in a promise
fifteen.then(value => console.log(`Got ${value}`)); //registers callback to be called when promise resolves and produces a value

function storage(nest, name) {
  return new Promise(resolve => { //storage returns a a promise that calls readStorage
    nest.readStorage(name, result => resolve(result));
  });
}

storage(bigOak, "enemies")
  .then(value => console.log("Got", value));

new Promise((_, reject) => reject(new Error("Fail")))
.then(value => console.log("Handler 1"))
.catch(reason => {
  console.log("Caught failure " + reason);
  return "nothing";
})
.then(value => console.log("Handler 2", value));

// → Caught failure Error: Fail
// → Handler 2 nothing

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) { //attempt function
      nest.send(target, type, content, (failed, value) => { //first argument passed to callbacks is the failure reason, if any, and the second is the actual result
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1); //increment attempt
        else reject(new Timeout("Timed out")); //after 3 attempts reject promise
      }, 250); //set timeout to 250ms
    }
    attempt(1);//initialize attempt
  });
}

//wraps defineRequestType with try catch promise and callback
function requestType(name, handler) {
  defineRequestType(name, (nest, content, source,
                           callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
              failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }
  });
}

//Promise.all
requestType("ping", () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping")
      .then(() => true, () => false);
  });
  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]); //return result if there is one
  });
}

//flooding floods network with info until all nodes have it
everywhere(nest => { //runs code on every nest
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message); //pushes message to gossip array
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", message); //send gossip to neighbors
  }
}

requestType("gossip", (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return; //ignore duplicate messages
  console.log(`${nest.name} received gossip '${
               message}' from ${source}`);
  sendGossip(nest, message, source); //sendGossip to all neighbors exceptFor the original sender (source)
});

requestType("connections", (nest, {name, neighbors}, source) => {
  let connections = nest.state.connections;
  if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return; //compare JSON strings
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "connections", {
    name,
    neighbors: nest.state.connections.get(name)
    });
  }
}

everywhere(nest => {
  nest.state.connections = new Map;
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target,
                        nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, "route",
                   {target, type, content});
  }
}

requestType("route", (nest, {target, type, content}) => {
  return routeRequest(nest, target, type, content);
});

routeRequest(bigOak, "Church Tower", "note", "Incoming jackdaws!");

//async functions implicitly return a promise and await other promises in a way that looks synchronous
async function findInStorage(nest, name) {
  let local = await storage(nest, name); //storage is a promise
  if (local != null) return local;

  let sources = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources[Math.floor(Math.random() *
                                    sources.length)];
    sources = sources.filter(n => n != source);
    try {
      let found = await routeRequest(nest, source, "storage",
                                     name);
      if (found != null) return found;
    } catch (_) {}
  }
  throw new Error("Not found");
}

//function generator
function* powers(n) {
  for (let current = n;; current *= n) {
    yield current;
  }
}

for (let power of powers(3)) {
  if (power > 50) break;
  console.log(power);
}

async function chicks(nest, year) {
  let lines = network(nest).map(async name => {
    return name + ": " +
      await anyStorage(nest, name, `chicks in ${year}`);
  });
  return (await Promise.all(lines)).join("\n"); //join after all promises are resolved to avoid async bugs
}