import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import semestresRoutes from './routes/semestresRoutes.js'

const app = express();
dotenv.config();
conectarDB();

// Routing
app.get("/", (req, res) => {
  res.send("Hola Mundo, by Jack X");
});

app.use("/semestres", semestresRoutes);

// Puerto escuchado
const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log('Servidor up en puerto 4000')
})