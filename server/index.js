import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vars = dotenv.config({ path: ".env" });

const app = express();

console.log(__dirname);

db.authenticate()
  .then(() => console.log("DB conectada"))
  .catch((error) => console.log(error));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

app.use((req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";

  return next();
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(
    `El servidor esta escuchando en el host ${host}, en el puerto ${port}`
  );
});
