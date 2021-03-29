import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link, withPrefix } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ensureHttp = (str) => str && (str.indexOf("http")> - 1 ? str : "https://"+ str).replace("http://","https://")

const WorkTemplate = ({
  content,
  contentComponent,
  description,
  images,
  featuredSharp,
  featured,
  tags,
  url,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const img = getImage(featuredSharp)
  return (
    <section className="section work-page">
      {helmet || ''}
      <div className="container content">
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light work-title">
          {title.replace(".com"," . com")}
        </h1>
        { description ? <p className="work-description">{description}</p> : ""}
        {featured && url ? <div className="work-iframe"><iframe style={{
          width: "100%",
          height: "70vh",
        }} src={ensureHttp(url)}></iframe><a className="work-iframe-link" href={url.indexOf("http://") ? url : "http://"+url}>{url}</a></div> :
          featuredSharp ? <GatsbyImage image={img} alt={"we testin"} /> : ""}
        <PostContent content={content} />
        {images && images.length ? (
            <div className="work-images">
              {images.map((img,i) => {
                console.log(img)
                const image = getImage(img)
                // return   <GatsbyImage key={i} image={image} alt={"we testin"} />
                return   <img key={i} src={img} alt={"we testin"} />
              })}
            </div>
        ) : ""}
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
        description={post.frontmatter.description}
        description={post.frontmatter.description}
        url={post.frontmatter.url}
        images={post.frontmatter.images}
        featuredSharp={post.featuredSharp}
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
    }
  }
`
