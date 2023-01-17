import { state } from "../../state-manager";

export function pageTurnosOK(container) {
  const currentState = state.getState();

  const querys = document.URL.split("/")[4];
  const turnoId = querys.split("?")[0];
  const paciente = querys.split("=")[1];
  
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>TURNOS OKKK</h2>
  
  
  <div class="datos">Obteniendo la información del turno...<div>  
  
  
  `;
  const datos = div.querySelector(".datos");
  const infoTurno = state.obtenerInfoTurno(turnoId, datos);

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
