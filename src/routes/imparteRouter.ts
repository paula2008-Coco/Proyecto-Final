import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/imparteModel';

export const imparteRouter = express.Router();

// Crear una nueva relación imparte
imparteRouter.post('/', (req: Request, res: Response) => {
    const nuevaRelacion: Imparte = req.body;

    imparteController.create(nuevaRelacion, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener todas las relaciones imparte
imparteRouter.get('/', (req: Request, res: Response) => {
    imparteController.getAll((err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener relación imparte por id_p y cod_a (usamos query params o params separados)
imparteRouter.get('/:id_p/:cod_a', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);

    imparteController.getById(id_p, cod_a, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar relación imparte por id_p y cod_a
imparteRouter.put('/:id_p/:cod_a', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const updatedRelacion: Imparte = req.body;

    imparteController.update(id_p, cod_a, updatedRelacion, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Eliminar relación imparte por id_p y cod_a
imparteRouter.delete('/:id_p/:cod_a', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);

    imparteController.deleteById(id_p, cod_a, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener asignaturas que imparte un profesor
imparteRouter.get('/profesor/:id_p/asignaturas', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);

    imparteController.getAsignaturasPorProfesor(id_p, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener profesores que imparten una asignatura
imparteRouter.get('/asignatura/:cod_a/profesores', (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);

    imparteController.getProfesoresPorAsignatura(cod_a, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
