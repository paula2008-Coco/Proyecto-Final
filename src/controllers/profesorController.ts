import { Profesores } from '../models/profesorModel';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// Crear un profesor
export const create = (profesor: Profesores, callback: Function) => {
    const queryString = 'INSERT INTO Profesor (cod_p, nom_p, profesion_p, dir_p, tel_p, fech_nac) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [profesor.cod_p, profesor.nom_p, profesor.profesion_p, profesor.dir_p, profesor.tel_p, profesor.fech_nac],
        (err) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 201,
                message: 'Profesor creado exitosamente',
                data: {
                    cod_p: profesor.cod_p
                }
            });
        }
    );
};

// Obtener todos los profesores
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM Profesor';

    db.query(queryString, (err, result) => {
        if (err) return callback(err);

        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};

// Obtener profesor por ID
export const getById = (id: number, callback: Function) => {
    const queryString = 'SELECT * FROM Profesor WHERE cod_p = ?';

    db.query(queryString, [id], (err, result) => {
        if (err) return callback(err);

        if ((result as any[]).length === 0) {
            return callback(new Error('Profesor no encontrado'));
        }

        callback(null, {
            statusCode: 200,
            data: (result as any[])[0]
        });
    });
};

// Actualizar profesor
export const update = (id: number, updatedProfesor: Profesores, callback: Function) => {
    const queryString = `
        UPDATE Profesor
        SET nom_p = ?, profesion_p = ?, dir_p = ?, tel_p = ?, fech_nac = ?
        WHERE cod_p = ?
    `;

    db.query(
        queryString,
        [
            updatedProfesor.nom_p,
            updatedProfesor.profesion_p,
            updatedProfesor.dir_p,
            updatedProfesor.tel_p,
            updatedProfesor.fech_nac,
            id
        ],
        (err, result) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 200,
                message: 'Profesor actualizado correctamente'
            });
        }
    );
};

// Actualizar profesor incluyendo cod_p (clave primaria)
export const updateById = (cod_p: number, profesor: Profesores, callback: Function) => {
    const queryString = `
        UPDATE Profesor
        SET cod_p = ?, nom_p = ?, profesion_p = ?, dir_p = ?, tel_p = ?, fech_nac = ?
        WHERE cod_p = ?
    `;

    db.query(
        queryString,
        [profesor.cod_p, profesor.nom_p, profesor.profesion_p, profesor.dir_p, profesor.tel_p, profesor.fech_nac, cod_p],
        (err, result) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 200,
                message: 'Profesor actualizado exitosamente'
            });
        }
    );
};

// Eliminar profesor por ID
export const deleteById = (id: number, callback: Function) => {
    const queryString = 'DELETE FROM Profesor WHERE cod_p = ?';

    db.query(queryString, [id], (err, result) => {
        if (err) return callback(err);

        if ((result as any).affectedRows === 0) {
            return callback(new Error('Profesor no encontrado'));
        }

        callback(null, {
            statusCode: 200,
            message: 'Profesor eliminado exitosamente'
        });
    });
};
