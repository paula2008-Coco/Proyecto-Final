import { Estudiantes } from '../models/estudianteModel';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// Crear un estudiante
export const create = (estudiante: Estudiantes, callback: Function) => {
    const queryString = 'INSERT INTO Estudiante (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
        (err) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 201,
                message: 'Estudiante creado exitosamente',
                data: {
                    cod_e: estudiante.cod_e
                }
            });
        }
    );
};

// Obtener todos los estudiantes
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM Estudiante';

    db.query(queryString, (err, result) => {
        if (err) return callback(err);

        callback(null, {
            statusCode: 200,
            data: result
        });
    });
};

// Obtener estudiante por ID
export const getById = (id: number, callback: Function) => {
    const queryString = 'SELECT * FROM Estudiante WHERE cod_e = ?';

    db.query(queryString, [id], (err, result) => {
        if (err) return callback(err);

        if ((result as any[]).length === 0) {
            return callback(new Error('Estudiante no encontrado'));
        }

        callback(null, {
            statusCode: 200,
            data: (result as any[])[0]
        });
    });
};

// Actualizar estudiante
export const update = (id: number, updatedEstudiante: Estudiantes, callback: Function) => {
    const queryString = `
        UPDATE Estudiante
        SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ?
        WHERE cod_e = ?
    `;

    db.query(
        queryString,
        [
            updatedEstudiante.nom_e,
            updatedEstudiante.dir_e,
            updatedEstudiante.tel_e,
            updatedEstudiante.fech_nac,
            id
        ],
        (err, result) => {
            if (err) return callback(err);

            callback(null, {
                statusCode: 200,
                message: 'Estudiante actualizado correctamente'
            });
        }
    );
};

// Actualizar estudiante por ID (incluyendo cod_e)
export const updateById = (cod_e: number, estudiante: Estudiantes, callback: Function) => {
    const queryString = `
        UPDATE Estudiante
        SET cod_e = ?, nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ?
        WHERE cod_e = ?
    `;

    db.query(queryString, [
        estudiante.cod_e,
        estudiante.nom_e,
        estudiante.dir_e,
        estudiante.tel_e,
        estudiante.fech_nac,
        cod_e
    ], (err, result) => {
        if (err) return callback(err);

        callback(null, {
            statusCode: 200,
            message: 'Estudiante actualizado exitosamente'
        });
    });
};

// Eliminar estudiante por ID
export const deleteById = (id: number, callback: Function) => {
    const queryString = 'DELETE FROM Estudiante WHERE cod_e = ?';

    db.query(queryString, [id], (err, result) => {
        if (err) return callback(err);

        if ((result as any).affectedRows === 0) {
            return callback(new Error('Estudiante no encontrado'));
        }

        callback(null, {
            statusCode: 200,
            message: 'Estudiante eliminado exitosamente'
        });
    });
};
