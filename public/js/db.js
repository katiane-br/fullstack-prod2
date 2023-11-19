////////////////////////////////////////////////////////////////////////////////
// REAL DATABASE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Función genérica
/**
 * Obtiene los datos de la base de datos.
 * @param {Object} body - Objeto con la query a ejecutar
 * @returns {Object} - Objeto con los datos de la base de datos
 */
async function connectDB(body) {
    try {
        const responseRaw = await fetch('/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const responseJson = await responseRaw.json();
        console.log("From DB", responseJson.data);
        messageFlash("Conectado con la base de datos", "success");
        return responseJson.data;

    } catch (error) {
        console.error(error);
        messageFlash("Error de conexión con la base de datos", "danger")
        return null;
    }
}

////////////////////////////////////////////////////////////////////////////////
// Queries
async function getSemestersDB() {
    const body = {
        query: `{
            semesters {
                id
                name
                descrip
                color
            }
        }`
    };
    const data = await connectDB(body)
    if (data) { return data.semesters; }
    return [];
}


async function getSemesterByIdDB(id) {
    const body = {
        query: `{
            getSemesterById(id: "${id}") {
                id
                name
                year
                start
                end
                descrip
                color
                kind
                tutorized
            }
        }`
    };
    const data = await connectDB(body);
    if (data) { return data.getSemesterById; }
    return {};
}

async function getSubjectsBySemesterIdDB(semId) {
    const body = {
        query: `{
            getSubjectsBySemesterId(semId: "${semId}") {
                id
                semId
                name
                descrip
                status
            }
        }`
    };
    const data = await connectDB(body);
    if (data) {
        return data.getSubjectsBySemesterId;
    }
    return [];
}

async function getSubjectByIdDB(id) {
    const body = {
        query: `{
            getSubjectById(id: "${id}") {
                id
                semId
                name
                descrip
                status
                difficulty
                grade
                like
            }
        }`
    };
    const data = await connectDB(body);
    if (data) { return data.getSubjectById; }
    return {};
}


////////////////////////////////////////////////////////////////////////////////
// Mutations (coming soon in Producto 3)
