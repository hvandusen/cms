import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link, withPrefix, navigate } from 'gatsby'
import Layout from '../components/Layout'
import PaperWrapper from '../components/PaperWrapper'
import { HTMLContent } from '../components/Content'

const Candusen = (props) => {
  const { data } = props
  const { markdownRemark: post } = data
  console.log("next",props,"previous")
  const {previous,next} = props.pageContext
  const onkeydown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        navigate(previous)
        break;
      case "ArrowRight":
        navigate(next)
        break;
      case "ArrowUp":

        break;
      case "ArrowDown":

        break;
      default:
    }
  }
  useEffect(() =>{
    if(typeof window !== "undefined"){
      document.addEventListener('keydown', onkeydown);
      console.log("did it")
    }
  },)
  return (
    <Layout>
      <div className="paper-nav">
        {previous ? (
        <Link className="previous" to={previous} >previous</Link>): null}
        {next ? (
        <Link className="next" to={next} >next</Link>): null}
      </div>
      <PaperWrapper autoFocus={true} tabIndex="0" onKeyDown="alert()" {...post.frontmatter} {...post.frontmatter.paper_code}
        {...post}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Candusen">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Candusen.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    previous: PropTypes.string,
    next: PropTypes.string
  }),
}

export default Candusen

export const pageQuery = graphql`
  query CandusenByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage
        images
        tags
        paper_code {
          code
        }
      }
    }
  }
`
