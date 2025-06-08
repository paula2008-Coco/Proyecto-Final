import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturaController';
import { Asignaturas } from '../models/asignaturaModel';

export const asignaturaRouter = express.Router();

// Crear una nueva asignatura
asignaturaRouter.post('/', (req: Request, res: Response) => {
  const nuevaAsignatura: Asignaturas = req.body;

  asignaturaController.createAsignatura(nuevaAsignatura, (err: any, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Obtener todas las asignaturas
asignaturaRouter.get('/', (req: Request, res: Response) => {
  asignaturaController.getAllAsignaturas((err: any, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Obtener asignatura por ID
asignaturaRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  asignaturaController.getAsignaturaById(id, (err: any, result: any) => {
    if (err) return res.status(404).json({ error: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Actualizar asignatura por ID
asignaturaRouter.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedAsignatura: Asignaturas = req.body;

  asignaturaController.updateAsignatura(id, updatedAsignatura, (err: any, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Actualizar cod_a (clave primaria) de una asignatura
asignaturaRouter.put('/actualizar-id/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const asignatura: Asignaturas = req.body;

  asignaturaController.updateAsignaturaById(id, asignatura, (err: any, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Eliminar asignatura por ID
asignaturaRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  asignaturaController.deleteAsignaturaById(id, (err: any, result: any) => {
    if (err) return res.status(404).json({ error: err.message });
    res.status(result.statusCode).json(result);
  });
});

