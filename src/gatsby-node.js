const axios = require("axios");
const crypto = require("crypto");
const queryString = require("query-string");

exports.sourceNodes = async ({ actions }, { username }) => {
  if (!username) {
    throw new Error("You must provide a `username` to `gatsby-source-dev`.");
  }

  const { createNode } = actions;

  const articles = [];

  const params = queryString.stringify({
    username
  });

  // eslint-disable-next-line no-await-in-loop
  const res = await axios.get(`https://dev.to/api/articles?${params}`);

  // eslint-disable-next-line no-await-in-loop
  const { data } = res;

  // eslint-disable-next-line no-restricted-syntax
  for (const article of data) {
    // eslint-disable-next-line no-await-in-loop
    const articleResult = await axios(
      `https://dev.to/api/articles/${article.id}`
    );
    // eslint-disable-next-line no-await-in-loop
    const articleData = await articleResult.data;
    articles.push({ ...article, ...articleData });
  }

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
