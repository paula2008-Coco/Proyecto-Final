import { Inscribe } from '../models/inscribeModel';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

//Crear una inscripción
export const create = (inscribe: Inscribe, callback: Function) => {
    const queryString = `
      INSERT INTO inscribe (cod_e, cod_a, cod_p, grupo, nota1, nota2, nota3) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        queryString,
        [
          inscribe.cod_e,
          inscribe.cod_a,
          inscribe.cod_p,
          inscribe.grupo,
          inscribe.nota1,
          inscribe.nota2,
          inscribe.nota3
        ],
        (err) => {
            if (err) { callback(err); return; }

            callback(null, {
                statusCode: 201,
                message: 'Inscripción creada exitosamente',
                data: {
                    cod_e: inscribe.cod_e,
                    cod_a: inscribe.cod_a,
                    cod_p: inscribe.cod_p
                }
            });
        }
    );
};

//Obtener todas las inscripciones
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM inscribe';

    db.query(
        queryString, (err, result) => {
        if (err) return callback(err);

        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};

//Obtener inscripción por ID
export const getById = (cod_e: number, cod_a: number, cod_p: number, callback: Function) => {
    const queryString = 'SELECT * FROM inscribe WHERE cod_e = ? AND cod_a = ? AND cod_p = ?';

    db.query(
        queryString, [cod_e, cod_a, cod_p], (err, result) => {
        if (err) return callback(err);

        if ((result as any[]).length === 0) {
            return callback(new Error('Inscripción no encontrada'));
        }

        callback(null, {
            statusCode: 200,
            data: (result as any[])[0]
        });
    });
};

//Actualizar inscripción
export const update = (cod_e: number, cod_a: number, cod_p: number, updatedInscribe: Inscribe, callback: Function) => {
    const queryString = `
        UPDATE inscribe
        SET grupo = ?, nota1 = ?, nota2 = ?, nota3 = ?
        WHERE cod_e = ? AND cod_a = ? AND cod_p = ?
    `;

    db.query(
        queryString,
        [
            updatedInscribe.grupo,
            updatedInscribe.nota1,
            updatedInscribe.nota2,
            updatedInscribe.nota3,
            cod_e,
            cod_a,
            cod_p
        ],
        (err, result) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 200,
                message: 'Inscripción actualizada correctamente'
            });
        }
    );
};

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
