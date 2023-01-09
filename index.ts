import * as express from "express";
import { db } from "./src/db";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";
import { json } from "body-parser";

// const dev = process.env.NODE_ENV == "development";
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(json());

const usersCollection = db.collection("users");
const prestadoresCollection = db.collection("prestadores");
const clientesCollection = db.collection("clientes");
const turnosCollection = db.collection("turnos");
const agendaCollection = db.collection("agenda");

// app.get("/env", (req, res) => {
//   res.json({
//     environment: process.env.NODE_ENV,
//   });
// });

// app.get("/lugar", (req, res) => {
//   res.json({
//     lugar: process.env.LUGAR,
//   });
// });

// CREA UN REGISTRO NUEVO EN LA BASE DE DATOS
// LO QUE OBTENGA POR REQ.BODY
// DEVUELVE EL NUEVO ID
app.post("/users", function (req, res) {
  const nuevoUsuario = usersCollection.doc();
  nuevoUsuario.create(req.body).then((resp) => console.log(nuevoUsuario.id));
  res.json({ id: nuevoUsuario.id });
});

// PARA OBTENER TODOS LOS DATOS DE UN USUARIO
// LE PASAMOS SU ID, DEVUELVE TODO EL OBJETO
app.get("/users/:id", function (req, res) {
  const userId = req.params.id;
  const userDoc = usersCollection.doc(userId);
  userDoc.get().then((snap) => {
    const snapData = snap.data();
    res.json(snapData); // Si pongo .nombre me devuelve ese datito pelado
  });
});

// PARA VER PERSONA
app.get("/prestador/:dni", function (req, res) {
  const { dni } = req.params;
  prestadoresCollection
    .where("dni", "==", dni)
    .get()
    .then((snap) => {
      const snapData = snap.docs[0].data();
      res.json(snapData);
    });
});

// PARA VER PERSONA
app.get("/cliente/:dni", function (req, res) {
  const { dni } = req.params;
  clientesCollection
    .where("dni", "==", dni)
    .get()
    .then((snap) => {
      const snapData = snap.docs[0].data();
      res.json(snapData);
    });
});

// PARA VER TURNOS
app.get("/turnos/:profDni", function (req, res) {
  const { profDni } = req.params;
  turnosCollection
    .where("profDni", "==", profDni)
    .get()
    .then((snap) => {
      const datas = [];
      const snapDocs = snap.docs;
      for (const d of snapDocs) {
        datas.push(d.data());
      }
      res.json(datas);
    });
});

// ACTUALIZA/AGREGA SOLO LOS CAMPOS QUE LE PASO EN BODY
// LE AGREGUÉ TMB UN LAST ACCESS
// app.patch("/users/:id", function (req, res) {
//   const userId = req.params.id;
//   const body = req.body;
//   body.lastAccess = new Date();
//   const userDoc = usersCollection.doc(userId);
//   userDoc.update(body).then((result) => {
//     res.json({ message: "ok" });
//   });
// });

// PARA AGREGAR AGENDA
// MODIFICA TODOS LOS CAMPOS
app.post("/agenda/:dni", function (req, res) {
  const dniProfesional = req.params.dni;
  const newAgendaDoc = agendaCollection.doc(dniProfesional);

  newAgendaDoc.set(req.body).then(() => console.log(newAgendaDoc.id));
  res.json({ message: "ok" });
});

// CREA UN DOCUMENTO DE DETALLES DE TURNO
// LO QUE OBTENGA POR REQ.BODY
// DEVUELVE EL NUEVO ID
app.post("/turnos-detalle", function (req, res) {
  const nuevoTurno = turnosCollection.doc();
  nuevoTurno.create(req.body).then((resp) => console.log(nuevoTurno.id));
  res.json({ id: nuevoTurno.id });
});

// FUNCIONA PERFECTO:
app.post("/login", function (req, res) {
  const { username } = req.body;
  // const { password } = req.body;
  usersCollection
    .where("username", "==", username)
    .get()
    .then((resp) => {
      if (resp.empty) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.json({
          id: resp.docs[0].id,
          password: resp.docs[0].data().password,
        });
      }
    });
});

// app.post("/signin", function (req, res) {
//   const { password } = req.body;
//   const { nombre } = req.body;
//   usersCollection
//     .where("nombre", "==", nombre)
//     .get()
//     .then((resp) => {
//       if (resp.empty) {
//         res.status(400).json(req.body);
//       } else {
//         res.json(resp);
//       }
//     });
// });

// CREA UN REGISTRO NUEVO EN LA BASE DE DATOS
// LO QUE OBTENGA POR REQ.BODY
// DEVUELVE EL NUEVO ID
app.post("/nuevoprestador", function (req, res) {
  const nuevoPrestador = prestadoresCollection.doc();
  nuevoPrestador.create(req.body).then(() => console.log(nuevoPrestador.id));
  res.json({ id: nuevoPrestador.id }); // Lo está devolviendo bien?
});

app.post("/nuevocliente", function (req, res) {
  const nuevoCliente = clientesCollection.doc();
  nuevoCliente.create(req.body).then(() => console.log(nuevoCliente.id));
  res.json({ id: nuevoCliente.id }); // Lo está devolviendo bien?
});


// app.post("/rooms", (req, res) => {
//   const { userId } = req.body;
//   usersCollection
//     .doc(userId.toString())
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         const roomLongId = uuidv4();
//         const roomRef = rtdb.ref("rooms/" + roomLongId);
//         roomRef
//           .set({
//             messages: [],
//             owner: userId,
//           })
//           .then((rtdbRes) => {
//             const roomId = 1000 + Math.trunc(Math.random() * 999);
//             roomsCollection
//               .doc(roomId.toString())
//               .set({
//                 rtdbRoomId: roomLongId,
//               })
//               .then(() => {
//                 res.json({
//                   id: roomId.toString(),
//                   rtdbRoomId: roomLongId,
//                 });
//               });
//           });
//       } else {
//         res.status(401).json({
//           message: "User not found",
//         });
//       }
//     });
// });

// app.get("/rooms/:roomId", (req, res) => {
//   const { userId } = req.query;
//   const { roomId } = req.params;
//   usersCollection
//     .doc(userId.toString())
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         roomsCollection
//           .doc(roomId)
//           .get()
//           .then((snap) => {
//             res.json(snap.data());
//           });
//       } else {
//         res.status(401).json({
//           message: "Room not found",
//         });
//       }
//     });
// });

// app.post("/messages", function (req, res) {
//   const { rtdbRoomId } = req.body;
//   const { from } = req.body;
//   const { message } = req.body;

//   const chatroomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/messages");
//   chatroomRef.push({ from, message }, function () {
//     res.json("ok");
//   });
// });

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en http://localhost:" + port);
});
