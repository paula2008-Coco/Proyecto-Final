import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController';
import { Profesores } from '../models/profesorModel';

export const profesorRouter = express.Router();

// Crear un nuevo profesor
profesorRouter.post('/', (req: Request, res: Response) => {
    const nuevoProfesor: Profesores = req.body;

    profesorController.create(nuevoProfesor, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener todos los profesores
profesorRouter.get('/', (req: Request, res: Response) => {
    profesorController.getAll((err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener un profesor por ID
profesorRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    profesorController.getById(id, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar un profesor por ID
profesorRouter.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const profesorActualizado: Profesores = req.body;

    profesorController.update(id, profesorActualizado, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar cod_p (clave primaria) de un profesor
profesorRouter.put('/actualizar-id/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const profesor: Profesores = req.body;

    profesorController.updateById(id, profesor, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Eliminar un profesor por ID
profesorRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    profesorController.deleteById(id, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

