import { state } from "../../state-manager";

export function pageTurnosReservar(container) {
  const currentState = state.getState();
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>RESERVA DE TURNOS</h2>

  <form class="form">

  <label for="paciente" class="label">DNI Paciente:</label>
  <input id="paciente" name="paciente" placeholder="paciente" class="input-paciente" type="text" />

  <label for="prestador" class="label">DNI Prestador:</label>
  <input
      id="prestador"
      name="prestador" placeholder="prestador"
      class="input-prestador"
      type="text"
    />

    <label for="fecha-desde" class="label">Buscar desde:</label>
    <input id="fecha-desde" name="fecha-desde" placeholder="fecha-desde" class="input-fecha-desde" type="date" />
    
    <label for="fecha-hasta" class="label">Buscar hasta:</label>
    <input id="fecha-hasta" name="fecha-hasta" placeholder="fecha-hasta" class="input-fecha-hasta" type="date" />


  <button class="buscar button">BUSCAR</button>
  
  </form>
  
  <br>
  <br>

  <table class="table titulos-tabla"></table>
  
  <div class="datos">
  <div class="results" id="results"></div>

  <template id="template">
    <table class="table">
    <tr>
      <th class="id">ID</th>
      <th class="dniprof">DNI prof</th>
      <th class="fecha">Fecha</th>
      <th class="horario">Horario</th>
      <th class="estado">Estado</th>
      <th class="paciente">Paciente</th>
      <th class="accion"></th>
    </tr>
    </table>
  </template>
  <div>
      
  `;

  const form = div.querySelector(".form");
  const titulosTabla = div.querySelector(".titulos-tabla");
  var datos = div.querySelector(".datos");

  form!.addEventListener("submit", (e) => {
    e.preventDefault();
    titulosTabla!.innerHTML = `
  <tr>
    <th>ID</th>
    <th>PRESTADOR</th>
    <th>DIA</th>
    <th>HORA</th>
    <th>estado</th>
    <th>PACIENTE</th>
    <th>SELECC</th>
  </tr>
    `;
    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    currentState.paciente = value.paciente;
    state.setState(currentState);

    value["fecha-desde"] =
      value["fecha-desde"].toString().slice(0, 4) +
      value["fecha-desde"].toString().slice(5, 7) +
      value["fecha-desde"].toString().slice(8, 10);

    value["fecha-hasta"] =
      value["fecha-hasta"].toString().slice(0, 4) +
      value["fecha-hasta"].toString().slice(5, 7) +
      value["fecha-hasta"].toString().slice(8, 10);

    state.buscarTurnosDisponibles(value, datos);
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
