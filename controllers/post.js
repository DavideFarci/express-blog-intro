const fs = require("fs");
const path = require("path");

const posts = require("../db/posts.json");

function index(req, res) {
  res.format({
    html: () => {
      // leggo l'html della vista principale
      let htmlContent = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );

      // Creo degli arr con dentro il titolo e il corpo della vista
      const title = [];
      title.push(`I miei Post`);
      const body = [];
      body.push(`
        <div class="container mx-auto py-2">
          <h1 class="text-5xl font-bold text-center">Post List</h1>
          <ul class="grid grid-cols-3 gap-8 py-12">
            @post
          </ul>
        </div>
      `);

      // leggo l'html del componente singolo post
      let listContent = fs.readFileSync(
        path.resolve(__dirname, "../partials/post.html"),
        "utf-8"
      );

      // Costruisco il nuovo array con i post renderizzati
      const postsHtml = posts.map((post) =>
        // Sostituisco i placeholder(@) del componente con i valori dei post
        listContent
          .replace("@title", post.title)
          .replace("@content", post.content)
          .replace("@image", post.image)
          .replace("@tags", post.tags)
      );

      // Aggiungo i post renderizzati al corpo
      const postListHtml = body.join("").replace("@post", postsHtml.join(""));

      // Trasformo il titolo in una striga e sostituisco i placeholder con titolo e corpo
      htmlContent = htmlContent
        .replace("@title", title.join(""))
        .replace("@body", postListHtml);
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
