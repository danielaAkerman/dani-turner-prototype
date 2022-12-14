import {state} from "../../state-manager"

export function pageClienteFormulario(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>NUEVO CLIENTE</h2>
  <form class="form">

  <input id="dni" name="dni" class="input-dni" placeholder="dni" type="text" />

  <input id="apellido" name="apellido" class="input-apellido" placeholder="apellido" type="text" />

  <input id="nombre" name="nombre" class="input-nombre" placeholder="nombre" type="text" />

  <input
      id="fecha-nac"
      name="fecha-nac"
      class="input-fecha-nac"
      placeholder="fecha de nacimiento" type="date"
    />

  <input
      id="telefono"
      name="telefono"
      class="input-telefono"
      placeholder="telefono" type="text"
    />

  <button class="button">ACEPTAR</button>
  </form>
 
  `;

  const form = div.querySelector(".form");
  form!.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    console.log(value)
    state.nuevoCliente(value, container)
   
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
