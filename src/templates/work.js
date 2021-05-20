import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link, withPrefix } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent, clickedContent } from '../components/Content'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ensureHttp = (str) => str && (str.indexOf("http")> - 1 ? str : "https://"+ str).replace("http://","https://")

const WorkTemplate = ({
  content,
  contentComponent,
  description,
  images,
  featuredSharp,
  imagesSharp,
  display_url,
  featured,
  tags,
  url,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const img = getImage(featuredSharp)
  const niceImages = imagesSharp.map((e,i) => {
      return e.childImageSharp ? getImage(e) : images[i];
  })
  console.log("imagessharp",niceImages)
  let [iframeClicked,setIframeClicked] = useState("")
  const iframeCoverClicked = (e) => setIframeClicked("clicked")
  const displayURL = display_url ? display_url : url;
  return (
    <section className="section work-page">
      {helmet || ''}
      <div className="container content">
        <div className="work-header">
          <h5 className="title is-size-2 has-text-weight-bold is-bold-light work-title">
            {title.replace(".com"," . com")}
          </h5>
          { !!url  ? (<div className="work-url"><a href={displayURL} target="_blank">{displayURL}</a></div>) : ""}
        </div>
        { description ? <div className="work-description"><p>{description}</p></div> : ""}
        {false && featuredSharp ? <GatsbyImage image={img} alt={"we testin"} /> : ""}
        <PostContent content={content} className="work-content-container"/>
        {niceImages && niceImages.length ? (
            <div className="work-images">
              {niceImages.map((img,i) => {
                console.log("work-image: ",img)
                if(typeof img !== "string"){
                  return <GatsbyImage className="work-image" key={i} image={img} alt={"we testin"} />
                } else {
                  return (<div className="videowrapper">
                    <div className="mobile-video-cover" onClick={clickedContent}>
                      <video autoPlay loop muted key={i} src={img}></video>
                      </div>
                    </div>);
                }
              })}
            </div>
        ) : ""}
        {featured && url ?
          <div className="work-iframe">
            <div className={`iframe-cover ${iframeClicked}`} onClick={iframeCoverClicked}><h3>Browse site</h3></div>
            <iframe style={{
            width: "100%",
            height: "70vh",
            }} src={url}></iframe>
            <a className="work-iframe-link" target="_blank" href={url.indexOf("http://") ? url : "http://"+url}>{url}</a>
          </div> : ""}
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h3>Tags</h3>
            <ul className="taglist">
              {tags.map((tag) => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}

WorkTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  images: PropTypes.array,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Work = ({ data }) => {
  const { markdownRemark: post } = data
  console.log("dataz",data)
  return (
    <Layout>
      <WorkTemplate
        content={post.html}
        contentComponent={HTMLContent}
        display_url={post.frontmatter.display_url}
        description={post.frontmatter.description}
        url={post.frontmatter.url}
        images={post.frontmatter.images}
        featuredSharp={post.featuredSharp}
        imagesSharp={post.imagesSharp}
        featured={post.frontmatter.featured}
        helmet={
          <Helmet titleTemplate="%s | Work">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <script src={`${withPrefix('/')}paper-full.min.js`}></script>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

Work.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Work

export const pageQuery = graphql`
  query WorkByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        images
        featured
        url
        display_url
        tags
      }
      featuredSharp {
        childImageSharp {
          gatsbyImageData(
            width: 800
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      imagesSharp {
        childImageSharp {
          gatsbyImageData(
            width: 1400
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`
