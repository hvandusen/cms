import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PaperWrapper from '../components/PaperWrapper'
import { HTMLContent } from '../components/Content'

const Candusen = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <PaperWrapper {...post.frontmatter} {...post.frontmatter.paper_code}
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

// <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
//   {title}
// </h1>
// <p>{description}</p>
// <PostContent content={html} />
// {images && images.length ? (
//     images.map((img) => <img src={img} alt=""></img>)
// ) : <p>hi</p>}
// {tags && tags.length ? (
//   <div style={{ marginTop: `4rem` }}>
//     <h4>Tags</h4>
//     <ul className="taglist">
//       {tags.map((tag) => (
//         <li key={tag + `tag`}>
//           <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
//         </li>
//       ))}
//     </ul>
//   </div>

Candusen.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
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
