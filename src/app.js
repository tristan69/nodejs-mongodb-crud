import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import indexRoutes from "./routes/tasks.routes";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(indexRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
