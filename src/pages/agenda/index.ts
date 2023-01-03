import { state } from "../../state-manager";

export function pageAgenda(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>AGENDA PROFESIONALES</h2>

  <form class="form">

  <label for="profesional" class="label">DNI profesional:</label>
  <input
  id="profesional"
  name="profesional"
  class="input-profesional"
  type="text"
  />

  <label for="duracion" class="label">Duración del turno en minutos:</label>
  <input
  id="duracion"
  name="duracion"
  class="input-duracion"
  type="text"
  />

  <label for="valido-desde" class="label">Válido desde:</label>
  <input
  id="valido-desde"
  name="valido-desde"
  class="input-valido-desde"
  type="date"
  placeholder="Válido desde"
  />

  <label for="valido-hasta" class="label">Válido hasta:</label>
  <input
  id="valido-hasta"
  name="valido-hasta"
  class="input-valido-hasta"
  type="date"
  placeholder="Válido hasta"
  />

  <hr>

  <label class="label">Horarios de Ingreso y Egreso:</label>
  <table>
    <tr>
      <th></th>
      <th>DOMINGO</th>
      <th>LUNES</th>
      <th>MARTES</th>
      <th>MIERCOLES</th>
      <th>JUEVES</th>
      <th>VIERNES</th>
      <th>SABADO</th>
    </tr>

    <tr>
      <th>IN</th>
      <th><input name="in-dom" class="input time in-dom" type="time" /></th>
      <th><input name="in-lunes" class="input time in-lunes" type="time" /></th>
      <th><input name="in-martes" class="input time in-martes" type="time" /></th>
      <th><input name="in-mierc" class="input time in-mierc" type="time" /></th>
      <th><input name="in-juev" class="input time in-juev" type="time" /></th>
      <th><input name="in-vier" class="input time in-vier" type="time" /></th>
      <th><input name="in-sab" class="input time in-sab" type="time" /></th>
    </tr>

    <tr>
      <th>OUT</th>
      <th><input name="out-dom" class="input time out-dom" type="time" /></th>
      <th><input name="out-lunes" class="input time out-lunes" type="time" /></th>
      <th><input name="out-martes" class="input time out-martes" type="time" /></th>
      <th><input name="out-mierc" class="input time out-mierc" type="time" /></th>
      <th><input name="out-juev" class="input time out-juev" type="time" /></th>
      <th><input name="out-vier" class="input time out-vier" type="time" /></th>
      <th><input name="out-sab" class="input time out-sab" type="time" /></th>
    </tr>
  </table>
  


  <button class="button aceptar">ACEPTAR</button>
  
  </form>

  <br>
  <button class="button nueva">AGREGAR NUEVA PLANILLA</button>

  <div class="nueva-planilla">
  `;

  const form = div.querySelector(".form");

  form!.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    console.log("Desde agenda: ", value);
    state.setAgenda(value);
  });

  const nuevaPlanillaClick = div.querySelector(".nueva");
  const nuevaPlanillaDiv = div.querySelector(".nueva-planilla");

  nuevaPlanillaClick!.addEventListener("click", () => {
    nuevaPlanillaDiv!.innerHTML = `

    NUEVA PLANTILLA...

    `;
  });

  const style = document.createElement("style");
  style.textContent = `
  .time{
    border: none;
  }

  .input-profesional,
  .input-duracion, 
  .input-valido-desde, 
  .input-valido-hasta{
    width: 200px;
  }

  .nueva{
    width: 300px;
  }
  `;

  div.appendChild(style);
  return div;
}
