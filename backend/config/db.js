import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const dbUser = "JackX"; // Tu nombre de usuario de MongoDB
        const dbPassword = "%01112023JackX%"; // Tu contraseña de MongoDB
        const dbName = "uptask"; // Nombre de tu base de datos

        // Formatea el password para que sea URL codificado
        const encodedPassword = encodeURIComponent(dbPassword);

        // Construye la cadena de conexión de MongoDB
        const connectionString = `mongodb+srv://${dbUser}:${encodedPassword}@clusterp2jackx.pqmdrue.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        const connection = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Probando la conexión
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;
