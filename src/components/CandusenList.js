import React from 'react'
import PropTypes from 'prop-types'
import PaperWrapper from './PaperWrapper'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
}

const previewStyle = {
  overflow: "scroll",
  padding: "2rem"
}

const CandusenList = ({data}) => {
    const { edges: posts } = data.allMarkdownRemark
    let wrapperRef = React.createRef()
    //<PaperWrapper {...post.frontmatter} {...post.frontmatter.paper_code} {...post}/>
    return (
      <div className="paper-listing" style={gridStyle}>
        {posts && posts.map(({ node: post }) =>
            <div className="paper-preview" ref={wrapperRef} style={previewStyle} key={post.id}>
              <Link class="paper-preview-link" to={post.fields.slug}>{post.frontmatter.title}</Link>
              <PaperWrapper wrapperRef={wrapperRef} {...post.frontmatter} {...post.frontmatter.paper_code} {...post}/>
            </div>
          )}
      </div>
    )
}

CandusenList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
     query MyQuery {
       allMarkdownRemark(filter: {frontmatter: {type: {eq: "Candusen page"}}}) {
         edges {
           node {
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
             fields {
               slug
             }
           }
         }
       }
     }
    `}
    render={(data, count) => <CandusenList data={data} />}
  />
)
