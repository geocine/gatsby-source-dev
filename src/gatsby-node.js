const fetch = require("node-fetch");
const crypto = require("crypto");
const queryString = require("query-string");

exports.sourceNodes = async ({ actions }, { username }) => {
  if (!username) {
    throw new Error(
      "You must provide a `username` to `gatsby-source-dev`."
    );
  }

  const { createNode } = actions;

  const articles = [];
  let numResults = null;
  let page = 1;

  do {
    const params = queryString.stringify({
      username,
      page: 1
    });

    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(
      `https://dev.to/api/articles?${params}`
    );

    // eslint-disable-next-line no-await-in-loop
    const data = await res.json();

    numResults = data.length;
    page += 1;

    data.forEach(d => {
      articles.push(d);
    });
  } while (numResults > 0);

  articles.forEach(article => {
    const jsonString = JSON.stringify(article);

    const gatsbyNode = {
      article: Object.assign({}, article),
      id: `${article.id}`,
      parent: "__SOURCE__",
      children: [],
      internal: {
        type: "DevArticles",
        contentDigest: crypto
          .createHash("md5")
          .update(jsonString)
          .digest("hex")
      }
    };

    createNode(gatsbyNode);
  });
};
