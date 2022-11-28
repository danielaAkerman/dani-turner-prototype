export function pageDashboard(container) {
  const div = document.createElement("div");
  div.innerHTML = `

  <h2>DASHBOARD
  </h2>
 
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
