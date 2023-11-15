import mongoose from "mongoose";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const conectarDB = async () => {
    try {
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;

        // Formatea el password para que sea URL codificado
        const encodedPassword = encodeURIComponent(dbPassword);

        // Construye la cadena de conexión de MongoDB
        const connectionString = `mongodb+srv://${dbUser}:${encodedPassword}@clusterp2jackx.pqmdrue.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        const connection = await mongoose.connect(connectionString, {});

        // Probando la conexión
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;
