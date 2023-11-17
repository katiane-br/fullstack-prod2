# TODO tasks

* Error: los datos de tipo fecha de la BD llegan como largas strings que habrá que adaptar antes de injectarlas en los campos de inicio y fin del formulario de semestres.


* Control de errores en frontend:
    * Actualmente, es posible que un usuario borre un semestre (y todas sus asignaturas) mientras otro está dentro del semestre. Si no se capturan los errores, la actualización de asignaturas se hará sobre objetos que ya no existen.

* Frontend, archivo app.js. Crear las funciones de BD real:
    * getSubjectById
    * updateSubjectStatus
    * updateSubject



## DONE
* Al salir de un semestre y volver al inicio, no se recuperan de nuevo los datos, sino que se confía en los que ya hay. Debería refrescarse la información de semestres, porque no se sabe si algún otro usuario ha modificado los semestres.
    * Se llama a refreshSemesters

* Hecha la 4ª query

