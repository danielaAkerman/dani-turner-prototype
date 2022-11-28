export function pageAgenda(container) {
  console.log("hola soy la agenda");
  
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>AGENDA PROFESIONALES</h2>
  <div class="profesional">
    <label for="profesional" class="label">Profesional:</label>
    <input
      id="profesional"
      name="profesional"
      class="input-profesional"
      type="text"
    />
  </div>

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

  <div class="duracion">
  <label for="duracion" class="label">Duracion del turno:</label>
  <input
    id="duracion"
    name="duracion"
    class="input-duracion"
    type="text"
  />
</div>

  `;

  // const input = div.querySelector(".input");
  // const button = div.querySelector("button-comp");

  // button.addEventListener("click", (e) => {
  //   // const userName =
  //   // container.goTo("/instructions");
  // });

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
