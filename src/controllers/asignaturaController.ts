import { Asignatura } from '../models/asignaturaModel';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

//Crear una asignatura
export const create = (asignatura: Asignatura, callback: Function) => {
    const queryString = 'INSERT INTO Asignatura (cod_a, nom_a, inh_a, credit_a) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [asignatura.cod_a, asignatura.nom_a, asignatura.inh_a, asignatura.credit_a],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 201,
                message: 'Asignatura creada exitosamente',
                data: {
                    cod_a: asignatura.cod_a
                }
            });
        }
    );
};

//Obtener todas las asignaturas
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM Asignatura';

    db.query(
        queryString, (err, result) => {
        if (err) return callback(err);

        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};

//Obtener asignaturas por id
export const getById = (id: number, callback: Function) => {
    const queryString = 'SELECT * FROM Asignatura WHERE cod_a = ?';

    db.query(
        queryString, [id], (err, result) => {
        if (err) return callback(err);

        if ((result as any[]).length === 0) {
            return callback(new Error('Asignatura no encontrada'));
        }

        callback(null, {
            statusCode: 200,
            data: (result as any[])[0]
        });
    });
};

//Actualizar asignatura
export const update = (id: number, updatedAsignatura: Asignatura, callback: Function) => {
    const queryString = `
        UPDATE Asignatura
        SET nom_a = ?, inh_a = ?, credit_a = ?
        WHERE cod_a = ?
    `;

    db.query(
        queryString,
        [
            updatedAsignatura.nom_a,
            updatedAsignatura.inh_a,
            updatedAsignatura.credit_a,
            id
        ],
        (err, result) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 200,
                message: 'Asignatura actualizada correctamente'
            });
        }
    );
};

//Actualizar asignatura por ID
export const updateById = (cod_a: number, asignatura: Asignatura, callback: Function) => {
    const queryString = 'UPDATE Asignatura SET cod_a = ?, nom_a = ?, inh_a = ?, credit_a = ? WHERE cod_a = ?';

    db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.inh_a, asignatura.credit_a, cod_a], (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, {
            statusCode: 200,
            message: 'Asignatura actualizada exitosamente'
        });
    });
};

//Eliminar asignatura por ID
export const deleteById = (id: number, callback: Function) => {
    const queryString = 'DELETE FROM Asignatura WHERE cod_a = ?';

    db.query(queryString, [id], (err, result) => {
        if (err) {
            return callback(err);
        }

        if ((result as any).affectedRows === 0) {
            return callback(new Error('Asignatura no encontrada'));
        }

        callback(null, {
            statusCode: 200,
            message: 'Asignatura eliminada exitosamente'
        });
    });
};



