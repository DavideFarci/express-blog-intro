const posts = require("../db/posts.json");

function index(req, res) {
  res.format({
    html: () => {
      const html = ["<h1>List Posts</h1>"];

      html.push("<ul>");
      for (const post of posts) {
        html.push(
          `<li>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <img src="/${post.image}" alt="image" style="width: 200px">
                <p>${post.tags}</p>
            </li>`
        );
      }
      html.push("<ul>");
      res.send(html.join(""));
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
