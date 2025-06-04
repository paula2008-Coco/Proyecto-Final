import express, { Request, Response } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import { Inscribe } from '../models/inscribeModel';

const inscribeRouter = express.Router();

// Crear inscripción
inscribeRouter.post('/', (req: Request, res: Response) => {
  const newInscribe: Inscribe = req.body;
  inscribeController.create(newInscribe, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(result.statusCode).json(result);
  });
});

// Obtener todas las inscripciones
inscribeRouter.get('/', (req: Request, res: Response) => {
  inscribeController.getAll((err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});

// Obtener inscripción por id compuesta: cod_e, cod_a, cod_p
inscribeRouter.get('/:cod_e/:cod_a/:cod_p', (req: Request, res: Response) => {
  const cod_e = parseInt(req.params.cod_e);
  const cod_a = parseInt(req.params.cod_a);
  const cod_p = parseInt(req.params.cod_p);

  inscribeController.getById(cod_e, cod_a, cod_p, (err: Error, result: any) => {
    if (err) return res.status(404).json({ message: err.message });
    res.json(result);
  });
});

// Actualizar inscripción por id compuesta
inscribeRouter.put('/:cod_e/:cod_a/:cod_p', (req: Request, res: Response) => {
  const cod_e = parseInt(req.params.cod_e);
  const cod_a = parseInt(req.params.cod_a);
  const cod_p = parseInt(req.params.cod_p);
  const updatedInscribe: Inscribe = req.body;

  inscribeController.update(cod_e, cod_a, cod_p, updatedInscribe, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});

// Eliminar inscripción por id compuesta
/*
inscribeRouter.delete('/:cod_e/:cod_a/:cod_p', (req: Request, res: Response) => {
  const cod_e = parseInt(req.params.cod_e);
  const cod_a = parseInt(req.params.cod_a);
  const cod_p = parseInt(req.params.cod_p);

  inscribeController.deleteById(cod_e, cod_a, cod_p, (err: Error, result: any) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
});
*/

export { inscribeRouter };
