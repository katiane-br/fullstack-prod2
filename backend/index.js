import express from 'express';
import 'dotenv/config'
import conectarDB from './config/db.js';
import semestersRoutes from './routes/semestersRoutes.js'

const app = express();
conectarDB();

// Routing
app.get("/", (req, res) => {
  res.send("Hola Mundo, by Jack X");
});

app.use("/semester", semestersRoutes);

// Puerto escuchado
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Servidor up en puerto', PORT)
})