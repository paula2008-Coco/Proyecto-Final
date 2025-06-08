import mysql from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // máximo conexiones simultáneas
});

// Opcional: probar conexión
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos");
    if (connection) connection.release(); // liberar la conexión
  }
});
