import { state } from "../../state-manager";

export function pageAgenda(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>AGENDA PROFESIONALES</h2>

  <form class="form">

      <input
      id="profesional"
      name="profesional"
      class="input-profesional"
      type="text"
      placeholder="DNI profesional"
    />


  <input
  id="duracion"
  name="duracion"
  class="input-duracion"
  type="text"
  placeholder="Duración del turno en minutos"
  />

  <table>
    <tr>
      <th></th>
      <th>LUNES</th>
      <th>MARTES</th>
      <th>MIERCOLES</th>
      <th>JUEVES</th>
      <th>VIERNES</th>
      <th>SABADO</th>
      <th>DOMINGO</th>
      <th>ACCIÓN</th>
    </tr>

    <tr>
      <th>IN</th>
      <th><input name="in-lunes" class="input in-lunes" type="time" /></th>
      <th><input name="in-martes" class="input in-martes" type="time" /></th>
      <th><input name="in-mierc" class="input in-mierc" type="time" /></th>
      <th><input name="in-juev" class="input in-juev" type="time" /></th>
      <th><input name="in-vier" class="input in-vier" type="time" /></th>
      <th><input name="in-sab" class="input in-sab" type="time" /></th>
      <th><input name="in-dom" class="input in-dom" type="time" /></th>
      <th>X</th>
    </tr>

    <tr>
      <th>OUT</th>
      <th><input name="out-lunes" class="input out-lunes" type="time" /></th>
      <th><input name="out-martes" class="input out-martes" type="time" /></th>
      <th><input name="out-mierc" class="input out-mierc" type="time" /></th>
      <th><input name="out-juev" class="input out-juev" type="time" /></th>
      <th><input name="out-vier" class="input out-vier" type="time" /></th>
      <th><input name="out-sab" class="input out-sab" type="time" /></th>
      <th><input name="out-dom" class="input out-dom" type="time" /></th>
      <th>X</th>
    </tr>
  </table>
  


  <button class="button aceptar">ACEPTAR</button>

  </form>

  `;

  const form = div.querySelector(".form");

  form!.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    console.log("Desde agenda: ", value);
    state.agregarTurnos(value);

  });

  const style = document.createElement("style");
  style.textContent = `
  .input-duracion{
    width: 200px;
  }
  `;

  div.appendChild(style);
  return div;
}
