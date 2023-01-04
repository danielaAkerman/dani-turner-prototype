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

  <div class="datos"><div>

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
`;
  div.appendChild(style);
  return div;
}
