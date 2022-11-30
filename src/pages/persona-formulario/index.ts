export function pagePersonaFormulario(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>NUEVA PERSONA</h2>
  <form class="form">

  <div class="dni">
    <label for="dni" class="label">DNI:</label>
    <input id="dni" name="dni" class="input-dni" type="text" />
  </div>

  <div class="apellido">
    <label for="apellido" class="label">Aellido:</label>
    <input id="apellido" name="apellido" class="input-apellido" type="text" />
  </div>

  <div class="nombre">
    <label for="nombre" class="label">Nombre:</label>
    <input id="nombre" name="nombre" class="input-nombre" type="text" />
  </div>

  <div class="fecha-nac">
    <label for="fecha-nac" class="label">Fecha de nacimiento:</label>
    <input
      id="fecha-nac"
      name="fecha-nac"
      class="input-fecha-nac"
      type="date"
    />
  </div>

  <div class="telefono">
    <label for="telefono" class="label">Telefono:</label>
    <input
      id="telefono"
      name="telefono"
      class="input-telefono"
      type="date"
    />
  </div>

  <div class="tipo">
    <label for="tipo" class="label">Tipo:</label>
    <select id="tipo" name="tipo" class="input-tipo" type="text">
      <option value="profesional">Profesional</option>
      <option value="paciente">Paciente</option>
    </select>
  </div>

  <button class="button">ACEPTAR</button>
  </form>
 
  `;

  const form = div.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());
    const nombre = value.nombre;

    console.log(value);
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
