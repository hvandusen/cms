//https://www.gatsbyjs.org/docs/node-apis/
const _ = require('lodash')
const path = require('path')
const { createFilePath,createRemoteFileNode } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images-v2')
const fs = require("fs")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
   resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    },
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createNodeField } = actions
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              type
            }
          }
          next {
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    fs.writeFileSync("posts-data.json", JSON.stringify(posts))
    posts.forEach((edge) => {
      const id = edge.node.id
      const postType = edge.node.frontmatter.type
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(
            postType === "Candusen page" ? "paper-page" : edge.node.frontmatter.templateKey
          )}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          type: postType,
          previous: edge.previous ? edge.previous.fields.slug : null,
          next: edge.next ? edge.next.fields.slug : null
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`
      if(tagPath !== "/tags//")
        createPage({
          path: tagPath,
          component: path.resolve(`src/templates/tags.js`),
          context: {
            tag,
          },
        })
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "fields.localFeaturedImg")
      featuredImgs: [File] @link(from: "fields.localFeaturedImgs")
      blockImgs: [File] @link(from: "fields.localBlockImgs")
    }
    type Frontmatter {
      title: String!
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions,
  actions: { createNode },
  getNode,
  loadNodeContent,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField } = actions
  // fmImagesToRelative(node) // convert image paths for gatsby images
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

      //If thers a featured image add file node for it
    if (
      node.internal.type === "MarkdownRemark" &&
      node.frontmatter.hasOwnProperty("featuredimage") &&
      node.frontmatter.featuredimage.length
    ) {
      const fileNode = await createRemoteFileNode({
        url: node.frontmatter.featuredimage[0], // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's Redux store
      })
      // if the file was created, extend the node with "localFeaturedImg"
      if (fileNode) {
        createNodeField({ node, name: "localFeaturedImg", value: fileNode.id })
      }
    }
    //If theres a images field add file node for them
    if (
      node.internal.type === "MarkdownRemark" &&
      node.frontmatter.hasOwnProperty("images") &&
      node.frontmatter.images.length
    ) {
      const imgs = node.frontmatter.images;
      let fileNodes = []
      for (var i = 0; i < imgs.length; i++) {
        const fileNode = await createRemoteFileNode({
          url: imgs[i], // string that points to the URL of the image
          parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's Redux store
        })
        fileNodes.push(fileNode.id)
      }
      // if the file was created, extend the node with "localFeaturedImg"
      if (fileNodes.length) {
        createNodeField({ node, name: "localFeaturedImgs", value: fileNodes })
      }
    }
    //If images are added to content blocks
    if (
      node.internal.type === "MarkdownRemark" &&
      node.frontmatter.hasOwnProperty("postContent") &&
      node.frontmatter.postContent.length &&
      node.frontmatter.postContent.find(e => e.image && e.image.length && e.image[0].indexOf(".mp4") === -1)
    ) {
      const imgs = node.frontmatter.postContent.filter(e => e.image && e.image.length && e.image[0].indexOf(".mp4") === -1).map(c => c.image[0]);
      let fileNodes = []
      for (var i = 0; i < imgs.length; i++) {
        const fileNode = await createRemoteFileNode({
          url: imgs[i], // string that points to the URL of the image
          parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's Redux store
        })
        fileNodes.push(fileNode.id)
      }
      // if the file was created, extend the node with "localFeaturedImg"
      if (fileNodes.length) {
        createNodeField({ node, name: "localBlockImgs", value: fileNodes })
      }
    }

    return;
  }
}
