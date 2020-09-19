//https://www.gatsbyjs.org/docs/node-apis/
const _ = require('lodash')
const path = require('path')
const { createFilePath,createRemoteFileNode } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const fs = require("fs")

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createNodeField } = actions
  console.log("createNodeField:",createNodeField)
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
          previous: edge.previous ? edge.previous.fields.slug : "fuck",
          next: edge.next ? edge.next.fields.slug : "fuck"
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

async function onCreateNode({
  node,
  actions,
  actions: { createNode },
  getNode,
  loadNodeContent,
  store,
  cache,
  createNodeId,
}){
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    let url = node.frontmatter.featuredimage | null;
    url = typeof url === "string" ? url : url[0] ;
    if (url !== null && url !== undefined) {
      let fileNode = await createRemoteFileNode({
        url: url, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node.featuredSharp___NODE = fileNode.id
      }
    }
  }
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredSharp: File @link(from: "featuredimage___NODE")
    }
    type Frontmatter {
      title: String!
      featuredimage: String
    }
  `)
}

exports.onCreateNode = onCreateNode
