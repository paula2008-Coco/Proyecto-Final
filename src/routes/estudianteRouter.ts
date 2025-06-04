import express, { Request, Response } from 'express';
import * as estudianteController from '../controllers/estudianteController';
import { Estudiante } from '../models/estudianteModel';
const estudianteRouter = express.Router();
 
// Enviar un nuevo estudiante
estudianteRouter.post('/', async (req: Request, res: Response) => {
    const newEstudiante: Estudiante = req.body;
    estudianteController.create(newEstudiante, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 
// Obtener todos los estudiantes
estudianteRouter.get('/', (req: Request, res: Response) => {
  estudianteController.getAll((err: Error, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Obtener estudiante por ID
estudianteRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  estudianteController.getById(id, (err: Error, result: any) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(result);
  });
});


// Actualizar estudiante por id
estudianteRouter.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const estudianteActualizado = req.body;
  estudianteController.update(id, estudianteActualizado, (err: Error, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Eliminar estudiante
estudianteRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  estudianteController.deleteById(id, (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});


export {estudianteRouter} 