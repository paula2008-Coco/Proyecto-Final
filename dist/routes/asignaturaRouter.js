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
exports.asignaturaRouter = void 0;
const express_1 = __importDefault(require("express"));
const asignaturaController = __importStar(require("../controllers/asignaturaController"));
exports.asignaturaRouter = express_1.default.Router();
// Crear una nueva asignatura
exports.asignaturaRouter.post('/', (req, res) => {
    const nuevaAsignatura = req.body;
    asignaturaController.createAsignatura(nuevaAsignatura, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener todas las asignaturas
exports.asignaturaRouter.get('/', (req, res) => {
    asignaturaController.getAllAsignaturas((err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener asignatura por ID
exports.asignaturaRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    asignaturaController.getAsignaturaById(id, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Actualizar asignatura por ID
exports.asignaturaRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAsignatura = req.body;
    asignaturaController.updateAsignatura(id, updatedAsignatura, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Actualizar cod_a (clave primaria) de una asignatura
exports.asignaturaRouter.put('/actualizar-id/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const asignatura = req.body;
    asignaturaController.updateAsignaturaById(id, asignatura, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Eliminar asignatura por ID
exports.asignaturaRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    asignaturaController.deleteAsignaturaById(id, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
