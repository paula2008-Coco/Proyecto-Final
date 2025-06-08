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
exports.imparteRouter = void 0;
const express_1 = __importDefault(require("express"));
const imparteController = __importStar(require("../controllers/imparteController"));
exports.imparteRouter = express_1.default.Router();
// Crear una nueva relación imparte
exports.imparteRouter.post('/', (req, res) => {
    const nuevaRelacion = req.body;
    imparteController.create(nuevaRelacion, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener todas las relaciones imparte
exports.imparteRouter.get('/', (req, res) => {
    imparteController.getAll((err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener relación imparte por id_p y cod_a (usamos query params o params separados)
exports.imparteRouter.get('/:id_p/:cod_a', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    imparteController.getById(id_p, cod_a, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Actualizar relación imparte por id_p y cod_a
exports.imparteRouter.put('/:id_p/:cod_a', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const updatedRelacion = req.body;
    imparteController.update(id_p, cod_a, updatedRelacion, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Eliminar relación imparte por id_p y cod_a
exports.imparteRouter.delete('/:id_p/:cod_a', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    imparteController.deleteById(id_p, cod_a, (err, result) => {
        if (err)
            return res.status(404).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener asignaturas que imparte un profesor
exports.imparteRouter.get('/profesor/:id_p/asignaturas', (req, res) => {
    const id_p = parseInt(req.params.id_p);
    imparteController.getAsignaturasPorProfesor(id_p, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener profesores que imparten una asignatura
exports.imparteRouter.get('/asignatura/:cod_a/profesores', (req, res) => {
    const cod_a = parseInt(req.params.cod_a);
    imparteController.getProfesoresPorAsignatura(cod_a, (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(result.statusCode).json(result);
    });
});
