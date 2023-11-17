////////////////////////////////////////////////////////////////////////////////
// REAL DATABASE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

/**
 * Obtiene los datos de la base de datos.
 * @returns {Object} - Objeto con los datos de la base de datos
 */
async function getData() {
    const responseRaw = await fetch('/db?allData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `{
                semesters {
                    id
                    name
                    year
                    start
                    end
                    descrip
                    color
                    kind
                    tutorized
                    subjects {
                        id
                        name
                        descrip
                        status
                        difficulty
                        grade
                        like
                    }
                }
            }`
        })
    });
    const responseJson = await responseRaw.json();
    console.log(responseJson)
    return responseJson.data;
}


