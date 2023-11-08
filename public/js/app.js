"use strict";
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Constants
// Constantes para evitar números mágicos y para que sean más fáciles de entender los códigos de estado de las asignaturas
const PENDIENTE = 0;
const EMPEZADA = 1;
const APROBADA = 2;
const SUSPENDIDA = 3;

////////////////////////////////////////////////////////////////////////////////
// Variables
// Variables globales que serán necesarias en muchas funciones
let data;




////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// UTILS
/**
 * Muestra los elementos del DOM que se pasen como parámetros.
 * Para ello, elimina la clase 'd-none' en cada elemento.
 */
function showMe(...elems) { elems.forEach(e => e.classList.remove('d-none')); }
/**
 * Oculta los elementos del DOM que se pasen como parámetros.
 * Para ello, añade la clase 'd-none' en cada elemento.
 */
function hideMe(...elems) { elems.forEach(e => e.classList.add('d-none')); }





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// DATA
// Funciones que simulan acceder a una base de datos para leer,escribir, editar
// y borrar datos (CRUD).
// Cuando estas funciones accedan a una BD real, el resto del programa no
// necesitará ningún cambio.

/**
 * Crea un nuevo semestre o asignatura en la base de datos.
 * @param {Object} info - Objeto con la información del semestre o asignatura
 */
async function createData(info) {
    // Create semester
    if (info.sem) {
        console.log('Creating semester', info.sem);
        // Assign new id to semester, using reduce
        // Aquí se imita la asignación de un id nuevo a un semestre, como hacen
        // las bases de datos. Se usa reduce para obtener el id más alto de los
        // semestres existentes y se le suma 1.
        const id = data.semesters.reduce((max, sem) => {
            return sem.id > max ? sem.id : max;
        }, 0) + 1;
        info.sem.id = id;

        data.semesters.push(info.sem);
    }

    // Create subject
    if (info.subj) {
        console.log('Creating subject', info.subj);

        const sem = await getSemesterById(info.subj.semId);

        // Obtener el id nuevo de la asignatura, usando reduce para obtener el
        // id más alto de todas las asignaturas de todos los semestres
        const id = data.semesters
            .map(sem => sem.subjects)
            .flat()
            .reduce((max, subj) => {
                return subj.id > max ? subj.id : max;
            }, 0) + 1;
        info.subj.id = id;

        sem.subjects.push(info.subj);
    }
}

/**
 * Obtiene los datos de la base de datos.
 * @returns {Object} - Objeto con los datos de la base de datos
 */
async function getData() {
    // Fake data from data/data.json
    const dataRaw = await fetch('./data/data.json');
    const data = await dataRaw.json();
    return data;
}

/**
 * Obtiene un semestre por su id.
 */
async function getSemesterById(id) {
    id = Number(id);
    return data.semesters.find(sem => sem.id === id);
}

/**
 * Actualiza un semestre
 */
async function updateSemester(sem) {
    // Cast to numbers
    sem.id = Number(sem.id);
    sem.year = Number(sem.year);

    const semOld = await getSemesterById(sem.id);

    if (semOld) {
        semOld.name = sem.name;
        semOld.year = sem.year;
        semOld.start = sem.start;
        semOld.end = sem.end;
        semOld.descrip = sem.descrip;
        semOld.color = sem.color;
        semOld.type = sem.type;
        semOld.tutorized = sem.tutorized;

    } else {
        throw new Error(`Semester ${sem.id} not found`);
    }
}

/**
 * Obtiene una asignatura por su id.
 * Recorre los semestres, obtiene sus asignaturas y las junta en un array.
 * Luego busca la asignatura por su id en ese array.
 */
async function getSubjectById(id) {
    id = Number(id);
    return data.semesters
        .map(sem => sem.subjects)
        .flat()
        .find(subj => subj.id === id);
}

/**
 * Actualiza el estado de una asignatura.
 * @param {Number} id - Id de la asignatura
 * @param {Number} status - Nuevo estado de la asignatura
 */
async function updateSubjectStatus(id, status) {

    // Cast to numbers
    id = Number(id);
    status = Number(status);

    const subj = await getSubjectById(id);
    if (subj) {
        subj.status = status;

    } else {
        throw new Error(`Subject ${id} not found`);
    }
}

/**
 * Actualiza una asignatura en la base de datos.
 */
async function updateSubject(subj) {
    // Cast to numbers
    subj.id = Number(subj.id);
    subj.status = Number(subj.status);

    const subjOld = await getSubjectById(subj.id);

    if (subjOld) {
        subjOld.name = subj.name;
        subjOld.descrip = subj.descrip;
        subjOld.difficulty = subj.difficulty;
        subjOld.grade = subj.grade;
        subjOld.like = subj.like;
        subjOld.status = Number(subj.status);
        subjOld.semId = Number(subj.semId);

    } else {
        throw new Error(`Subject ${subj.id} not found`);
    }
}


/**
 * Borra un semestre o asignatura de la base de datos.
 */
async function deleteData(info) {
    if (info.semId) {
        // Delete semester by Id
        console.log('Deleting semester', info.semId);
        data.semesters = data.semesters.filter(sem => sem.id != info.semId);
    }
    if (info.subjId) {
        // Delete subject by Id
        console.log('Deleting subject', info.subjId);
        data.semesters.forEach(sem =>
            sem.subjects = sem.subjects.filter(
                subj => subj.id != info.subjId)
        );
    }
}






////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// LOGIC
/**
 * Muestra el modal de confirmación para borrar un semestre.
 */
async function deleteSem(id) {

    const sem = await getSemesterById(id);

    if (sem) {
        const thingName = document.getElementById("toDeleteName");
        thingName.innerHTML = `el semestre ${sem.name}`;
        thingName.dataset.what = "semester";  // Borrar un semestre
        thingName.dataset.id = id;
        confirmDelete.show();
    }
}

/**
 * Muestra el modal de confirmación para borrar una asignatura.
 * Borra una asignatura. TODO: que sea a la vuelta del modal de confirmación.
 */
async function deleteSubject(id) {

    const subj = await getSubjectById(id);

    if (subj) {
        const thingName = document.getElementById("toDeleteName");
        thingName.innerHTML = `la asignatura ${subj.name}`;
        thingName.dataset.what = "subject";  // Borrar una asignatura
        thingName.dataset.id = id;
        confirmDelete.show();
    }
}

/**
 * Borra el elemento seleccionado. Esta función viene del modal de confirmación.
 */
async function deleteConfirmed() {
    const thingName = document.getElementById("toDeleteName");
    const what = thingName.dataset.what;  // La 'cosa' a borrar ("semester" o "subject")
    const id = thingName.dataset.id;
    confirmDelete.hide();

    if (what === "semester") {
        await deleteData({ semId: id });
        refreshSemesters(data.semesters);

    } else if (what === "subject") {
        await deleteData({ subjId: id });
        const semId = semesterPage.dataset.id;
        const sem = await getSemesterById(semId);
        refreshSubjects(sem);
    }
}




////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// TEMPLATES
// Estas funciones crean el HTML de los elementos que se muestran en la página.
// Reciben un objeto con las propiedades del elemento, insertan esas propiedades
// en el HTML y devuelven el HTML creado.
// En realidad, esta funciones solo devuelven una string de texto. Luego, las
// funciones que las llaman y reciban esa string, la insertarán en la propiedad
// innerHTML de algún elemento del DOM. Será entonces cuando las strings se
// convertirán en elementos HTML con todo su funcionamiento y estilo.

/**
 * Crea el HTML de la card de un semestre.
 */
function createSemCard(sem) {
    let descrip = sem.descrip;
    // Trim description to 30 chars if needed
    if (descrip.length > 30) { descrip = descrip.slice(0, 27) + '...'; }

    return `<div id="semester${sem.id}" class="card mb-3 semester-card" data-id="${sem.id}">
    <button class="btn-close btn-close2" onclick="deleteSem(${sem.id})"></button>
    <h5 class="card-header textshadow" style="background-color:${sem.color}">
    ${sem.name}
    </h5>
    <div class="container">
    <div class="d-flex justify-content-center">
    <div class="card mb-3 semester-card">
        <p class="card-text">${descrip}</p>
    </div>
    </div>
    </div>
    <div class="card-footer d-flex justify-content-around" style="background-color:${sem.color}">
    <button class="custom-btn" onclick="openSemForm(${sem.id})">Editar</button>
    <button class="custom-btn-5" onclick="openSem(${sem.id})">Abrir</button>
    </div>
</div>`;
}

/**
 * Crea el HTML de la card de una asignatura.
 */
function createSubjectCard(subj) {
    let descrip = subj.descrip;
    // Trim description to 30 chars if needed
    if (descrip.length > 30) { descrip = descrip.slice(0, 27) + '...'; }

    return `<div class="card parrafo" draggable="true" id="subject${subj.id}" data-id="${subj.id}">
    <div class="card-body">
        <button class="btn-close" onclick="deleteSubject(${subj.id})"></button>
        <h5 class="card-title">${subj.name}</button></h5>
        <p class="card-text">${descrip}</p>
        <button class="custom-btn-card-dg" onclick="openSubjectForm(null,${subj.id})">EDITAR</button>
    </div>
</div>`;
}







////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Handlers
// Funciones que gestionan los eventos.

/**
 * Recibe los datos del formulario de creación de un nuevo semestre.
 * Da formato adecuado a los datos.
 * Esconde el formulario.
 * Limpia el formulario
 * Crea el semestre en la base de datos.
 * Actualiza la lista de semestres.
 * @param {Event} ev - Evento de envío del formulario
 * @param {HTMLFormElement} form - Formulario de creación de semestre
 * @returns {Boolean} - Devuelve false para evitar que el formulario refresque
 * la página.
 */
async function handleSemForm(ev, form) {
    ev.preventDefault();

    // Si en el formulario hay una id (en el campo escondido semId), es
    // porque se está editando un semestre. En ese caso, hay que actualizar
    // el semestre en la BD en vez de crear uno nuevo.

    const sem = {
        id: Number(form.semId.value),
        name: form.semName.value,
        year: Number(form.semYear.value),
        start: form.semStart.value,
        end: form.semEnd.value,
        descrip: form.semDescrip.value,
        color: form.semColor.value,
        type: form.semType.value,
        tutorized: form.semTutor.checked,
        subjects: [],
    };

    semesterModal.hide();
    form.reset();

    if (sem.id) {
        await updateSemester(sem);
    } else {
        await createData({ sem });
    }

    refreshSemesters(data.semesters);
    return false;
}

/**
 * Recibe los datos del formulario de creación de una nueva asignatura.
 * Da formato adecuado a los datos.
 * Esconde el formulario.
 * Limpia el formulario
 * Crea la asignatura en la base de datos.
 * Actualiza la lista de asignaturas.
 * @param {Event} ev - Evento de envío del formulario
 * @param {HTMLFormElement} form - Formulario de creación de asignatura
 * @returns {Boolean} - Devuelve false para evitar que el formulario refresque
 * la página.
 */
async function handleSubjectForm(ev, form) {
    ev.preventDefault();

    // Si en el formulario hay una id (en el campo escondido subjId), es
    // porque se está editando una asignatura. En ese caso, hay que actualizar
    // la asignatura en la BD en vez de crear una nueva.

    const subj = {
        id: Number(form.subjId.value),
        semId: Number(form.subjSemId.value),
        name: form.subjectName.value,
        descrip: form.subjectDescrip.value,
        difficulty: form.subjectDifficulty.value,
        grade: form.subjectGrade.value,
        like: form.subjectLike.checked,
        status: Number(form.subjStatus.value),
    };

    subjectModal.hide();
    form.reset();

    if (subj.id) {
        // Si hay id, se está editando una asignatura
        await updateSubject(subj);
    } else {
        // Si no hay id, se está creando una asignatura nueva
        await createData({ subj });
    }

    const sem = await getSemesterById(subj.semId);
    refreshSubjects(sem);
    return false;
}

// Funciones que gestionan el drag & drop

/**
 * Cambia el iconito del cursor cuando se arrastra un elemento al tipo "move".
 */
function dragover(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

/**
 * Cambia el color de fondo de la columna cuando se arrastra un elemento sobre
 * ella, para ello, le añade la clase 'dragover'.
 */
function dragenter(ev) {
    ev.preventDefault();
    // Remove dragover class from all zones
    zones.forEach(zone => zone.classList.remove('dragover'));
    this.classList.add('dragover');
}

/**
 * Por ahora no hace nada.
 */
function dragleave(ev) {
    ev.preventDefault();
}

/**
 * Cambia el estado de la asignatura cuando se suelta sobre una columna.
 * Para ello:
 * - Recupera el dato guardado por dragstart en el `dataTransfer` (el id de la
 * asignatura que se está arrastrando).
 * - Gracias al id recuperado, con `document.getElementById` obtiene el elemento
 * HTML mismo.
 * - Recupera el id de la asignatura que la BD reconocerá. Este id está guardado
 * en el atributo `data-id` de la card de la asignatura.
 * - Recupera el estado de la columna sobre la que se ha soltado el elemento.
 * Ese estado está guardado en el atributo `data-status` de la columna.
 * - Actualiza el estado de la asignatura en la BD, para ello pasa solo dos
 * datos: el id de la asignatura y el nuevo estado.
 * - Mueve la card de la asignatura a la columna correspondiente (usando
 * appendChild)
 */
async function dragdrop(ev) {
    ev.preventDefault();
    const column = ev.currentTarget;
    this.classList.remove('dragover');
    const subjId = ev.dataTransfer.getData('text/plain');
    const card = document.getElementById(subjId);
    const subjectId = card.dataset.id;
    const status = column.dataset.status;

    await updateSubjectStatus(subjectId, status);
    // La tarjeta se añade a un div que está dentro de la columna, por eso se
    // usa querySelector para seleccionar ese div y luego appendChild para
    // añadir la tarjeta a ese div.
    column.querySelector("div").appendChild(card);
}

/**
 * Guarda el id de la asignatura que se está arrastrando, para recuperarlo
 * luego en dragdrop.
 */
function dragstart(ev) {
    ev.dataTransfer.setData('text/plain', this.id);
}

/**
 * Elimina la clase 'dragover' (que añade un borde rojo) de todas las columnas.
 */
function dragend(ev) {
    // Remove dragover class from all zones
    zones.forEach(zone => zone.classList.remove('dragover'));
}

/**
 * Aplica los listeners de drag&drop a las columnas y la zona de "pendientes",
 * es decir, a todas las zonas que pueden recibir una asignatura arrastrada.
 */
function applyListeners() {
    // Drag&drop listeners
    // En vez de hacerlo una a una, podemos iterar por el array de zonas con
    // forEach y aplicar los listeners a cada una de ellas.

    // pendientesZone.addEventListener('dragover', dragover);
    // pendientesZone.addEventListener('dragenter', dragenter);
    // pendientesZone.addEventListener('dragleave', dragleave);
    // pendientesZone.addEventListener('drop', dragdrop);
    // empezadasColumn.addEventListener('dragover', dragover);
    // empezadasColumn.addEventListener('dragenter', dragenter);
    // empezadasColumn.addEventListener('dragleave', dragleave);
    // empezadasColumn.addEventListener('drop', dragdrop);
    // aprobadasColumn.addEventListener('dragover', dragover);
    // aprobadasColumn.addEventListener('dragenter', dragenter);
    // aprobadasColumn.addEventListener('dragleave', dragleave);
    // aprobadasColumn.addEventListener('drop', dragdrop);
    // suspendidasColumn.addEventListener('dragover', dragover);
    // suspendidasColumn.addEventListener('dragenter', dragenter);
    // suspendidasColumn.addEventListener('dragleave', dragleave);
    // suspendidasColumn.addEventListener('drop', dragdrop);

    zones.forEach(zone => {
        zone.addEventListener('dragover', dragover);
        zone.addEventListener('dragenter', dragenter);
        zone.addEventListener('dragleave', dragleave);
        zone.addEventListener('drop', dragdrop);
    });
}






////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// UI
// Estas funciones controlan el aspecto de la página (User Interface).
// Muestras u ocultan secciones y cambian el texto de los elementos del DOM que
// haga falta (el título, el eslogan, etc.)

/**
 * Muestra la lista de semestres y oculta la página de asignaturas.
 * También cambia el título y una palabra del eslogan.
 */
function goSemsList() {
    hideMe(semHeader, semesterPage);
    showMe(dashboardHeader, semestersList);
}

/**
 * Vacía la lista de semestres (se trata del `div` que contiene las cards de
 * los semestres), y los vuelve a crear todos de nuevo.
 * Esto se hace para que se actualice la lista de semestres cuando se crea uno
 * nuevo, o bien se actualiza o se borra.
 */
function refreshSemesters(semesters) {
    semestersList.innerHTML = '';
    semesters.forEach(sem => {
        semestersList.innerHTML += createSemCard(sem);
    });
}

/**
 * Muestra la página de asignaturas y oculta la lista de semestres.
 * También cambia el título y una palabra del eslogan.
 * @param {Number} id - Id del semestre que se quiere abrir
 */
async function openSem(id) {

    console.log('Opening sem', id);

    hideMe(dashboardHeader, semestersList);
    const sem = await getSemesterById(id);
    semesterPage.dataset.id = id;
    refreshSubjects(sem);
    showMe(semHeader, semesterPage);
}


async function openSemForm(id=null) {
    if (id) {
        // Si existe un id, estamos editando un semestre existente
        semModalTitle.innerHTML = 'Editar semestre';
        const sem = await getSemesterById(id);

        semFormFields.id.value = id;
        semFormFields.name.value = sem.name;
        semFormFields.year.value = sem.year;
        semFormFields.start.value = sem.start;
        semFormFields.end.value = sem.end;
        semFormFields.descrip.value = sem.descrip;
        semFormFields.color.value = sem.color;
        semFormFields.type.value = sem.type;
        semFormFields.tutorized.checked = sem.tutorized;

    } else {
        // Si no existe un id, estamos creando un semestre nuevo
        // Ponemos valores vacíos y por defecto
        semModalTitle.innerHTML = 'Nuevo semestre';
        semFormFields.id.value = '';
        semFormFields.name.value = '';
        semFormFields.year.value = '';
        semFormFields.start.value = '';
        semFormFields.end.value = '';
        semFormFields.descrip.value = '';
        semFormFields.color.value = '#c398b7';
        semFormFields.type.value = '1';
        semFormFields.tutorized.checked = true;
    }
    semesterModal.show();
}


/**
 * Vacía las listas de asignaturas (se trata de los `div` que contienen las
 * cards de las asignaturas), y las vuelve a crear todas de nuevo, cada una en
 * su lista correspondiente.
 */
function refreshSubjects(sem) {
    // Clear lists
    pendientesList.innerHTML = '';
    empezadasList.innerHTML = '';
    aprobadasList.innerHTML = '';
    suspendidasList.innerHTML = '';

    if (sem) {
        // Fill in semester subjects by status
        sem.subjects.forEach(subj => {
            const subjCard = createSubjectCard(subj);
            switch (subj.status) {
                case PENDIENTE:
                    pendientesList.innerHTML += subjCard;
                    break;
                case EMPEZADA:
                    empezadasList.innerHTML += subjCard;
                    break;
                case APROBADA:
                    aprobadasList.innerHTML += subjCard;
                    break;
                case SUSPENDIDA:
                    suspendidasList.innerHTML += subjCard;
                    break;
            }
        });

        // Add drag listeners to subject cards
        document.querySelectorAll('.parrafo').forEach(card => {
            card.addEventListener('dragstart', dragstart);
            card.addEventListener('dragend', dragend);
        });
    }
}

/**
 * Muestra el formulario de las asignaturas.
 * @param {Number} status - Estado de la asignatura que se quiere crear
 * (solo si se está creando).
 * @param {Number} id - Id de la asignatura que se quiere editar
 * (solo si se está editando).
 */
async function openSubjectForm(status, id = null) {
    // Set hidden values in form
    subjFormFields.semId.value = semesterPage.dataset.id;

    if (id) {
        // Si existe un id, estamos editando una asignatura existente
        subjModalTitle.innerHTML = 'Editar asignatura';
        const subj = await getSubjectById(id);

        subjFormFields.status.value = subj.status;
        subjFormFields.id.value = id;
        subjFormFields.name.value = subj.name;
        subjFormFields.descrip.value = subj.descrip;
        subjFormFields.difficulty.value = subj.difficulty;
        subjFormFields.grade.value = subj.grade;
        subjFormFields.like.checked = subj.like;

    } else {
        // Si no existe un id, estamos creando una asignatura nueva
        subjModalTitle.innerHTML = 'Nueva asignatura';
        subjFormFields.status.value = status;
        subjFormFields.id.value = '';
        subjFormFields.name.value = '';
        subjFormFields.descrip.value = '';
        subjFormFields.difficulty.value = '5'; // Valor por defecto
        subjFormFields.grade.value = '';
        subjFormFields.like.checked = false;
    }
    subjectModal.show();
}



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// GLOBALS
// Elements
// Obtener los elementos del html para que el JS los pueda gestionar
const dashboardHeader = document.getElementById('dashboardHeader');
const semHeader = document.getElementById('semHeader');
const semestersList = document.getElementById('semestersList');
const semesterPage = document.getElementById('semesterPage');
const semesterModal = new bootstrap.Modal('#semesterModal');
const semModalTitle = document.getElementById('semModalTitle');
const subjectModal = new bootstrap.Modal('#subjectModal');
const subjModalTitle = document.getElementById('subjModalTitle');
const subjectForm = document.getElementById('subjectForm');
const confirmDelete = new bootstrap.Modal('#confirmDelete');
const pendientesZone = document.getElementById('pendientes-zone');
const pendientesList = document.getElementById('pendientesList');
const empezadasColumn = document.getElementById('empezadas-column');
const empezadasList = document.getElementById('empezadasList');
const aprobadasColumn = document.getElementById('aprobadas-column');
const aprobadasList = document.getElementById('aprobadasList');
const suspendidasColumn = document.getElementById('suspendidas-column');
const suspendidasList = document.getElementById('suspendidasList');
// Fields in forms
const semFormFields = {
    id: document.getElementById('semId'),
    name: document.getElementById('semName'),
    year: document.getElementById('semYear'),
    start: document.getElementById('semStart'),
    end: document.getElementById('semEnd'),
    descrip: document.getElementById('semDescrip'),
    color: document.getElementById('semColor'),
    type: document.getElementById('semType'),
    tutorized: document.getElementById('semTutor'),
};
const subjFormFields = {
    id: document.getElementById('subjId'),
    status: document.getElementById('subjStatus'),
    semId: document.getElementById('subjSemId'),
    name: document.getElementById('subjectName'),
    descrip: document.getElementById('subjectDescrip'),
    difficulty: document.getElementById('subjectDifficulty'),
    grade: document.getElementById('subjectGrade'),
    like: document.getElementById('subjectLike'),
};
const zones = [pendientesZone, empezadasColumn, aprobadasColumn,
    suspendidasColumn];


/**
 * Inicializa la página.
 * - Aplica los listeners de las zonas Drag&Drop
 * - Obtiene los datos de la base de datos y los guarda en el objeto global
 * `data`.
 * - Actualiza la lista de semestres, a partir de los datos que acaba de
 * obtener.
*/
async function init() {
    applyListeners();
    data = await getData();
    refreshSemesters(data.semesters);
}
////////////////////////////////////////////////////////////////////////////////
// Todo el código anterior no hace nigún cambio en el DOM. Solo define variables
// y constantes y también funciones.
// Solo cuando se llega a este punto empieza a realizarse algo en la página.
init();
