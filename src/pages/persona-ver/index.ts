export function pagePersonaVer(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>VER PERSONAS</h2>
  <div class="dni">
      <label for="dni" class="label">DNI:</label>
      <input id="dni" name="dni" class="input-dni" type="text" />
    </div>
  
    <div class="apellido">
      <label for="apellido" class="label">Apellido:</label>
      <input id="apellido" name="apellido" class="input-apellido" type="text" />
    </div>
  <button class="button">BUSCAR</button>
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
