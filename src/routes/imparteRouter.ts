import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/imparteModel';

const imparteRouter = express.Router();

// Crear relación imparte
imparteRouter.post('/', (req: Request, res: Response) => {
  const nuevaRelacion: Imparte = req.body;
  imparteController.create(nuevaRelacion, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Obtener todas las relaciones
imparteRouter.get('/', (req: Request, res: Response) => {
  imparteController.getAll((err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});

// Obtener por ID compuesta
imparteRouter.get('/:id_p/:cod_a', (req: Request, res: Response) => {
  const id_p = parseInt(req.params.id_p);
  const cod_a = parseInt(req.params.cod_a);
  imparteController.getById(id_p, cod_a, (err: Error, result: any) => {
    if (err) return res.status(404).json({ message: err.message });
    res.json(result);
  });
});

// Actualizar grupo y horario
imparteRouter.put('/:id_p/:cod_a', (req: Request, res: Response) => {
  const id_p = parseInt(req.params.id_p);
  const cod_a = parseInt(req.params.cod_a);
  const datosActualizados: Imparte = req.body;
  imparteController.update(id_p, cod_a, datosActualizados, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});

// Eliminar relación codigo profesor y codigo asignatura
imparteRouter.delete('/:id_p/:cod_a', (req: Request, res: Response) => {
  const id_p = parseInt(req.params.id_p);
  const cod_a = parseInt(req.params.cod_a);
  imparteController.deleteById(id_p, cod_a, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Ver asignatura por profesor
imparteRouter.get('/profesor/:id_p', (req: Request, res: Response) => {
  const id_p = parseInt(req.params.id_p);
  imparteController.getAsignaturasPorProfesor(id_p, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});

//Ver profesor por asignatura
imparteRouter.get('/asignatura/:cod_a', (req: Request, res: Response) => {
  const cod_a = parseInt(req.params.cod_a);
  imparteController.getProfesoresPorAsignatura(cod_a, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});


export { imparteRouter };
