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
exports.estudianteRouter = void 0;
const express_1 = __importDefault(require("express"));
const estudianteController = __importStar(require("../controllers/estudianteController"));
exports.estudianteRouter = express_1.default.Router();
// Crear un nuevo estudiante
exports.estudianteRouter.post('/', (req, res) => {
    console.log('Body recibido en estudiante:', req.body);
    // Convertir '' a null para fech_nac directamente en req.body
    if (req.body.fech_nac === '') {
        req.body.fech_nac = null;
    }
    const nuevoEstudiante = req.body;
    estudianteController.create(nuevoEstudiante, (err, result) => {
        if (err) {
            console.error('Error al guardar estudiante:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(result.statusCode).json(result);
    });
});
// Obtener todos los estudiantes
exports.estudianteRouter.get('/', (req, res) => {
    estudianteController.getAll((err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener estudiante por ID
exports.estudianteRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    estudianteController.getById(id, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Actualizar estudiante por ID
exports.estudianteRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedEstudiante = req.body;
    estudianteController.update(id, updatedEstudiante, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Actualizar cod_e (clave primaria) de un estudiante
exports.estudianteRouter.put('/actualizar-id/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = req.body;
    estudianteController.updateById(id, estudiante, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Eliminar estudiante por ID
exports.estudianteRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    estudianteController.deleteById(id, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
