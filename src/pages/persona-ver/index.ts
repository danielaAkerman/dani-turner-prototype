export function pagePersonaVer(container) {
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>VER PERSONAS</h2>

  <form class="form">

  <input id="dni" name="dni" placeholder="dni" class="input-dni" type="text" />
  
  <input id="apellido" name="apellido" placeholder="apellido" class="input-apellido" type="text" />

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
