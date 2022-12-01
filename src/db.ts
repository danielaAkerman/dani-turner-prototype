import * as admin from "firebase-admin";
import * as serviceAccount from "../key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

const db = admin.firestore();

export { db };

// db.doc("usuarios/Juan")
//   .set({
//     nombre: "Juan",
//     password: "Casale$1",
//   })
//   .then((res) => console.log(res));

// const usuariosColleccion = db.collection("usuarios");
// const personasColleccion = db.collection("personas");

// usuariosColleccion.get().then((snap) => {
//   let docs = snap.docs;
//   for (let d of docs) {
//     console.log(d.data());
//   }
// });

// const daniDoc = usuariosColleccion.doc("Daniela");
// daniDoc.get().then((snap) => {
//   console.log(snap.exists, snap.data());
// });

// daniDoc.update({
//   ultimavez: Date()
// })

// function nuevaPersona(objeto: object) {
//   const nuevapersona = personasColleccion.doc();
//   nuevapersona.create(objeto).then((res) => console.log(nuevapersona.id));
// }

// nuevaPersona({ nombre: "Dada" });


