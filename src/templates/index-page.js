import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Thumb from '../components/Thumb'
import Layout from '../components/Layout'
import PostFilter from '../components/PostFilter'

// const slugifyType = (str) => str.replace(/\s+/g, '-').toLowerCase()
const slugifyType = (str) => str.split("-")[0].toLowerCase()
const labelOrderedWorks = (works) => {
  //this iterates through and updates tag of current if its not same as last... pretty stupid
  let labeled = works.slice()
  labeled[0].firstOfType = true
  for (var i = 1; i < works.length; i++) {
    labeled[i].firstOfType = false
    if(labeled[i-1].frontmatter.type !== labeled[i].frontmatter.type){
      labeled[i].firstOfType = true
    }
  }
  return labeled
}

const sortEdgesByFmField = (array,field) => {
  return array.slice().sort((a,b) => a.node.frontmatter[field] > b.node.frontmatter[field] ? 1 : -1);
}
const IndexPageTemplate = ({
  image,
  title,
  works
}) => {
  let [filter, setFilter] = useState("");
  const handleFilter = (e) => setFilter(slugifyType(e.currentTarget.textContent))
  const allWorks = works.slice()
  const published = allWorks.filter( w => !w.frontmatter.draft)
  const categories = published.map((work) => work.frontmatter.type).filter((e,i,self) => self.indexOf(e) === i)
  const worksWithFilter = published.slice().filter(work => {
    return slugifyType(work.frontmatter.type) === filter
  })
  const worksWithoutFilter = published.slice().filter(work => {
    return slugifyType(work.frontmatter.type) !== filter
  })
  const sortedWorks = labelOrderedWorks(worksWithFilter.concat(worksWithoutFilter))
  return (
    <div className="homepage">
      <PostFilter works={sortedWorks} setFilter={setFilter}></PostFilter>
      <div key={2} className={"project-grid " + (filter.length > 0 ? "filtered" : "")}>
      {sortedWorks.map((work,j) => <Thumb  filter={filter} work={work} key={j}></Thumb>)}
    </div>
  </div>)
}

const IndexPage = ({ data }) => {
  const allworks = sortEdgesByFmField(data.allMarkdownRemark.edges,"id",false).map((e) => e.node).reverse()
  return (
    <Layout>
      <IndexPageTemplate
        image={data.markdownRemark.frontmatter.image}
        title={data.markdownRemark.frontmatter.title}
        works={allworks}
      />
    </Layout>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
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
            url
            description
            featuredimage
            draft
            featured
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
`
