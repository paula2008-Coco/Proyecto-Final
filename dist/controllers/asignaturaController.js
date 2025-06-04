"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
//Crear una asignatura
const create = (asignatura, callback) => {
    const queryString = 'INSERT INTO Asignatura (cod_a, nom_a, inh_a, credit_a) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.inh_a, asignatura.credit_a], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 201,
            message: 'Asignatura creada exitosamente',
            data: {
                cod_a: asignatura.cod_a
            }
        });
    });
};
exports.create = create;
//Obtener todas las asignaturas
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Asignatura';
    db_1.db.query(queryString, (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};
exports.getAll = getAll;
//Obtener asignaturas por id
const getById = (id, callback) => {
    const queryString = 'SELECT * FROM Asignatura WHERE cod_a = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err)
            return callback(err);
        if (result.length === 0) {
            return callback(new Error('Asignatura no encontrada'));
        }
        callback(null, {
            statusCode: 200,
            data: result[0]
        });
    });
};
exports.getById = getById;
//Actualizar asignatura
const update = (id, updatedAsignatura, callback) => {
    const queryString = `
        UPDATE Asignatura
        SET nom_a = ?, inh_a = ?, credit_a = ?
        WHERE cod_a = ?
    `;
    db_1.db.query(queryString, [
        updatedAsignatura.nom_a,
        updatedAsignatura.inh_a,
        updatedAsignatura.credit_a,
        id
    ], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            message: 'Asignatura actualizada correctamente'
        });
    });
};
exports.update = update;
//Actualizar asignatura por ID
const updateById = (cod_a, asignatura, callback) => {
    const queryString = 'UPDATE Asignatura SET cod_a = ?, nom_a = ?, inh_a = ?, credit_a = ? WHERE cod_a = ?';
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.inh_a, asignatura.credit_a, cod_a], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura actualizada exitosamente'
        });
    });
};
exports.updateById = updateById;
//Eliminar asignatura por ID
const deleteById = (id, callback) => {
    const queryString = 'DELETE FROM Asignatura WHERE cod_a = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.affectedRows === 0) {
            return callback(new Error('Asignatura no encontrada'));
        }
        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente'
        });
    });
};
exports.deleteById = deleteById;
