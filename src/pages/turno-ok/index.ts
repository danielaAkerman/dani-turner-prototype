import { state } from "../../state-manager";

export function pageTurnosOK(container) {
  const currentState = state.getState();
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>TURNOS OKKK</h2>

  <button class="buscar button">BUSCAR</button>
  

  

      
  `;

  
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
