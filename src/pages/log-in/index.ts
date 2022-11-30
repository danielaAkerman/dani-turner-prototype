export function pageLogin(container) {
  
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>LOG IN</h2>

  <br>

  <form class="form">

    <input
      id="usuario"
      name="usuario"
      class="input-usuario"
      type="text"
      placeholder="Usuario"
    />

    <input
      id="password"
      name="password"
      class="input-password"
      type="text"
      placeholder="Contraseña"
    />

  <button class="button buscar">INGRESAR</button>
  </form>


  `;

  const form = div.querySelector(".form");

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    console.log("Profesional: ", value);
    container.goTo("/dashboard");
  });

  const style = document.createElement("style");
  style.textContent = ``;

  div.appendChild(style);
  return div;
}
