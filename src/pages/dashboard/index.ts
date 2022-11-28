export function pageDashboard(container) {
  const div = document.createElement("div");
  div.innerHTML = `

  
 
  `;

  const input = div.querySelector(".input");
  const button = div.querySelector("button-comp");

  button.addEventListener("click", (e) => {
    // const userName =
    // container.goTo("/instructions");
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
