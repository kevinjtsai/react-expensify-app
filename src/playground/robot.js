const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null); //use object as a map by setting prototype to null
  function addEdge(from, to) {
    if (graph[from] == null) { //if key doesn't exist
      graph[from] = [to]; //add key to locations array
    } else {
      graph[from].push(to); //if key exists add new location to locations array
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) { //split returns array of [from, to] pairs
    addEdge(from, to); //run through all first elements
    addEdge(to, from); //run through all second elements
  }

  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if(!roadGraph[this.place].includes(destination)) {
      return this; //return the same state if location is not found
    } else {
      let parcels = this.parcels.map(p => {
        if(p.place != this.place) return p; //return all parcels that are not in the current location
        return { place: destination, address: p.address }; //parcel in current location is moved to destination
      }).filter(p => p.place != p.address); //return all parcels that are not in their final destination
      return new VillageState(destination, parcels); //returns new village state
    }
  }
}

let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);

let next = first.move("Alice's House");

//simulation
function runRobot(state, robot, memory) {
  for(let turn = 0; ; turn++) {
    if(state.parcels.length == 0) {
      console.log(`done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory); //call robot function and pass state and memory parameters
    state = state.move(action.direction); //robot has direction and memory properties
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph)); //keep picking place until it's a different value from address
    } while (place == address);
    parcels.push({place, address}); //push parcel information to parcels array
  }
  return new VillageState("Post Office", parcels);
};

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute; //set memory to mailRoute
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

//runRobot(VillageState.random(), routeRobot, []);

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}]; //inialize work array and set initial location to from
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i]; //inialize object with at and route
    for (let place of graph[at]) { //iterate through each place we can reach from current 'at' location
      if (place == to) return route.concat(place); //if current place is the 'to' destination, we are done and return full route
      if (!work.some(w => w.at == place)) { //if we have not previously reached place yet
        work.push({at: place, route: route.concat(place)}); //add current place to work queue and update route
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place); //pick up all parcels
    } else {
      route = findRoute(roadGraph, place, parcel.address); //deliver all parcels
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), goalOrientedRobot, []);

