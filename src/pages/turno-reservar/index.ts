export function pageTurnosReservar(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>RESERVA DE TURNOS</h2>

  <form class="form">

  <input id="paciente" name="paciente" placeholder="paciente" class="input-paciente" type="text" />

  <input id="centro" name="centro" placeholder="centro" class="input-centro" type="text" />

  <input
      id="especialidad"
      name="especialidad" placeholder="especialidad"
      class="input-especialidad"
      type="text"
    />

  <input
      id="profesional"
      name="profesional" placeholder="profesional"
      class="input-profesional"
      type="text"
    />

  <input id="fecha" name="fecha" placeholder="fecha" class="input-fecha" type="date" />

  <input id="hora" name="hora" placeholder="hora" class="input-hora" type="time" />

  <button class="confirmar button">CONFIRMAR</button>
  
  </form>
 
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
