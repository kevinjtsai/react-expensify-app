import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBINchPPVEHpp0WaC_kTxBh90hxkkbWQRg",
    authDomain: "expensify-6c8ad.firebaseapp.com",
    databaseURL: "https://expensify-6c8ad.firebaseio.com",
    projectId: "expensify-6c8ad",
    storageBucket: "expensify-6c8ad.appspot.com",
    messagingSenderId: "114007408359",
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// //child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })

// //child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })

// //child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })

// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     })
//     console.log(expenses);
//   });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     })
//     console.log(expenses);
// });

// database.ref('expenses').push({
//   decription: 'Rent',
//   note: '',
//   amount: 255000,
//   createdAt: 90812890,
// });

// database.ref('expenses').push({
//   decription: 'Phone Bill',
//   note: '',
//   amount: 10000,
//   createdAt: 90812890,
// });

// database.ref('expenses').push({
//   decription: 'Food',
//   note: '',
//   amount: 100000,
//   createdAt: 90812890,
// });

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// })

// database.ref('location')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   }).catch((e) => {
//     console.log('Error fetching data', e);
//   });

// database.ref().set({
//   name: 'Kevin Tsai',
//   age: 30,
//   stressLevel: 6,
//   job: {
//     title: 'Software developer',
//     company: 'Google',
//   },
//   location: {
//     city: 'New York',
//     country: 'United States',
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log('This failed.', e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle',
// }).then(() => {
//   console.log('Data is updated');
// }).catch((e) => {
//   console.log('Update failed.', e);
// });;

// database.ref('isSingle').remove()
//   .then(() => {
//     console.log('Remove succeeded')
//   }).catch((e) => {
//     console.log('Remove failed', e);
//   });