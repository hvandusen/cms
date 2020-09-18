import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Table from '../components/Table'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

const slugify = (str) => str.replace(/\s+/g, '-').toLowerCase()
const dotcomfix = (str) => str.replace(".com"," . com")
export const IndexPageTemplate = ({
  image,
  title,
  rows,
  works
}) => (
  <div className="home">
    {works.map((work) => {
      let fm = work.frontmatter
      return <div className={"work-box "+slugify(fm.type)}>
        <h1>{fm.title}</h1>
        <p>{fm.description}</p>
        <img src={fm.featuredimage}></img>
        <span className="type-label color">{fm.type}</span>
        <Link className="wrapper" to={work.fields.slug}></Link>
      </div>
    })}
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        rows={['thing1','thing2']}
        works={data.allMarkdownRemark.edges.map((e) => e.node)}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(filter: {fields: {slug: {regex: "/work/"}}}) {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            type
            title
            description
            featuredimage
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
`
