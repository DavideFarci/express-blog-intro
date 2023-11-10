const fs = require("fs");
const path = require("path");

const posts = require("../db/posts.json");

function index(req, res) {
  res.format({
    html: () => {
      // leggo l'html della vista principale
      let htmlContent = fs.readFileSync(
        path.resolve(__dirname, "../postList.html"),
        "utf-8"
      );
      // leggo l'html del componente singolo post
      let listContent = fs.readFileSync(
        path.resolve(__dirname, "../post.html"),
        "utf-8"
      );

      const postsHtml = posts.map((post) =>
        // Sostituisco i placeholder(@) del componente con i valori dei post
        listContent
          .replace("@title", post.title)
          .replace("@content", post.content)
          .replace("@image", post.image)
          .replace("@tags", post.tags)
      );

      // Trasformo l'array ottenuto in una striga e sostituisco il placeholder con la stringa
      htmlContent = htmlContent.replace("@list", postsHtml.join(""));
      // Mando la stringa al server (html)
      res.type("html").send(htmlContent);
    },
    json: () => {
      res.type("json").send({
        totalElements: posts.length,
        data: posts,
      });
    },
  });
}

module.exports = {
  index,
};
