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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const estudianteRouter_1 = require("./routes/estudianteRouter");
const profesorRouter_1 = require("./routes/profesorRouter");
const asignaturaRouter_1 = require("./routes/asignaturaRouter");
const imparteRouter_1 = require("./routes/imparteRouter");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
const HOST = process.env.HOST || 'localhost';
// Middleware
app.use((0, cors_1.default)());
app.use(bodyParser.json());
// Ruta raíz
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});
// Rutas de API
app.use('/estudiante', estudianteRouter_1.estudianteRouter);
app.use('/profesor', profesorRouter_1.profesorRouter);
app.use('/asignatura', asignaturaRouter_1.asignaturaRouter);
app.use('/imparte', imparteRouter_1.imparteRouter);
// Ya no usamos db.connect() porque usas createPool() en db.ts
// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
