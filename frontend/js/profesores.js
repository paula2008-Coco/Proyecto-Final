const apiUrl = 'http://localhost:3000/profesores'; 

const form = document.getElementById('profesorForm');
const tabla = document.getElementById('tablaProfesores');

let editando = false;

// Cargar todos los profesores al iniciar
window.onload = () => {
  fetchProfesores();
};

function fetchProfesores() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tabla.innerHTML = '';
      data.data.forEach(prof => {
        tabla.innerHTML += `
          <tr>
            <td>${prof.cod_p}</td>
            <td>${prof.nom_p}</td>
            <td>${prof.profesion_p}</td>
            <td>${prof.dir_p}</td>
            <td>${prof.tel_p}</td>
            <td>${prof.fech_nac.split('T')[0]}</td>
            <td>
              <button onclick='editarProfesor(${JSON.stringify(prof)})'>Editar</button>
              <button onclick='eliminarProfesor(${prof.cod_p})'>Eliminar</button>
            </td>
          </tr>`;
      });
    });
}

form.onsubmit = e => {
  e.preventDefault();

  const prof = {
    cod_p: parseInt(document.getElementById('cod_p').value),
    nom_p: document.getElementById('nom_p').value,
    profesion_p: document.getElementById('profesion_p').value,
    dir_p: document.getElementById('dir_p').value,
    tel_p: document.getElementById('tel_p').value,
    fech_nac: document.getElementById('fech_nac').value,
  };

  const method = editando ? 'PUT' : 'POST';
  const url = editando ? `${apiUrl}/${prof.cod_p}` : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prof),
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      editando = false;
      fetchProfesores();
    });
};

function editarProfesor(prof) {
  document.getElementById('cod_p').value = prof.cod_p;
  document.getElementById('nom_p').value = prof.nom_p;
  document.getElementById('profesion_p').value = prof.profesion_p;
  document.getElementById('dir_p').value = prof.dir_p;
  document.getElementById('tel_p').value = prof.tel_p;
  document.getElementById('fech_nac').value = prof.fech_nac.split('T')[0];

  editando = true;
}

function eliminarProfesor(id) {
  if (!confirm('¿Eliminar este profesor?')) return;

  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => fetchProfesores());
}
