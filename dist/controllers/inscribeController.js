"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
//Crear una inscripción
const create = (inscribe, callback) => {
    const queryString = `
      INSERT INTO inscribe (cod_e, cod_a, cod_p, grupo, n1, n2, n3) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db_1.db.query(queryString, [
        inscribe.cod_e,
        inscribe.cod_a,
        inscribe.cod_p,
        inscribe.grupo,
        inscribe.n1,
        inscribe.n2,
        inscribe.n3
    ], (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, {
            statusCode: 201,
            message: 'Inscripción creada exitosamente',
            data: {
                cod_e: inscribe.cod_e,
                cod_a: inscribe.cod_a,
                cod_p: inscribe.cod_p
            }
        });
    });
};
exports.create = create;
//Obtener todas las inscripciones
const getAll = (callback) => {
    const queryString = 'SELECT * FROM inscribe';
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
//Obtener inscripción por ID
const getById = (cod_e, cod_a, cod_p, callback) => {
    const queryString = 'SELECT * FROM inscribe WHERE cod_e = ? AND cod_a = ? AND cod_p = ?';
    db_1.db.query(queryString, [cod_e, cod_a, cod_p], (err, result) => {
        if (err)
            return callback(err);
        if (result.length === 0) {
            return callback(new Error('Inscripción no encontrada'));
        }
        callback(null, {
            statusCode: 200,
            data: result[0]
        });
    });
};
exports.getById = getById;
//Actualizar inscripción
const update = (cod_e, cod_a, cod_p, updatedInscribe, callback) => {
    const queryString = `
        UPDATE inscribe
        SET grupo = ?, n1 = ?, n2 = ?, n3 = ?
        WHERE cod_e = ? AND cod_a = ? AND cod_p = ?
    `;
    db_1.db.query(queryString, [
        updatedInscribe.grupo,
        updatedInscribe.n1,
        updatedInscribe.n2,
        updatedInscribe.n3,
        cod_e,
        cod_a,
        cod_p
    ], (err, result) => {
        if (err)
            return callback(err);
        callback(null, {
            statusCode: 200,
            message: 'Inscripción actualizada correctamente'
        });
    });
};
exports.update = update;
/*
 //Eliminar inscripción por ID
 export const deleteById = (cod_e: number, cod_a: number, cod_p: number, callback: Function) => {
     const queryString = 'DELETE FROM inscribe WHERE cod_e = ? AND cod_a = ? AND cod_p = ?';

     db.query(queryString, [cod_e, cod_a, cod_p], (err, result) => {
         if (err) return callback(err);

         if ((result as any).affectedRows === 0) {
             return callback(new Error('Inscripción no encontrada'));
         }

         callback(null, {
             statusCode: 200,
             message: 'Inscripción eliminada exitosamente'
         });
     });
 };
*/
