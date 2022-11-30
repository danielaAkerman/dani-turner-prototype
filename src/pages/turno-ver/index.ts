export function pageTurnosVer(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>VER TURNOS</h2>

  <form class="form">

  <input
      id="profesional"
      name="profesional"
      class="input-profesional"
      placeholder="profesional" 
      type="text"
    />
  
  <input
      id="especialidad:"
      name="especialidad:"
      class="input-especialidad:"
      placeholder="especialidad" 
      type="text"
    />

  <input
      id="estado:"
      name="estado:"
      class="input-estado:"
      placeholder="estado" 
      type="text"
    />

  <input
      id="paciente:"
      name="paciente:"
      class="input-paciente:"
      placeholder="paciente" 
      type="text"
    />

  <button class="buscar button">BUSCAR</button>

  <form>

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
