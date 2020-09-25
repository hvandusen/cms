import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

import BackgroundImage from 'gatsby-background-image'

const slugifyType = (str) => str.replace(/\s+/g, '-').toLowerCase().replace("mix","tape")
const ensureHttp = (str) => str.indexOf("http")> - 1 ? str : "http://"+ str
const labelOrderedWorks = (works) => {
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
export const IndexPageTemplate = ({
  image,
  title,
  rows,
  works
}) => {
  let [filter, setFilter] = useState("");
  const handleFilter = (e) => setFilter(slugifyType(e.currentTarget.textContent))
  const allWorks = works.slice()
  const published = allWorks.filter( w => !w.frontmatter.draft)
  const categories = published.map((work) => work.frontmatter.type)
  .filter((e,i,self) => self.indexOf(e) === i)
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
      <div key={1}className="project-nav">
        <span key={1} className="project-category">Filter:</span>
        {categories.map((cat,i) =>
          <span key={i+2} onClick={handleFilter} className={"color project-category "+slugifyType(cat)}>{convertTypeNames(cat)}</span>
        )}
      </div>
      <div key={2} className={"project-grid " + (filter.length > 0 ? "filtered" : "")}>
      {sortedWorks.map((work,j) => {
        const fm = work.frontmatter
        const theClass = " work-box "+slugifyType(fm.type) +
        (filter.length > 0  && filter !== slugifyType(fm.type) ? " hide " : " ")+
        (work.firstOfType ? "first " : " ")
        console.log(work)
        return <div key={j} className={theClass}>
          {work.featuredSharp ?
          <BackgroundImage className="project-img "
            style={{
              backgroundSize: "contain"
            }}
            fluid={work.featuredSharp.childImageSharp.fluid}
            alt={fm.description}/>
          : ""}
          {fm.url && fm.featured ? (
            <iframe title={fm.title} src={ensureHttp(fm.url)}></iframe>
          ): ""}
          <Link className="wrappler" to={work.fields.slug}><h2 className="color-text">{fm.title}</h2></Link>
          <p className="description">{fm.description}</p>
          {work.html.length ?
            <div dangerouslySetInnerHTML={{ __html: work.html}}></div>
          : ""}

          <span className="type-label color">{convertTypeNames(fm.type)}</span>
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
  const randomWorks = sortEdgesByFmField(data.allMarkdownRemark.edges,"title").map((e) => e.node)
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        rows={['thing1','thing2']}
        works={randomWorks}
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
              fluid {
                ...GatsbyImageSharpFluid
              }
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
