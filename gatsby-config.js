/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `cards`,
        path: `${__dirname}/src/images/cards`
      }
    }
  ],
  siteMetadata: {
    title: "Amiibo Memory Game",
    description: "Memory car game with your favourite Amiibo characters",
    copyright: "2022 Giovanni Meogrossi",
    contact: "giovanni.meogrossi@gmail.com"
  }
}
