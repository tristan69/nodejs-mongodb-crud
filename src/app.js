import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import indexRoutes from "./routes/tasks.routes";

// Create a new instance of the Express application
const app = express();

// Set the port on which the application should listen
app.set("port", process.env.PORT || 3000);

// Set the folder containing views (template files)
app.set("views", path.join(__dirname, "views"));

// Configure and register the Handlebars rendering engine
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);

// Set the view engine to use Handlebars
app.set("view engine", ".hbs");

// Use bodyParser middleware to parse incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the routes defined in the tasks.routes.js file
app.use(indexRoutes);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Handle 404 errors by displaying the 404 page
app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;