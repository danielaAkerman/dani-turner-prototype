export function pageAgenda(container) {
  console.log("hola soy la agenda");
  
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>AGENDA PROFESIONALES</h2>

  <form class="form">


    <input
      id="profesional"
      name="profesional"
      class="input-profesional"
      type="text"
      placeholder="Apellido profesional"
    />

  <button class="button buscar">BUSCAR</button>
  </form>

  <br>


  <form class="agenda-form">
  
  <input
  id="duracion"
  name="duracion"
  class="input-duracion"
  type="text"
  placeholder="Duración del turno en minutos"
  />

  <br>
  <br>

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
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th>X</th>
    </tr>

    <tr>
      <th>OUT</th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th><input class="input" type="time" /></th>
      <th>X</th>
    </tr>
  </table>
  
  <br>

  <button class="button aceptar">ACEPTAR</button>

  </form>

  `;

  // const input = div.querySelector(".input");
  // const button = div.querySelector("button-comp");

  // button.addEventListener("click", (e) => {
  //   // const userName =
  //   // container.goTo("/instructions");
  // });

  const style = document.createElement("style");
  style.textContent = ``;

  div.appendChild(style);
  return div;
}
