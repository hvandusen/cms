import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link, navigate } from 'gatsby'
import Layout from '../components/Layout'
import PaperWrapper from '../components/PaperWrapper'
import { Blocks } from '../components/Content'

const Candusen = (props) => {
  const { data } = props
  const [infoToggled,setInfoToggled] = useState(false);
  let [fullscreen, setFullscreen] = useState(false);
  const { markdownRemark: post } = data
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
      case "f":
        setFullscreen(!fullscreen)
        break;
      default:
    }
  }
  useEffect(() =>{
    if(typeof window !== "undefined"){
      document.addEventListener('keydown', onkeydown);
    }
  })
  const toggleInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInfoToggled(!infoToggled);
  }
  return (
    <Layout>
      <div className="paper-page">
      <div className="paper-nav">
        {previous ? (
        <Link className="previous" to={previous} >previous</Link>): null}
        {next ? (
        <Link className="next" to={next} >next</Link>): null}
      </div>
      {(post.frontmatter.description || post.frontmatter.postContent) &&
        <div id="info" className={infoToggled ? "show":""} onClick={toggleInfo}>
          <div id="info-icon">i</div>
          <div id="info-content">
            <div id="info-content-wrapper">
              {post.frontmatter.description && <p>{post.frontmatter.description}</p>}
              {post.frontmatter.postContent && <Blocks postContent={post.frontmatter.postContent} images={post.blockImgs} />}
            </div>
          </div>
        </div>
      }
      <PaperWrapper
        autoFocusz={true}
        tabIndex="0"
        fullscreen={fullscreen}
        {...post.frontmatter}
        {...post.frontmatter.paper_code}
        {...post}
        helmet={
          <Helmet titleTemplate="%s | Candusen">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        } />
      </div>
    </Layout>
  );
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
        postContent {
          type
          text
          caption
          image
          video
        }
        paper_code {
          code
        }
      }
      blockImgs {
        id
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`
