import { pageLogin } from "./pages/log-in";
import { pageDashboard } from "./pages/dashboard";
import { pageAgenda } from "./pages/agenda";
import { pagePrestadorFormulario } from "./pages/prestador-formulario";
import { pagePrestadorVer } from "./pages/prestador-ver";
import { pageClienteFormulario } from "./pages/cliente-formulario";
import { pageClienteVer } from "./pages/cliente-ver";
import { pageTurnosReservar } from "./pages/turno-reservar";
import { pageTurnosVer } from "./pages/turno-ver";

const routes = [
  {
    path: /\//,
    handler: pageLogin,
  },
  {
    path: /\/login/,
    handler: pageLogin,
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
    path: /\/prestador-formulario/,
    handler: pagePrestadorFormulario,
  },
  {
    path: /\/prestador-ver/,
    handler: pagePrestadorVer,
  },
  {
    path: /\/cliente-formulario/,
    handler: pageClienteFormulario,
  },
  {
    path: /\/cliente-ver/,
    handler: pageClienteVer,
  },
  {
    path: /\/turno-reservar/,
    handler: pageTurnosReservar,
  },
  {
    path: /\/turno-ver/,
    handler: pageTurnosVer,
  },
  // {
  //   path: /\/redirect/,
  //   handler: pageDashboard,
  // },
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

  if (location.host.includes("github.io") || location.pathname == "/") {
    goTo("/login");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };

}
