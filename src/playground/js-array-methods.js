let array = [3, 4, 5, 6, 3, 7];

//remove last element
let last = array.pop();
console.log(last);

//add element back to end of the array
array.push(last);
console.log(array);

//remove element from the front of an array
let first = array.shift();
console.log(first);

//add element back to the front of the array
array.unshift(first);
console.log(array);

//search from the start
console.log(array.indexOf(3));

//search from the end
console.log(array.lastIndexOf(3));

//partition with slice (inclusive, exclusive)
console.log(array.slice(2, 4));

//remove by index with slice and concat
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(array, 2));