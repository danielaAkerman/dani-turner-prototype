import { state } from "../../state-manager";

export function pageLogin(container) {
  
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>LOG IN</h2>

  <br>

  <form class="form">

    <input
      id="username"
      name="username"
      class="input-username"
      type="text"
      placeholder="username"
    />

    <input
      id="password"
      name="password"
      class="input-password"
      type="password"
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

    state.iniciarSesion(value, container)
    // container.goTo("/dashboard");
  });

  const style = document.createElement("style");
  style.textContent = ``;

  div.appendChild(style);
  return div;
}
