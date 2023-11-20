# TODO tasks

## BACKLOG #####################################################################
* Control de errores en frontend:
    * Actualmente, es posible que un usuario borre un semestre (y todas sus asignaturas) mientras otro está dentro del semestre. Si no se capturan los errores, la actualización de asignaturas se hará sobre objetos que ya no existen.



## TODO ########################################################################



## DOING #######################################################################




## DOCUMENTS ###################################################################
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


## DONE ########################################################################
* Al salir de un semestre y volver al inicio, no se recuperan de nuevo los datos, sino que se confía en los que ya hay. Debería refrescarse la información de semestres, porque no se sabe si algún otro usuario ha modificado los semestres.
    * Se llama a refreshSemesters

* Hecha la 4ª query

* Frontend, archivo app.js. Crear las funciones de BD real:
    * getSubjectById
    * updateSubjectStatus
    * updateSubject

### 2023-11-19
* Usar las 4 queries desde el front:
    * Lista de semestres. con las mínimas infos necesarias para las cards
    * Pedir un solo semestre: con las infos para el formulario
    * Pedir las asignaturas de un semestre: solo con sus infos necesarias
    * Perdir las infos de una asignatura, para rellenar su formulario
* Error: los datos de tipo fecha de la BD llegan como integers
    hay que adaptar antes de injectarlas en los campos de inicio y fin del formulario de semestres.
    * Usando la librería graphql-scalars, se puede usar DateTime como un tipo de dato de graphql.
    * En el frontend, recortar los 10 primeros caracteres
* El tipo de semestre usa la palabra `kind` en vez de `type`, para evitar confusiones. Había un error en eso.
* Control de errores en fetch
    * Poner un try-catch en el fetch y un mensaje de aviso.
    * El catch devolverà null,
    * Comprobar en cada llamada al fetch si el resultado es null, y si lo es, devolver un objecto o array vacío (según lo que se espere).
