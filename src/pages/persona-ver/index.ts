import { state } from "../../state-manager";

export function pagePersonaVer(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>VER PERSONAS</h2>

  <form class="form">

  <input id="dni" name="dni" placeholder="dni" class="input-dni" type="text" />
  
  <button class="button">BUSCAR</button>

  </form>
  <br >

  <table>
      <tr>
        <th>ID</th>
        <th>DNI</th>
        <th>APELLIDO</th>
        <th>NOMBRE</th>
        <th>FECHA NAC</th>
        <th>TELEFONO</th>
        <th>ACCIÓN</th>
      </tr>
    </table>
  
 
  `;

  const form = div.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());
    const dni = value.dni;
    state.verPersona(dni, container);
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
