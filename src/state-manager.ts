// import { db } from "./db";
// import map from "lodash/map"; // Para mapear un objeto de objetos
import { v4 as uuidv4 } from "uuid";
import { turnosFraccionamiento } from "./turnos-fraccionamiento";
import { horarioAMinutos } from "./horario-a-minutos";
import { fechas } from "./fechas";

// const url = "http://localhost:3000";
// const url = "https://dani-turner.onrender.com";
const url = process.env.url;

const state = {
  data: {
    nombre: "",
    password: "",
    email: "",
    userId: "",
    prestadorApellido: "",
    prestadorNombre: "",
    prestadorFechaNac: "",
    prestadorTelefono: "",
    prestadorDni: "",

    arrayDeTurnos: [],
  },

  listeners: [],

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    // for (const cb of this.listeners) {
    //   cb();
    // }
    console.log("state: ", this.data);
  },

  iniciarSesion(usuario, root) {
    const currentState = this.getState();
    currentState.username = usuario.username;
    currentState.password = usuario.password;
    fetch(url + "/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: usuario.username }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          console.error("no existe el user");
        } else {
          if (usuario.password == data.password) {
            currentState.userId = data.userId;
            root.goTo("/dashboard");
          } else {
            console.error("password incorrecta");
          }
        }
      });
    this.setState(currentState);
  },

  nuevoPrestador(persona, root) {
    (persona.shortId = uuidv4().slice(0, 7).toUpperCase()),
      fetch(url + "/nuevoprestador", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(persona),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Se registro el nuevo prestador. ", data);
          // NO DEVUELVE EL ID, NO SÉ POR QUE
          root.goTo("/dashboard");
        });
  },

  nuevoCliente(persona, root) {
    (persona.shortId = uuidv4().slice(0, 7).toUpperCase()),
      fetch(url + "/nuevocliente", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(persona),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Se registro el nuevo cliente. ", data);
          // NO DEVUELVE EL ID, NO SÉ POR QUE
          root.goTo("/dashboard");
        });
  },

  verPrestador(dni, datos) {
    const currentState = this.getState();
    fetch(url + "/prestador/" + dni)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("La data es: ", data);
        // currentState.prestadorNombre = data.nombre;
        // currentState.prestadorApellido = data.apellido;
        // currentState.prestadorFechaNac = data["fecha-nac"];
        // currentState.prestadorTelefono = data.telefono;
        // currentState.prestadorDni = data.dni;
        datos!.innerHTML = `
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
  
      <tr>
        <th>${data.shortId}</th>
        <th>${data.dni}</th>
        <th>${data.apellido}</th>
        <th>${data.nombre}</th>
        <th>${data["fecha-nac"]}</th>
        <th>${data.telefono}</th>
        <th>X</th>
      </tr>
    </table>
      `;
      });
    this.setState(currentState);
  },

  verCliente(dni, datos) {
    const currentState = this.getState();
    fetch(url + "/cliente/" + dni)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("La data es: ", data);
        // currentState.prestadorNombre = data.nombre;
        // currentState.prestadorApellido = data.apellido;
        // currentState.prestadorFechaNac = data["fecha-nac"];
        // currentState.prestadorTelefono = data.telefono;
        // currentState.prestadorDni = data.dni;
        datos!.innerHTML = `
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
  
      <tr>
        <th>${data.shortId}</th>
        <th>${data.dni}</th>
        <th>${data.apellido}</th>
        <th>${data.nombre}</th>
        <th>${data["fecha-nac"]}</th>
        <th>${data.telefono}</th>
        <th>X</th>
      </tr>
    </table>
      `;
      });
    this.setState(currentState);
  },

  setAgenda(agenda) {
    const profDni = agenda.prestador;
    // const fechaIn = agenda["valido-desde"]
    // const fechaOut = agenda["valido-hasta"]

    fetch(url + "/agenda/" + profDni, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(agenda),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Se creó el nuevo registro. ", data);
      });
    this.generarTurnos(agenda);
  },

  generarTurnos(agenda) {
    const duracionTurno = parseInt(agenda.duracion);

    const diasIn = [
      "in-dom",
      "in-lunes",
      "in-martes",
      "in-mierc",
      "in-juev",
      "in-vier",
      "in-sab",
    ];

    const diasOut = [
      "out-dom",
      "out-lunes",
      "out-martes",
      "out-mierc",
      "out-juev",
      "out-vier",
      "out-sab",
    ];

    var i = 0;
    while (i < 7) {
      if (agenda[diasIn[i]]) {
        const horariosTurnosDia = turnosFraccionamiento(
          duracionTurno,
          horarioAMinutos(agenda[diasIn[i]]),
          horarioAMinutos(agenda[diasOut[i]])
        );
        const fechasDias_i = fechas(
          agenda["valido-desde"],
          agenda["valido-hasta"],
          i
        );
        const turnosCompletos: Object[] = [];
        for (const f of fechasDias_i) {
          for (const h of horariosTurnosDia!) {
            const id = uuidv4().toUpperCase();
            const datosTurno = {
              longId: id,
              shortId: id.slice(0, 7),
              profDni: agenda.prestador,
              fecha: f,
              fechaHora:
                f.toString() +
                h.toString().slice(0, 2) +
                h.toString().slice(3, 5),
              fechaFormato:
                f.toString().slice(6, 8) +
                " " +
                f.toString().slice(4, 6) +
                " " +
                f.toString().slice(0, 4),
              horario: h,
              estado: "Disponible",
              paciente: "",
            };
            turnosCompletos.push(datosTurno);
          }
        }
        console.log("LOS TURNOS SON:", turnosCompletos);

        this.pushTurnos(turnosCompletos);
      }

      i++;
    }
  },

  pushTurnos(turnosCompletos) {
    for (const t of turnosCompletos) {
      fetch(url + "/turnos-detalle", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(t),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Se creó el registro ", data);
        });
    }
  },

  verTurnos(profDni, datos) {
    const currentState = this.getState();
    fetch(url + "/turnos/" + profDni)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("La data es: ", data);
        this.mostrarResultadosVer(data, datos);
      });
  },

  mostrarResultadosVer(data, datos) {
    const currentState = this.getState();

    const contenedor = datos.querySelector("#results");
    const template = datos.querySelector("#template");

    contenedor.replaceChildren();
    for (const d of data) {
      const id = template.content.querySelector(".id");
      id.textContent = d.shortId;

      const dniprof = template.content.querySelector(".dniprof");
      dniprof.textContent = d.profDni;

      const fecha = template.content.querySelector(".fecha");
      fecha.textContent = d.fechaFormato;

      const horario = template.content.querySelector(".horario");
      horario.textContent = d.horario;

      const estado = template.content.querySelector(".estado");
      estado.textContent = d.estado;

      const paciente = template.content.querySelector(".paciente");
      paciente.textContent = d.paciente;

      // // var redirect = d.longId + "?paciente=" + currentState.paciente;
      // const accion = template.content.querySelector(".accion");
      // accion.innerHTML = `
      // <a href="/turno-ok/${redirect}">
      //   <button class="button">VER</button>
      // </a>
      // `;

      const clone = document.importNode(template.content, true);

      contenedor.appendChild(clone);
    }
  },

  mostrarResultadosTurnoOk(data, datos) {
    const currentState = this.getState();

    const contenedor = datos.querySelector("#results");
    const template = datos.querySelector("#template");

    contenedor.replaceChildren();
    for (const d of data) {
      const id = template.content.querySelector(".id");
      id.textContent = d.shortId;

      const dniprof = template.content.querySelector(".dniprof");
      dniprof.textContent = d.profDni;

      const fecha = template.content.querySelector(".fecha");
      fecha.textContent = d.fechaFormato;

      const horario = template.content.querySelector(".horario");
      horario.textContent = d.horario;

      const estado = template.content.querySelector(".estado");
      estado.textContent = d.estado;

      const paciente = template.content.querySelector(".paciente");
      paciente.textContent = d.paciente;

      var redirect = d.longId + "?paciente=" + currentState.paciente;
      const accion = template.content.querySelector(".accion");
      accion.innerHTML = `
      <a href="/turno-ok/${redirect}">
        <button class="button">VER</button>
      </a>
      `;

      const clone = document.importNode(template.content, true);

      contenedor.appendChild(clone);
    }
  },

  buscarTurnosDisponibles(values, datos) {
    const paciente = values.paciente;
    const prestador = values.prestador;
    const desde = values["fecha-desde"];
    const hasta = values["fecha-hasta"];

    fetch(
      url +
        "/turnos-disponibles/" +
        prestador +
        "?desde=" +
        desde +
        "&hasta=" +
        hasta
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("LOS TURNOS DISPONIBLES SON:", data);
        this.mostrarResultadosTurnoOk(data, datos);
      });
  },

  obtenerInfoTurno(turnoId, paciente, datos) {
    fetch(url + "/turnos-datos/" + turnoId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        datos!.innerHTML = `
        <h2>LOS DATOS DEL TURNO SELECCIONADO SON:</h2>
        <br>
        <p>ID: ${data.shortId}</p>
        <p>FECHA: ${data.fechaFormato}</p>
        <p>HORA: ${data.horario}</p>
        <p>ESTADO: ${data.estado}</p>
        <br>
        <p>PARA EL PACIENTE: ${paciente}</p>
        <br>
        <br>

        <button class="button reservar">RESERVAR</button>
        `;
        const buttonReservar = datos.querySelector(".reservar");

        buttonReservar.addEventListener("click", () => {
          this.reservarTurno(turnoId, paciente);
        });
      });
  },

  reservarTurno(turnoId, paciente) {
    console.log("reservooo", turnoId, paciente);
    fetch(url + "/reserva-turno-ok", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ turnoId, paciente }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  },
};

export { state };
