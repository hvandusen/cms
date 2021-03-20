import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Thumb from '../components/Thumb'
import Layout from '../components/Layout'
import Works from '../components/GetWorks'

const slugifyType = (str) => str.replace(/\s+/g, '-').toLowerCase().replace("mix","tape")
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
  const convertTypeNames = (type) => {
    let switcher = {
      "Candusen page": "fun"
    }
    return switcher.hasOwnProperty(type) ? switcher[type] : type
  }
  const sortedWorks = labelOrderedWorks(worksWithFilter.concat(worksWithoutFilter))
  return (
    <div className="homepage">
      <div role="form" key={1}className="project-nav">
        <span key={1} className="project-category">Filter:</span>
        {categories.map((cat,i) =>
          <span tabIndex={i} role="button"  key={i+2} onKeyDown={handleFilter} onClick={handleFilter} className={"color project-category "+slugifyType(cat)}>{convertTypeNames(cat)}</span>
        )}
      </div>
      <div key={2} className={"project-grid " + (filter.length > 0 ? "filtered" : "")}>
      {sortedWorks.map((work,j) => <Thumb  filter={filter} work={work} key={j}></Thumb>)}
    </div>
  </div>)
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const allworks = Works()
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
  }
`
