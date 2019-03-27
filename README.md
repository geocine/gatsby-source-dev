# gatsby-source-dev

[![NPM version](https://badgen.net/npm/v/gatsby-source-dev)](https://www.npmjs.com/package/gatsby-source-dev) [![Build Status](https://travis-ci.org/geocine/gatsby-source-dev.svg?branch=master)](https://travis-ci.org/geocine/gatsby-source-dev)

A Gatsby plugin that fetches user articles from Dev.to’s `/articles?username` combined with `/articles/${id}` endpoint.

## Usage

Install `gatsby-source-dev` in your project:

```
yarn add gatsby-source-dev
npm install gatsby-source-dev
```

Then add the plugin to your `gatsby-config.js` file:

```js
{
  resolve: "gatsby-source-dev",
  options: {
    // This is your username on Dev.to
    username: ''
  }
}
```

The plugin will store the Dev.to API response in Gatsby. Here's an example of a query that fetches an articles `title`, `id`, and `description`.

```js
{
  allDevArticles {
    edges {
      node {
        article {
          id
          title
          description
        }
      }
    }
  }
}
```

The node contains the entire response from Dev.to’s endpoint.

> Pagination is not yet implemented
