import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import { estudianteRouter } from './routes/estudianteRouter'; 
import { profesorRouter } from './routes/profesorRouter';
import { asignaturaRouter } from './routes/asignaturaRouter';
import { imparteRouter } from './routes/imparteRouter';
import { inscribeRouter } from './routes/inscribeRouter';


import { db } from './db';

const app = express();
const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz
app.get('/', (req: Request, res: Response) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

// Rutas de API
app.use('/estudiante', estudianteRouter);
app.use('/profesor', profesorRouter);
app.use('/asignatura', asignaturaRouter);
app.use('/imparte', imparteRouter);
app.use('/inscribe',inscribeRouter);

// Ya no usamos db.connect() porque usas createPool() en db.ts

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
