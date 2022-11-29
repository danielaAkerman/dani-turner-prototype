export function pageTurnosVer(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>VER TURNOS</h2>

  <div class="filtro">
    <label for="profesional" class="label">Profesional:</label>
    <input
      id="profesional"
      name="profesional"
      class="input-profesional"
      type="text"
    />
  </div>
  
  <div class="filtro">
    <label for="especialidad:" class="label">Especialidad:</label>
    <input
      id="especialidad:"
      name="especialidad:"
      class="input-especialidad:"
      type="text"
    />
  </div>

  <div class="filtro">
    <label for="estado:" class="label">Estado:</label>
    <input
      id="estado:"
      name="estado:"
      class="input-estado:"
      type="text"
    />
  </div>

  <div class="filtro">
    <label for="paciente:" class="label">DNI Paciente:</label>
    <input
      id="paciente:"
      name="paciente:"
      class="input-paciente:"
      type="text"
    />
  </div>

  <button class="buscar">BUSCAR</button>

  <table class="table">
      <tr>
        <th>CENTRO</th>
        <th>ESPECIALIDAD</th>
        <th>PROFESIONAL</th>
        <th>PACIENTE</th>
        <th>DIA</th>
        <th>HORA</th>
        <th>SELECC</th>
      </tr>
  

    </table>
  
 
  `;

 
  const style = document.createElement("style");
  style.textContent = `
  .titulo{
    font-size: 58px;
    text-align: center;
  }
`;
  div.appendChild(style);
  return div;
}
