import express, { Request, Response } from 'express';
import * as asignaturaController from '../controllers/asignaturaController';
import { Asignatura } from '../models/asignaturaModel';
const asignaturaRouter = express.Router();

//Enviar una nueva asignatura
asignaturaRouter.post('/', async (req: Request, res: Response) => {
    const newAsignatura: Asignatura = req.body;
    asignaturaController.create(newAsignatura, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

// Obtener todas las asignaturas
asignaturaRouter.get('/', (req: Request, res: Response) => {
  asignaturaController.getAll((err: Error, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Obtener asignatura por ID
asignaturaRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  asignaturaController.getById(id, (err: Error, result: any) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(result);
  });
});

// Actualizar asignatura por ID
asignaturaRouter.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const asignaturaActualizada = req.body;
  asignaturaController.update(id, asignaturaActualizada, (err: Error, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Eliminar asignatura por ID
asignaturaRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  asignaturaController.deleteById(id, (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});


export { asignaturaRouter };





