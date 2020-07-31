import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title
}) => (
  <div className="styleguide">
    <div><h1>Henry Van Dusen</h1></div>
    <div>
      <h2>Website of things h2.</h2>
      <h2>And maybe some more bro.</h2>
    </div>
    <h3>Subtitle h3</h3>
    <h4>And some small cap for ur bitchahh</h4>
    <p>This is a p big dog.</p>
    <i>This should be italic</i>
    <b>Bold please! can u b bold?</b>
    <a href="google.com">Here's a link. Do u like the link?</a>
    <div>Regular div text... How we feel bout this?</div>
    <div>
      <p>This is div w some text though. does it look okay????</p>
      <p>it's got a few ps..... hoping that's cool with you!</p>
      <p>It had better be, XD!</p>
    </div>
    <ul>
      <li>List item big bro</li>
      <li>Another list item big bro</li>
      <li>Okay just one more please</li>
    </ul>
    <button>okay nice</button>
    <input type="range"></input>
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
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
