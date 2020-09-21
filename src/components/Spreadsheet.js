import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const Spreadsheet = ({data}) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <div className="spreadsheet">
          fuck off
        </div>
    )
}

Spreadsheet.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query allWork {
       allMarkdownRemark(filter: {fields: {slug: {regex: "/work/"}}}) {
         edges {
           node {
             id
             html
             frontmatter {
               date(formatString: "MMMM DD, YYYY")
               title
               description
               featuredimage
               tags
             }
             fields {
               slug
             }
           }
         }
       }
     }
    `}
    render={(data, count) => <Spreadsheet data={data} />}
  />
)
