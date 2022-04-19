require("dotenv").config();
const express = require("express");
const app = express();
const Port = process.env.Port || 8081;
// const Port = 3000 || 8080;
const path = require("path");
const hbs = require("hbs");

// traemos la libreria de mysql para la conexion

const mysql = require("mysql2");

// creamos la configuracion de la conexion
// const conexion = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "0840leoncito",
//   database: "Proyecto_final",
// });

// // // // conectamosa la DB
// conexion.connect((error) => {
//   if (error) throw error;
//   console.log("Conexion a la DB exitosa!!!");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// configuramos el motor de plantillas

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("/", (req, res) => {
  res.render("index", { Titulo: "Node.JS y Handlebars" });
});

app.get("/contacto", (req, res) => {
  res.render("contacto", {
    Titulo: "Dejanos tu consulta y nos comunicaremos de inmediato",
  });
});

app.get("/productos", (req, res) => {
  res.render("productos", { Titulo: "Productos" });
});

// app.post("/contacto", (req, res) => {
//   const { nombre, mail, apellido, comentario } = req.body;

//   if (nombre == "" || mail == "") {
//     let validacion = "Faltan datos para completar";

//     res.render("contacto", {
//       Titulo: "Formulario para completar",
//       validacion,
//     });
//   } else {
//     console.log(nombre);
//     console.log(apellido);
//     console.log(mail);
//     console.log(comentario);

//     // insertar datos a la DB
//     let data = {
//       cliente_nombre: nombre,
//       cliente_apellido: apellido,
//       cliente_mail: mail,
//       cliente_comentario: comentario,
//     };
//     let sql = "insert into clientes set ?";
//     conexion.query(sql, data, (error, result) => {
//       if (error) throw error;
//       res.render("enviado", {
//         Titulo: "Su comentario ha sido enviado con exito!",
//         nombre,
//         mail,
//       });
//     });
//   }
// });

// conexion.end();

app.listen(Port, () => {
  console.log(`El servidor en el puerto ${Port}`);
});

app.on("error", (error) => {
  console.log(`Error en la ejecucion del servidor ${error}`);
});
