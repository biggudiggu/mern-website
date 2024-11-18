//entry point for API

import express from "express"; //express für die Erstellung des Webservers
import dotenv from "dotenv"; //um Umgebungsvariablen aus .env zu laden
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

//load Umgebungsvariablen from .env
dotenv.config();

const app = express(); //erstellt neue express Anwendung
const PORT = process.env.PORT || 5005;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//startet den Server und hört auf den PORT
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

/*connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1); // Exit with failure if DB connection fails
  });
  */
