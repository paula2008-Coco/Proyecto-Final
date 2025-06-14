const apiUrl = 'http://localhost:3000/asignatura'; 

const form = document.getElementById('asignaturaForm');
const tabla = document.getElementById('tablaAsignaturas');

let editando = false;

window.onload = () => {
  fetchAsignaturas();
};

function fetchAsignaturas() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tabla.innerHTML = '';
      data.data.forEach(asig => {
        tabla.innerHTML += `
          <tr>
            <td>${asig.cod_a}</td>
            <td>${asig.nom_a}</td>
            <td>${asig.credit_a}</td>
            <td>${asig.inh_a}</td>
            <td>
              <button onclick='editarAsignatura(${JSON.stringify(asig)})'>Editar</button>
              <button onclick='eliminarAsignatura(${asig.cod_a})'>Eliminar</button>
            </td>
          </tr>`;
      });
    });
}

form.onsubmit = e => {
  e.preventDefault();

  const asig = {
    cod_a: parseInt(document.getElementById('cod_a').value),
    nom_a: document.getElementById('nom_a').value,
    credit_a: parseInt(document.getElementById('credit_a').value),
    inh_a: parseInt(document.getElementById('inh_a').value),
  };

  const method = editando ? 'PUT' : 'POST';
  const url = editando ? `${apiUrl}/${asig.cod_a}` : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asig),
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      editando = false;
      fetchAsignaturas();
    });
};

function editarAsignatura(asig) {
  document.getElementById('cod_a').value = asig.cod_a;
  document.getElementById('nom_a').value = asig.nom_a;
  document.getElementById('credit_a').value = asig.credit_a;
  document.getElementById('inh_a').value = asig.inh_a;
  editando = true;
}

function eliminarAsignatura(cod) {
  if (!confirm('¿Eliminar esta asignatura?')) return;

  fetch(`${apiUrl}/${cod}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => fetchAsignaturas());
}
