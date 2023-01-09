import { state } from "../../state-manager";

export function pagePrestadorVer(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>VER PRESTADORES</h2>

  <form class="form">

  <input id="dni" name="dni" placeholder="dni" class="input-dni" type="text" />
  
  <button class="button">BUSCAR</button>

  </form>
  <br >


  
    <div class="datos"><div>
 
  `;

  const form = div.querySelector(".form");
  var datos = div.querySelector(".datos");
  form!.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentState = state.getState();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());
    const dni = value.dni;
    state.verPrestador(dni, datos);


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
