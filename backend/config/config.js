// Importa las bibliotecas necesarias
import mongoose from "mongoose";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Definición de la función para conectar a la base de datos
const conectarDB = async () => {
    try {
        // Obtiene las variables de entorno para la conexión a la base de datos
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;

        // Formatea el password para que sea URL codificado
        const encodedPassword = encodeURIComponent(dbPassword);

        // Construye la cadena de conexión de MongoDB
        const connectionString = `mongodb+srv://${dbUser}:${encodedPassword}@clusterp2jackx.pqmdrue.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        // Establece la conexión a MongoDB usando Mongoose
        const connection = await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Imprime un mensaje indicando que la conexión fue exitosa
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        // Si hay un error al conectar, imprime un mensaje de error y termina la aplicación
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Exporta la función para que pueda ser utilizada en otros archivos
export default conectarDB;
