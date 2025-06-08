"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfesoresPorAsignatura = exports.getAsignaturasPorProfesor = exports.deleteById = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
// Crear una relación imparte
const create = (imparte, callback) => {
    const query = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(query, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 201,
            message: 'Relación imparte creada exitosamente',
            data: { id_p: imparte.id_p, cod_a: imparte.cod_a }
        });
    });
};
exports.create = create;
// Obtener todas las relaciones imparte
const getAll = (callback) => {
    const query = 'SELECT * FROM imparte';
    db_1.db.query(query, (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};
exports.getAll = getAll;
// Obtener relación imparte por id_p y cod_a (clave compuesta)
const getById = (id_p, cod_a, callback) => {
    const query = 'SELECT * FROM imparte WHERE id_p = ? AND cod_a = ?';
    db_1.db.query(query, [id_p, cod_a], (err, result) => {
        if (err)
            return callback(err);
        if (result.length === 0) {
            return callback(new Error('Relación imparte no encontrada'));
        }
        callback(null, {
            statusCode: 200,
            data: result[0]
        });
    });
};
exports.getById = getById;
// Actualizar grupo y horario de la relación imparte
const update = (id_p, cod_a, updated, callback) => {
    const query = 'UPDATE imparte SET grupo = ?, horario = ? WHERE id_p = ? AND cod_a = ?';
    db_1.db.query(query, [updated.grupo, updated.horario, id_p, cod_a], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            message: 'Relación imparte actualizada correctamente'
        });
    });
};
exports.update = update;
// Eliminar relación imparte por id_p y cod_a
const deleteById = (id_p, cod_a, callback) => {
    const query = 'DELETE FROM imparte WHERE id_p = ? AND cod_a = ?';
    db_1.db.query(query, [id_p, cod_a], (err, result) => {
        if (err)
            return callback(err);
        if (result.affectedRows === 0) {
            return callback(new Error('Relación imparte no encontrada'));
        }
        callback(null, {
            statusCode: 200,
            message: 'Relación imparte eliminada exitosamente'
        });
    });
};
exports.deleteById = deleteById;
// Ver asignaturas que imparte un profesor
const getAsignaturasPorProfesor = (id_p, callback) => {
    const query = `
        SELECT a.cod_a, a.nom_a, i.grupo, i.horario
        FROM imparte i
        JOIN asignatura a ON i.cod_a = a.cod_a
        WHERE i.id_p = ?
    `;
    db_1.db.query(query, [id_p], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};
exports.getAsignaturasPorProfesor = getAsignaturasPorProfesor;
// Ver profesores que imparten una asignatura
const getProfesoresPorAsignatura = (cod_a, callback) => {
    const query = `
        SELECT p.cod_p, p.nom_p, i.grupo, i.horario
        FROM imparte i
        JOIN profesor p ON i.id_p = p.cod_p
        WHERE i.cod_a = ?
    `;
    db_1.db.query(query, [cod_a], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};
exports.getProfesoresPorAsignatura = getProfesoresPorAsignatura;
