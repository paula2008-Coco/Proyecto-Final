import express, { Request, Response } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import { Inscribe } from '../models/inscribeModel';

export const inscribeRouter = express.Router();

// Crear una inscripción
inscribeRouter.post('/', (req: Request, res: Response) => {
    const nuevaInscripcion: Inscribe = req.body;

    inscribeController.create(nuevaInscripcion, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener todas las inscripciones
inscribeRouter.get('/', (req: Request, res: Response) => {
    inscribeController.getAll((err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Obtener inscripción por IDs compuestos (cod_e, cod_a, cod_p)
inscribeRouter.get('/:cod_e/:cod_p/:cod_a', (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_p = parseInt(req.params.cod_a);
    const cod_a = parseInt(req.params.cod_p);

    inscribeController.getById(cod_e, cod_p, cod_a, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Actualizar inscripción
inscribeRouter.put('/:cod_e/:cod_p/:cod_a', (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_p = parseInt(req.params.cod_a);
    const cod_a = parseInt(req.params.cod_p);
    const updatedInscripcion: Inscribe = req.body;

    inscribeController.update(cod_e, cod_p, cod_a, updatedInscripcion, (err: any, result: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

// Eliminar inscripción
inscribeRouter.delete('/:cod_e/:cod_p/:cod_a', (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_p = parseInt(req.params.cod_a);
    const cod_a = parseInt(req.params.cod_p);

    inscribeController.deleteById(cod_e, cod_p, cod_a, (err: any, result: any) => {
        if (err) return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});

