import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController';
import { Profesor } from '../models/profesorModel';
const profesorRouter = express.Router();
 
//Enviar todos los profesores
profesorRouter.post('/', async (req: Request, res: Response) => {
    const newProfesor: Profesor = req.body;
    profesorController.create(newProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
 // Obtener todos los profesores
profesorRouter.get('/', (req: Request, res: Response) => {
  profesorController.getAll((err: Error, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Obtener profesor por ID
profesorRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  profesorController.getById(id, (err: Error, result: any) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(result);
  });
});

// Actualizar profesor por ID 
profesorRouter.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const profesorActualizado = req.body;
  profesorController.update(id, profesorActualizado, (err: Error, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Eliminar profesor
profesorRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  profesorController.deleteById(id, (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(result.statusCode).json(result);
  });
});



export { profesorRouter };
