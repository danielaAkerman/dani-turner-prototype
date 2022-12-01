import { db } from "./db";
import map from "lodash/map"; // Para mapear un objeto de objetos

const url = "http://localhost:3000";

const state = {
  data: {
    nombre: "",
    password: "",
    email: "",
    userId: "",
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

verPersona(dni, root){
  fetch(url + "/persons/" + dni )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("La data es: ", data);
      // NO DEVUELVE EL ID, NO SÉ POR QUE
      // root.goTo("/dashboard");
    });
}


};
export { state };
