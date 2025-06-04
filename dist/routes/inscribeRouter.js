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
const inscribeRouter = express_1.default.Router();
exports.inscribeRouter = inscribeRouter;
// Crear inscripción
inscribeRouter.post('/', (req, res) => {
    const newInscribe = req.body;
    inscribeController.create(newInscribe, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message });
        res.status(result.statusCode).json(result);
    });
});
// Obtener todas las inscripciones
inscribeRouter.get('/', (req, res) => {
    inscribeController.getAll((err, result) => {
        if (err)
            return res.status(500).json({ message: err.message });
        res.json(result);
    });
});
// Obtener inscripción por id compuesta: cod_e, cod_a, cod_p
inscribeRouter.get('/:cod_e/:cod_a/:cod_p', (req, res) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_a = parseInt(req.params.cod_a);
    const cod_p = parseInt(req.params.cod_p);
    inscribeController.getById(cod_e, cod_a, cod_p, (err, result) => {
        if (err)
            return res.status(404).json({ message: err.message });
        res.json(result);
    });
});
// Actualizar inscripción por id compuesta
inscribeRouter.put('/:cod_e/:cod_a/:cod_p', (req, res) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_a = parseInt(req.params.cod_a);
    const cod_p = parseInt(req.params.cod_p);
    const updatedInscribe = req.body;
    inscribeController.update(cod_e, cod_a, cod_p, updatedInscribe, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message });
        res.json(result);
    });
});
