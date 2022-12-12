import { db } from "./db";
import map from "lodash/map"; // Para mapear un objeto de objetos
import { turnosFraccionamiento } from "./turnos";

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
    const profDni = agenda.profesional;
    turnosFraccionamiento(
      agenda.duracion,
      agenda["in-lunes"],
      agenda["out-lunes"]
    );
  },
};
export { state };
