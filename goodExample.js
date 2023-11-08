// // EXAMPLE FROM https://stackoverflow.com/a/45315867

// // Controller.js
// exports.user_read = async id => {
//     return Contact.findById(id, (err, user) => {
//         err ? reject(err) : resolve(user);
//     });
//   }

//   // Resolver.js
//   var contact = require('Controller');
//   ...
//   // root object passed as rootValue to graphqlHTTP
//   getUser: ({ id }) => {
//     return await contact.user_read(id)
//   }
//   ...