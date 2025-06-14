(function() {
  const apiUrlEstudiante = 'http://localhost:3000/estudiante';
  const form = document.getElementById('estudianteForm');
  const tabla = document.getElementById('tablaEstudiantes');

  let editando = false;
  let estudianteEditando = null;

  // Cargar estudiantes al iniciar
  window.onload = () => {
    fetchEstudiantes();
  };

  // Mostrar todos los estudiantes
  function fetchEstudiantes() {
    fetch(apiUrlEstudiante)
      .then(res => res.json())
      .then(data => {
        tabla.innerHTML = '';
        data.data.forEach(est => {
          // Validar que la fecha no sea null antes de hacer split
          let fecha = '';
          if (est.fech_nac) {
            fecha = est.fech_nac.split('T')[0];
          }
          tabla.innerHTML += `
            <tr>
              <td>${est.cod_e}</td>
              <td>${est.nom_e}</td>
              <td>${est.dir_e}</td>
              <td>${est.tel_e}</td>
              <td>${fecha}</td>
              <td>
                <button onclick='editarEstudiante(${JSON.stringify(est)})'>Editar</button>
                <button onclick='eliminarEstudiante(${est.cod_e})'>Eliminar</button>
              </td>
            </tr>`;
        });
      });
  }

  // Manejo del formulario
  form.onsubmit = e => {
    e.preventDefault();

    const estudiante = {
      cod_e: parseInt(document.getElementById('cod_e').value),
      nom_e: document.getElementById('nom_e').value,
      dir_e: document.getElementById('dir_e').value,
      tel_e: document.getElementById('tel_e').value,
      fech_nac: document.getElementById('fech_nac').value,
    };

    const method = editando ? 'PUT' : 'POST';
    const url = editando ? `${apiUrlEstudiante}/${estudiante.cod_e}` : apiUrlEstudiante;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante),
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        editando = false;
        fetchEstudiantes();
      });
  };

  window.editarEstudiante = function(est) {
    document.getElementById('cod_e').value = est.cod_e;
    document.getElementById('nom_e').value = est.nom_e;
    document.getElementById('dir_e').value = est.dir_e;
    document.getElementById('tel_e').value = est.tel_e;
    // Validar que la fecha no sea null antes de hacer split
    document.getElementById('fech_nac').value = est.fech_nac ? est.fech_nac.split('T')[0] : '';

    editando = true;
    estudianteEditando = est.cod_e;
  };

  window.eliminarEstudiante = function(id) {
    if (!confirm('¿Seguro que deseas eliminar este estudiante?')) return;

    fetch(`${apiUrlEstudiante}/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => fetchEstudiantes());
  };

})();