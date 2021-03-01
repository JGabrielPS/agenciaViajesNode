import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

db.authenticate()
  .then(() => console.log("DB conectada"))
  .catch((error) => console.log(error));

app.set("view engine", "pug");

app.use((req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";

  return next();
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`El servidor esta escuchando en el puerto ${port}`);
});
