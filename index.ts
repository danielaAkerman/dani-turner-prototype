import * as express from "express";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";

const dev = process.env.NODE_ENV == "development";
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const usersCollection = db.collection("usuarios");

app.get("/env", (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
  });
});

app.get("/lugar", (req, res) => {
  res.json({
    lugar: process.env.LUGAR,
  });
});

app.get("/hola", (req, res) => {
  res.json({
    message: "hola soy el server",
  });
});

app.post("/holi", (req, res) => {
  usersCollection.get().then((resp) => {
    if (resp.empty) {
      res.status(404).json({
        message: "not found",
      });
    } else {
      res.json(
        usersCollection.add({ prueba: true }).then((resp) => {
          res.json(resp);
        })
      );
    }
  });
});

app.post("/auth", function (req, res) {
  const { email } = req.body;
  usersCollection
    .where("email", "==", email)
    .get()
    .then((resp) => {
      if (resp.empty) {
        res.status(404).json({
          message: "not found",
        });
      } else {
        res.json({
          id: resp.docs[0].id,
          nombre: resp.docs[0].data().nombre,
        });
      }
    });
});

app.post("/signin", function (req, res) {
  const { password } = req.body;
  const { nombre } = req.body;
  usersCollection
    .where("nombre", "==", nombre)
    .get()
    .then((resp) => {
      if (resp.empty) {
        res.status(400).json(req.body);
      } else {
        res.json(resp);
      }
    });
});

app.post("/signup", function (req, res) {
  const { email } = req.body;
  const { nombre } = req.body;
  usersCollection
    .where("email", "==", email)
    .get()
    .then((resp) => {
      if (resp.empty) {
        usersCollection.add(req.body).then((newUserRef) => {
          res.json({ id: newUserRef.id });
        });
      } else {
        res.status(400).json({ message: "user already exists" });
      }
    });
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
  console.log("Corriendo en puerto " + port);
});
