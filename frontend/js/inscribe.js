const apiUrl = 'http://localhost:3000/inscribe';

const form = document.getElementById('inscribeForm');
const tabla = document.getElementById('tablaInscribe');

let editando = false;
let editCodE = null;
let editCodA = null;
let editCodP = null;

window.onload = () => {
  fetchInscripciones();
};

function fetchInscripciones() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      tabla.innerHTML = '';
      data.data.forEach(i => {
        tabla.innerHTML += `
          <tr>
            <td>${i.cod_e}</td>
            <td>${i.cod_p}</td>
            <td>${i.cod_a}</td>
            <td>${i.grupo}</td>
            <td>${i.n1}</td>
            <td>${i.n2}</td>
            <td>${i.n3}</td>
            <td>
              <button onclick='editar(${JSON.stringify(i)})'>Editar</button>
            </td>
          </tr>
        `;
      });
    });
}

form.onsubmit = e => {
  e.preventDefault();

  const insc = {
    cod_e: parseInt(document.getElementById('cod_e').value),
    cod_p: parseInt(document.getElementById('cod_p').value),
    cod_a: parseInt(document.getElementById('cod_a').value),
    grupo: document.getElementById('grupo').value,
    nota1: parseFloat(document.getElementById('n1').value),
    nota2: parseFloat(document.getElementById('n2').value),
    nota3: parseFloat(document.getElementById('n3').value),
  };

  const method = editando ? 'PUT' : 'POST';
  const url = editando
    ? `${apiUrl}/${editCodE}/${editCodA}/${editCodP}`
    : apiUrl;

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(insc),
  })
    .then(res => res.json())
    .then(() => {
      form.reset();
      editando = false;
      fetchInscripciones();
    });
};

function editar(insc) {
  document.getElementById('cod_e').value = insc.cod_e;
  document.getElementById('cod_p').value = insc.cod_p;
  document.getElementById('cod_a').value = insc.cod_a;
  document.getElementById('grupo').value = insc.grupo;
  document.getElementById('n1').value = insc.n1;
  document.getElementById('n2').value = insc.n2;
  document.getElementById('n3').value = insc.n3;
  editando = true;
  editCodE = insc.cod_e;
  editCodA = insc.cod_a;
  editCodP = insc.cod_p;
}
