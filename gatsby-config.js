require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log("Configured for ",process.env.NODE_ENV)

module.exports = {
  siteMetadata: {
    title: 'henry van dusen',
    description:
      'stuff i (henry van dusen) do!',
    gatsby_env: process.env.NODE_ENV
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Balance', 'Product', 'Sku', 'Price'],
        secretKey: process.env.STRIPE_SEC,
        downloadFiles: true,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // {
          //   resolve: 'gatsby-remark-relative-images-v2',
          //
          // },
          `gatsby-remark-images-anywhere`,
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     // It's important to specify the maxWidth (in pixels) of
          //     // the content container as this plugin uses this as the
          //     // base for generating different widths of each image.
          //     maxWidth: 2048,
          //   },
          // },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          }
        ],
      },
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        headers: {
          '/*': [
            "Content-Security-Policy: frame-ancestors 'self' https://henryvd.com/",
            "X-Frame-Options: ALLOW-FROM https://henryvd.com/",
          ]
        },
        mergeSecurityHeaders: true,
      }
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
