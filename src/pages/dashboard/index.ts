export function pageDashboard(container) {
  const div = document.createElement("div");
  div.innerHTML = `

  <h2>DASHBOARD</h2>

  <div class="buttons">
  <button class="button agenda">AGENDA PRESTADORES</button>
  <button class="button nuevoPrestador">NUEV0 PRESTADOR</button>
  <button class="button verPrestador">VER PRESTADOR</button>
  <button class="button nuevoCliente">NUEV0 CLIENTE</button>
  <button class="button verCliente">VER CLIENTE</button>
  <button class="button nuevoturno">ASIGNAR NUEVO TURNO</button>
  <button class="button verturno">VER TURNO</button>
  </div>
  `;

  const agenda = div.querySelector(".agenda");
  agenda!.addEventListener("click", () => {
    container.goTo("/agenda");
  });

  const nuevoPrestador = div.querySelector(".nuevoPrestador");
  nuevoPrestador!.addEventListener("click", () => {
    container.goTo("/prestador-formulario");
  });

  const verPrestador = div.querySelector(".verPrestador");
  verPrestador!.addEventListener("click", () => {
    container.goTo("/prestador-ver");
  });

  const nuevoCliente = div.querySelector(".nuevoCliente");
  nuevoCliente!.addEventListener("click", () => {
    container.goTo("/cliente-formulario");
  });

  const verCliente = div.querySelector(".verCliente");
  verCliente!.addEventListener("click", () => {
    container.goTo("/cliente-ver");
  });

  const nuevoturno = div.querySelector(".nuevoturno");
  nuevoturno!.addEventListener("click", () => {
    container.goTo("/turno-reservar");
  });

  const verturno = div.querySelector(".verturno");
  verturno!.addEventListener("click", () => {
    container.goTo("/turno-ver");
  });

  const style = document.createElement("style");
  style.textContent = `
  .buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: center;
  }
  .button{
    width: 244px;
  }
  `;
  div.appendChild(style);
  return div;
}
