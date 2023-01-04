import { state } from "../../state-manager";

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
        <th>ID</th>
        <th>PROFESIONAL</th>
        <th>DIA</th>
        <th>HORA</th>
        <th>estado</th>
        <th>PACIENTE</th>
        <th>SELECC</th>
      </tr>
  </table>
  
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
      <th>x</th>
    </tr>
    </table>
  </template>
  <div>
      
 
  `;
  const form = div.querySelector(".form");
  var datos = div.querySelector(".datos");
  form!.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    state.verTurnos(value.profesional, datos);
  });
 
  const style = document.createElement("style");
  style.textContent = `
  .titulo{
    font-size: 58px;
    text-align: center;
  }
  table{
    width: 100%;
  }
`;
  div.appendChild(style);
  return div;
}
