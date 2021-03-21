import { graphql, useStaticQuery } from 'gatsby'

const sortEdgesByFmField = (array,field) => {
  return array.slice().sort((a,b) => a.node.frontmatter[field] > b.node.frontmatter[field] ? 1 : -1);
}

export const Works = () => {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      allMarkdownRemark(filter: {fields: {slug: {regex: "/work/"}}}) {
        edges {
          node {
            id
            html
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              type
              title
              url
              description
              featuredimage
              draft
              featured
              images
              tags
              paper_code {
                code
              }
            }
            featuredSharp {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return sortEdgesByFmField(data.allMarkdownRemark.edges,"title").map((e) => e.node)
}
