import { graphql, useStaticQuery } from 'gatsby'

const sortEdgesByFmField = (array,field) => {
  return array.slice().sort((a,b) => a.node.frontmatter[field] > b.node.frontmatter[field] ? 1 : -1);
}

const GetWorks = () => {
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
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return sortEdgesByFmField(data.allMarkdownRemark.edges,"id").map((e) => e.node)
}

export default GetWorks
