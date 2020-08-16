import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link, withPrefix } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const WorkTemplate = ({
  content,
  contentComponent,
  description,
  images,
  featuredimage,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        <p>{description}</p>
        <PostContent content={content} />
        {images && images.length ? (
            <div className="post-images">
              {images.map((img) => <img src={img}></img>)}
            </div>
        ) : <p>hi</p>}
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
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
  images: PropTypes.object,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Work = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <WorkTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        images={post.frontmatter.images}
        featuredimage={post.frontmatter.featuredimage}
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
        tags
      }
    }
  }
`
