const apiUrl = 'http://localhost:3000/imparte';

const form = document.getElementById('imparteForm');
const tabla = document.getElementById('tablaImparte');

let editando = false;
let editIdP = null;
let editCodA = null;

window.onload = () => {
  fetchImpartes();
};

function fetchImpartes() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tabla.innerHTML = '';
      data.data.forEach(item => {
        tabla.innerHTML += `
          <tr>
            <td>${item.id_p}</td>
            <td>${item.cod_a}</td>
            <td>${item.grupo}</td>
            <td>${item.horario}</td>
            <td>
              <button onclick='editar(${JSON.stringify(item)})'>Editar</button>
              <button onclick='eliminar(${item.id_p}, ${item.cod_a})'>Eliminar</button>
            </td>
          </tr>`;
      });
    });
}

form.onsubmit = e => {
  e.preventDefault();

  const data = {
    id_p: parseInt(document.getElementById('id_p').value),
    cod_a: parseInt(document.getElementById('cod_a').value),
    grupo: document.getElementById('grupo').value,
    horario: document.getElementById('horario').value,
  };

  const method = editando ? 'PUT' : 'POST';
  const url = editando
    ? `${apiUrl}/${editIdP}/${editCodA}`
    : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      editando = false;
      fetchImpartes();
    });
};

function editar(item) {
  document.getElementById('id_p').value = item.id_p;
  document.getElementById('cod_a').value = item.cod_a;
  document.getElementById('grupo').value = item.grupo;
  document.getElementById('horario').value = item.horario;
  editando = true;
  editIdP = item.id_p;
  editCodA = item.cod_a;
}

function eliminar(id_p, cod_a) {
  if (!confirm('¿Eliminar esta relación?')) return;

  fetch(`${apiUrl}/${id_p}/${cod_a}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => fetchImpartes());
}
