const express = require("express");
const homeController = require("./controllers/home");

/**
 * @param {express.Request} Req
 * @param {express.Response} Res
 */
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Rotte
app.get("/", homeController.index);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port http://localhost:" + process.env.PORT);
});
