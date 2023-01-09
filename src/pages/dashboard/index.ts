export function pageDashboard(container) {
  const div = document.createElement("div");
  div.innerHTML = `

  <h2>DASHBOARD</h2>

  <div class="buttons">
  <button class="button agenda">AGENDA PRESTADORES</button>
  <button class="button nuevapersona">NUEV0 PRESTADOR</button>
  <button class="button verpersona">VER PRESTADOR</button>
  <button class="button nuevoturno">ASIGNAR NUEVO TURNO</button>
  <button class="button verturno">VER TURNO</button>
  </div>
  `;

  const agenda = div.querySelector(".agenda");
  agenda!.addEventListener("click", () => {
    container.goTo("/agenda");
  });

  const nuevapersona = div.querySelector(".nuevapersona");
  nuevapersona!.addEventListener("click", () => {
    container.goTo("/persona-formulario");
  });

  const verpersona = div.querySelector(".verpersona");
  verpersona!.addEventListener("click", () => {
    container.goTo("/persona-ver");
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
