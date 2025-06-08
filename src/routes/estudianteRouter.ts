import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiantes } from '../models/estudianteModel';

export const estudianteRouter = express.Router();

// Crear un nuevo estudiante
estudianteRouter.post('/', (req: Request, res: Response) => {
    const nuevoEstudiante: Estudiantes = req.body;

    estudianteController.create(nuevoEstudiante, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener todos los estudiantes
estudianteRouter.get('/', (req: Request, res: Response) => {
    estudianteController.getAll((err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener estudiante por ID
estudianteRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    estudianteController.getById(id, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar estudiante por ID
estudianteRouter.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedEstudiante: Estudiantes = req.body;

    estudianteController.update(id, updatedEstudiante, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar cod_e (clave primaria) de un estudiante
estudianteRouter.put('/actualizar-id/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const estudiante: Estudiantes = req.body;

    estudianteController.updateById(id, estudiante, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Eliminar estudiante por ID
estudianteRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    estudianteController.deleteById(id, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});


