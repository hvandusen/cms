import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from '../components/Layout'
import Table from '../components/Table'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

const slugifyType = (str) => str.replace(/\s+/g, '-').toLowerCase().replace("mix","tape")
const dotcomfix = (str) => str.replace(".com"," . com")
const ensureHttp = (str) => str.indexOf("http")> - 1 ? str : "http://"+ str
export const IndexPageTemplate = ({
  image,
  title,
  rows,
  works
}) => {
  let [filter, setFilter] = useState("");
  let handleFilter = (e) => setFilter(slugifyType(e.currentTarget.textContent))
  let categories = works.map((work) => work.frontmatter.type)
  .filter((e,i,self) => self.indexOf(e) === i)
  let worksWithFilter = works.filter(work => {
    return slugifyType(work.frontmatter.type) === filter
  })
  let worksWithoutFilter = works.filter(work => {
    return slugifyType(work.frontmatter.type) !== filter
  })
  let sortedWorks = worksWithFilter.concat(worksWithoutFilter)
  return (
    <div className="homepage">
      <div key={1}className="project-nav">
        <span key={1} className="project-category">Filter:</span>
        {categories.map((cat,i) =>
          <span key={i+2} onClick={handleFilter} className={"color project-category "+slugifyType(cat)}>{cat}</span>
        )}
      </div>
      <div key={2}className={"project-grid " + (filter.length > 0 ? "filtered" : "")}>
      {sortedWorks.map((work,i) => {
        console.log(work)
        let fm = work.frontmatter
        let theClass = "work-box "+slugifyType(fm.type) + (filter.length > 0  && filter !== slugifyType(fm.type) ? " hide" : "")
        return <div key={i} className={theClass}>
          <h2>{fm.title}</h2>
          <p>{fm.description}</p>
          <img src={fm.featuredimage}></img>
          {work.localImage ?
          <Img fluid={work.localImage.childImageSharp.fluid} alt={fm.description}/>
          : ""}
          {fm.url && fm.featured ? (
            <iframe src={ensureHttp(fm.url)}></iframe>
          ): ""}
          <Link className="wrapper" to={work.fields.slug}></Link>
          <span className="type-label color">{fm.type}</span>
        </div>
      })}
    </div>
  </div>)
}

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
// localImage {
//   childImageSharp {
//     fluid {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }
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
            url
            description
            featuredimage
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
`
