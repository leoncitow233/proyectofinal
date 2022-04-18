require("dotenv").config();
const express = require("express");
const app = express();
const Port = process.env.Port || 8081;
const path = require("path");
const hbs = require("hbs");

// traemos la libreria de mysql para la conexion

const mysql = require("mysql2");

// creamos la configuracion de la conexion
// const conexion = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "0840leoncito",
//   database: "fullstack",
// });

// // conectamosa la DB
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

app.get("/home", (req, res) => {
  res.json({ Titulo: "Para que podamos hacer el deploy" });
});

app.get("/formulario", (req, res) => {
  res.render("formulario", { Titulo: "Formulario para completar" });
});

app.post("/formulario", (req, res) => {
  const { name, precio, descripcion } = req.body;

  if (name == "" || precio == "") {
    let validacion = "Faltan datos para completar";

    res.render("formulario", {
      Titulo: "Formulario para completar",
      validacion,
    });
  } else {
    console.log(name);
    console.log(precio);
    console.log(descripcion);

    // insertar datos a la DB
    let data = {
      producto_name: name,
      producto_precio: precio,
      producto_descripcion: descripcion,
    };
    let sql = "insert into productos set ?";
    conexion.query(sql, data, (error, result) => {
      if (error) throw error;
      res.render("index", {
        Titulo: "Bienvenidos a la app",
      });
    });
  }
});

app.get("/productos", (req, res) => {
  let sql = "SELECT * FROM productos";
  conexion.query(sql, (error, results) => {
    if (error) throw error;
    res.render("productos", {
      Titulo: "Productos",
      results: results,
    });
  });
});

app.post("/update", (req, res) => {
  console.log(req.body.producto_name);
  console.log(req.body.producto_precio);
  console.log(req.body.producto_id);
  //   res.send({
  //     producto: req.body.producto_name,
  //     precio: req.body.producto_precio,
  //   });

  let sql =
    "UPDATE productos SET producto_name='" +
    req.body.producto_name +
    "', producto_precio='" +
    req.body.producto_precio +
    "'WHERE producto_id" +
    req.body.producto_id;

  conexion.query(sql, (error, results) => {
    if (error) throw error;
    res.render("index", {
      Titulo: "Bienvenidos a la app",
    });
  });
});

app.delete("/delete", (req, res) => {
  console.log(req.body.producto_id);

  //   res.send({
  //     producto: req.body.producto_id,
  //     message: "Producto borrador de la DB",
  //   });
  let sql =
    "DELETE FROM productos WHERE producto_id=" + req.body.producto_id + "";
  conexion.query(sql, (error, results) => {
    if (error) throw error;
    res.render("index", {
      Titulo: "Bienvenidos a la app",
    });
  });
});

app.get("/contacto", (req, res) => {
  res.render("contacto", { Titulo: "Escribenos" });
});

app.post("/contacto", (req, res) => {
  const { name, email } = req.body;

  if (name == "" || email == "") {
    let validacion = "Faltan tus datos";

    res.render("contacto", {
      Titulo: "Escribenos",
      validacion,
    });
  } else {
    console.log(name);
    console.log(email);
    res.render("index", {
      Titulo: "Bienvenidos a Miguel Acuña",
    });
  }
});

// conexion.end();

app.listen(Port, () => {
  console.log(`El servidor en el puerto ${Port}`);
});

app.on("error", (error) => {
  console.log(`Error en la ejecucion del servidor ${error}`);
});
