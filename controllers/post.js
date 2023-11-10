const fs = require("fs");
const path = require("path");

const posts = require("../db/posts.json");

function index(req, res) {
  res.format({
    html: () => {
      let htmlContent = fs.readFileSync(
        path.resolve(__dirname, "../posts.html"),
        "utf-8"
      );
      let listContent = fs.readFileSync(
        path.resolve(__dirname, "../list.html"),
        "utf-8"
      );
      const postsHtml = [];
      for (const post of posts) {
        postsHtml.push(
          listContent
            .replace("@title", post.title)
            .replace("@content", post.content)
            .replace("@image", post.image)
            .replace("@tags", post.tags)
        );
      }

      htmlContent = htmlContent.replace("@list", postsHtml.join(""));
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
