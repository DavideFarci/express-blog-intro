function index(req, res) {
  res.format({
    text: () => {
      res.type("text").send("Ciao a tutti");
    },
    html: () => {
      //   const htmlContent = fs.readFileSync(
      //     path.resolve(__dirname, "../index.html"),
      //     "utf-8"
      //   );
      //   res.type("html").send(htmlContent);
      res.type("html").send("<h1>Benvenuto nel mio blog!</h1>");
    },
    json: () => {
      res.type("json").send({ message: "Benvenuto nel mio blog!" });
    },
    default: () => {
      res.status(406).send("Not acceptable");
    },
  });
}

module.exports = {
  index,
};
