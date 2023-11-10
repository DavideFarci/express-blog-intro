const express = require("express");
/**
 * @param {express.Request} Req
 * @param {express.Response} Res
 */
const homeController = require("./controllers/home");
const postController = require("./controllers/post");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Configurazione file statici (immagini)
app.use(express.static("public"));

// Rotte
app.get("/", homeController.index);
app.get("/posts", postController.index);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port http://localhost:" + process.env.PORT);
});
