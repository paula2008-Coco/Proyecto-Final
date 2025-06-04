"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
//Crear un profesor
const create = (profesor, callback) => {
    const queryString = 'INSERT INTO Profesor (cod_p, nom_p, profesion_p, dir_p, tel_p, fech_nac) VALUES (?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [profesor.cod_p, profesor.nom_p, profesor.profesion_p, profesor.dir_p, profesor.tel_p, profesor.fech_nac], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Profesor creado exitosamente',
            data: {
                cod_p: profesor.cod_p
            }
        });
    });
};
exports.create = create;
//Obtener todos los profesores
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Profesor';
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
//Obtener un profesor por ID
const getById = (id, callback) => {
    const queryString = 'SELECT * FROM Profesor WHERE cod_p = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err)
            return callback(err);
        if (result.length === 0) {
            return callback(new Error('Profesor no encontrado'));
        }
        callback(null, {
            statusCode: 200,
            data: result[0]
        });
    });
};
exports.getById = getById;
//Actualizar un profesor
const update = (id, updatedProfesor, callback) => {
    const queryString = `
        UPDATE Profesor
        SET nom_p = ?, profesion_p = ?, dir_p = ?, tel_p = ?, fech_nac = ?
        WHERE cod_p = ?
    `;
    db_1.db.query(queryString, [
        updatedProfesor.nom_p,
        updatedProfesor.profesion_p,
        updatedProfesor.dir_p,
        updatedProfesor.tel_p,
        updatedProfesor.fech_nac,
        id
    ], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            message: 'Profesor actualizado correctamente'
        });
    });
};
exports.update = update;
//Actualizar un profesor por ID
const updateById = (cod_p, profesor, callback) => {
    const queryString = 'UPDATE Profesor SET cod_p = ?, nom_p = ?, profesion_p = ?, dir_p = ?, tel_p = ?, WHERE cod_p = ?';
    db_1.db.query(queryString, [profesor.cod_p, profesor.nom_p, profesor.profesion_p, profesor.dir_p, profesor.tel_p, cod_p], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Profesor actualizado exitosamente'
        });
    });
};
exports.updateById = updateById;
//Eliminar un profesor por ID
const deleteById = (id, callback) => {
    const queryString = 'DELETE FROM Profesor WHERE cod_p = ?';
    db_1.db.query(queryString, [id], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.affectedRows === 0) {
            return callback(new Error('Profesor no encontrado'));
        }
        callback(null, {
            statusCode: 200,
            message: 'Profesor eliminado exitosamente'
        });
    });
};
exports.deleteById = deleteById;
