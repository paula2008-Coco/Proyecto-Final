"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
//Crear un estudiante
const create = (estudiante, callback) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Estudiante creado exitosamente',
            data: {
                cod_e: estudiante.cod_e
            }
        });
    });
};
exports.create = create;
//Obtener todos los estudiantes
const getAll = (callback) => {
    const queryString = 'SELECT * FROM estudiantes';
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
//Obtener estudiante por ID
const getById = (id, callback) => {
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err)
            return callback(err);
        if (result.length === 0) {
            return callback(new Error('Estudiante no encontrado'));
        }
        callback(null, {
            statusCode: 200,
            data: result[0]
        });
    });
};
exports.getById = getById;
//Actualizar estudiante
const update = (id, updatedEstudiante, callback) => {
    const queryString = `
        UPDATE estudiantes
        SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ?
        WHERE cod_e = ?
    `;
    db_1.db.query(queryString, [
        updatedEstudiante.nom_e,
        updatedEstudiante.dir_e,
        updatedEstudiante.tel_e,
        updatedEstudiante.fech_nac,
        id
    ], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            message: 'Estudiante actualizado correctamente'
        });
    });
};
exports.update = update;
//Actualizar estudiante por ID
const updateById = (code_e, estudiante, callback) => {
    const queryString = 'UPDATE estudiantes SET cod_e = ?, nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, code_e], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Estudiante actualizado exitosamente'
        });
    });
};
exports.updateById = updateById;
//Eliminar estudiante por ID
const deleteById = (id, callback) => {
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.affectedRows === 0) {
            return callback(new Error('Estudiante no encontrado'));
        }
        callback(null, {
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente'
        });
    });
};
exports.deleteById = deleteById;
