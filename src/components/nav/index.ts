customElements.define(
    "nav-comp",
    class extends HTMLElement {
      shadow = this.attachShadow({ mode: "open" });
      constructor() {
        super();
      }
      
      render() {
        this.shadowRoot.replaceChildren();
        const div = document.createElement("div");
        div.innerHTML = `
        <h2 class="counter">HOLA</h2>`;
  
        div.classList.add("root");
        const style = document.createElement("style");
        style.textContent = `
          .root{
            display: flex;
            align-items: center;
            justify-content: center;
          }

          *::selection{
            background-color: #f4a261;
          }
          `;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
      }
    }
  );