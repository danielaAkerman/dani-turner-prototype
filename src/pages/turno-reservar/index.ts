export function pageTurnosReservar(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>RESERVA DE TURNOS</h2>

  <div class="paciente">
    <label for="paciente" class="label">Paciente:</label>
    <input id="paciente" name="paciente" class="input-paciente" type="text" />
  </div>

  <div class="centro">
    <label for="centro" class="label">Centro:</label>
    <input id="centro" name="centro" class="input-centro" type="text" />
  </div>

  <div class="especialidad">
    <label for="especialidad" class="label">Especialidad:</label>
    <input
      id="especialidad"
      name="especialidad"
      class="input-especialidad"
      type="text"
    />
  </div>

  <div class="profesional">
    <label for="profesional" class="label">Profesional:</label>
    <input
      id="profesional"
      name="profesional"
      class="input-profesional"
      type="text"
    />
  </div>

  <div class="fecha">
    <label for="fecha" class="label">Fecha:</label>
    <input id="fecha" name="fecha" class="input-fecha" type="date" />
  </div>

  <div class="hora">
    <label for="hora" class="label">Hora:</label>
    <input id="hora" name="hora" class="input-hora" type="time" />
  </div>

  <button class="confirmar">CONFIRMAR</button>
  
 
  `;

  const input = div.querySelector(".input");
  const button = div.querySelector("button-comp");

  button.addEventListener("click", (e) => {
    // const userName =
    // container.goTo("/instructions");
  });

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
