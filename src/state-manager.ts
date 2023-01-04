import { db } from "./db";
import map from "lodash/map"; // Para mapear un objeto de objetos
import { turnosFraccionamiento } from "./turnos-fraccionamiento";
import { horarioAMinutos } from "./horario-a-minutos";
import { fechas } from "./fechas";

const url = "http://localhost:3000";
// const url = "https://dani-turner.onrender.com";

const state = {
  data: {
    nombre: "",
    password: "",
    email: "",
    userId: "",
    personaApellido: "",
    personaNombre: "",
    personaFechaNac: "",
    personaTelefono: "",
    personaDni: "",
    personaTipo: "",
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

  nuevaPersona(persona, root) {
    fetch(url + "/newperson", {
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
        console.log("Se creó el nuevo registro. ", data);
        // NO DEVUELVE EL ID, NO SÉ POR QUE
        root.goTo("/dashboard");
      });
  },

  verPersona(dni, datos) {
    const currentState = this.getState();
    fetch(url + "/persons/" + dni)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("La data es: ", data);
        currentState.personaNombre = data.nombre;
        currentState.personaApellido = data.apellido;
        currentState.personaFechaNac = data["fecha-nac"];
        currentState.personaTelefono = data.telefono;
        currentState.personaDni = data.dni;
        currentState.personaTipo = data.tipo;
        datos!.innerHTML = `
      <table>
      <tr>
        <th>ID</th>
        <th>DNI</th>
        <th>APELLIDO</th>
        <th>NOMBRE</th>
        <th>FECHA NAC</th>
        <th>TELEFONO</th>
        <th>TIPO</th>
        <th>ACCIÓN</th>
      </tr>
  
      <tr>
        <th>44</th>
        <th>${state.data.personaDni}</th>
        <th>${state.data.personaApellido}</th>
        <th>${state.data.personaNombre}</th>
        <th>${state.data.personaFechaNac}</th>
        <th>${state.data.personaTelefono}</th>
        <th>${state.data.personaTipo}</th>
        <th>X</th>
      </tr>
    </table>
      `;
      });
    this.setState(currentState);
  },

  setAgenda(agenda) {
    const profDni = agenda.profesional;
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
            const datosTurno = {
              profDni: agenda.profesional,
              fecha: f,
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
        mostrarResultados(data);

       
      });

    function mostrarResultados(data) {
      const contenedor = datos.querySelector("#results");
      const template = datos.querySelector("#template");

      contenedor.replaceChildren();
      for (const d of data) {
        const id = template.content.querySelector(".id");
        id.textContent = 55;

        const dniprof = template.content.querySelector(".dniprof");
        dniprof.textContent = d.profDni;

        const fecha = template.content.querySelector(".fecha");
        fecha.textContent = d.fecha;

        const horario = template.content.querySelector(".horario");
        horario.textContent = d.horario;

        const estado = template.content.querySelector(".estado");
        estado.textContent = d.estado;

        const paciente = template.content.querySelector(".paciente");
        paciente.textContent = d.paciente;

        const clone = document.importNode(template.content, true);

        contenedor.appendChild(clone);

        // `  <tr>
        //   <th>44</th>
        //   <th>${d.profDni}</th>
        //   <th>${d.fecha}</th>
        //   <th>${d.horario}</th>
        //   <th>${d.estado}</th>
        //   <th>${d.paciente}</th>
        //   <th>X</th>
        // </tr>`
      }
    }
  },
};

export { state };
