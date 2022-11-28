import { pageDashboard } from "./pages/dashboard";
import { pageAgenda } from "./pages/agenda";
import { pagePersonaFormulario } from "./pages/persona-formulario";
import { pagePersonaVer } from "./pages/persona-ver";
import { pageTurnosReservar } from "./pages/turno-reservar";
import { pageTurnosVer } from "./pages/turno-ver";

const routes = [
  {
    path: /\//,
    handler: pageDashboard,
  },
  {
    path: /\/dashboard/,
    handler: pageDashboard,
  },
  {
    path: /\/agenda/,
    handler: pageAgenda,
  },
  {
    path: /\/persona-formulario/,
    handler: pagePersonaFormulario,
  },
  {
    path: /\/persona-ver/,
    handler: pagePersonaVer,
  },
  {
    path: /\/turno-reservar/,
    handler: pageTurnosReservar,
  },
  {
    path: /\/turno-ver/,
    handler: pageTurnosVer,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.handler({ goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

//   if (location.host.includes("github.io") || location.pathname == "/") {
//     goTo("/piedra/hello");
//   } else {
//     handleRoute(location.pathname);
//   }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };

}
