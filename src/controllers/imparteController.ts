import { Imparte } from '../models/imparteModel';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

// Crear una relación imparte
export const create = (imparte: Imparte, callback: Function) => {
  const query = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
  db.query(query, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
    if (err) return callback(err);

    callback(null, {
      statusCode: 201,
      message: 'Relación imparte creada exitosamente',
      data: { id_p: imparte.id_p, cod_a: imparte.cod_a }
    });
  });
};

// Obtener todas las relaciones
export const getAll = (callback: Function) => {
  const query = 'SELECT * FROM imparte';
  db.query(query, (err, result) => {
    if (err) return callback(err);

    callback(null, {
      statusCode: 200,
      data: result
    });
  });
};

// Obtener relación por ID compuesta
export const getById = (id_p: number, cod_a: number, callback: Function) => {
  const query = 'SELECT * FROM imparte WHERE id_p = ? AND cod_a = ?';
  db.query(query, [id_p, cod_a], (err, result) => {
    if (err) return callback(err);
    if ((result as any[]).length === 0) {
      return callback(new Error('Relación imparte no encontrada'));
    }

    callback(null, {
      statusCode: 200,
      data: (result as any[])[0]
    });
  });
};

// Actualizar grupo y horario
export const update = (id_p: number, cod_a: number, updated: Imparte, callback: Function) => {
  const query = 'UPDATE imparte SET grupo = ?, horario = ? WHERE id_p = ? AND cod_a = ?';
  db.query(query, [updated.grupo, updated.horario, id_p, cod_a], (err, result) => {
    if (err) return callback(err);

    callback(null, {
      statusCode: 200,
      message: 'Relación imparte actualizada correctamente'
    });
  });
};

// Eliminar relación
export const deleteById = (id_p: number, cod_a: number, callback: Function) => {
  const query = 'DELETE FROM imparte WHERE id_p = ? AND cod_a = ?';
  db.query(query, [id_p, cod_a], (err, result) => {
    if (err) return callback(err);

    if ((result as any).affectedRows === 0) {
      return callback(new Error('Relación imparte no encontrada'));
    }

    callback(null, {
      statusCode: 200,
      message: 'Relación imparte eliminada exitosamente'
    });
  });
};

//Ver asignaturas que imparte un profesor 
export const getAsignaturasPorProfesor = (id_p: number, callback: Function) => {
  const query = `
    SELECT a.cod_a, a.nom_a, i.grupo, i.horario
    FROM imparte i
    JOIN asignatura a ON i.cod_a = a.cod_a
    WHERE i.id_p = ?
  `;
  db.query(query, [id_p], (err, result) => {
    if (err) return callback(err);
    callback(null, {
      statusCode: 200,
      data: result
    });
  });
};

//Ver profesores que imparten asignatura
export const getProfesoresPorAsignatura = (cod_a: number, callback: Function) => {
  const query = `
    SELECT p.cod_p, p.nom_p, i.grupo, i.horario
    FROM imparte i
    JOIN profesor p ON i.id_p = p.cod_p
    WHERE i.cod_a = ?
  `;
  db.query(query, [cod_a], (err, result) => {
    if (err) return callback(err);
    callback(null, {
      statusCode: 200,
      data: result
    });
  });
};

