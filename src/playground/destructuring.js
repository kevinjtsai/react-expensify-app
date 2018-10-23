//
// Object destructuring
//

// const person = {
//   name: 'Kevin',
//   age: 31,
//   location: {
//     city: 'New York',
//     temp: 80,
//   },
// }

// const { name: firstName = 'Anonymous' , age } = person;

// const { city, temp: temperature } = person.location;

// console.log(`${firstName} is ${age}.`);

// console.log(`It's ${temperature} in ${city}.`);

// const book = {
//   title: 'Ego is the Enemey',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin',
//   }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName)

//
// Array destructuring
//

// const address = ['301 E 47TH ST', 'New York City', 'New York', '10017'];
// const [, city, state = 'California'] = address;
// console.log(`You are in ${city}, ${state}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}.`);