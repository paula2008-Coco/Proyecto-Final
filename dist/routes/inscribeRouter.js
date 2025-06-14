"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inscribeRouter = void 0;
const express_1 = __importDefault(require("express"));
const inscribeController = __importStar(require("../controllers/inscribeController"));
exports.inscribeRouter = express_1.default.Router();
// Crear una inscripción
exports.inscribeRouter.post('/', (req, res) => {
    console.log('Body recibido en inscribe:', req.body); // <-- Log para depuración
    const nuevaInscripcion = req.body;
    inscribeController.create(nuevaInscripcion, (err, result) => {
        if (err) {
            console.error('Error al guardar inscripción:', err); // <-- Log de error
            return res.status(500).json({ error: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
// Obtener todas las inscripciones
exports.inscribeRouter.get('/', (req, res) => {
    inscribeController.getAll((err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener inscripción por IDs compuestos (cod_e, cod_p, cod_a)
exports.inscribeRouter.get('/:cod_e/:cod_p/:cod_a', (req, res) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_p = parseInt(req.params.cod_p);
    const cod_a = parseInt(req.params.cod_a);
    inscribeController.getById(cod_e, cod_p, cod_a, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Actualizar inscripción
exports.inscribeRouter.put('/:cod_e/:cod_p/:cod_a', (req, res) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_p = parseInt(req.params.cod_p);
    const cod_a = parseInt(req.params.cod_a);
    const updatedInscripcion = req.body;
    inscribeController.update(cod_e, cod_p, cod_a, updatedInscripcion, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
/*
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
*/
