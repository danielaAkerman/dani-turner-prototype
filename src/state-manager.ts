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
            currentState.userId= data.userId
            root.goTo("/dashboard");
          } else {
            console.error("password incorrecta");
          }
        }
      });
      this.setState(currentState);
  },

  setState(newState) {
    this.data = newState;
    // for (const cb of this.listeners) {
    //   cb();
    // }
    // console.log(this.data);
  },
};
export { state };
