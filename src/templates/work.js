import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link, withPrefix } from 'gatsby'
import Layout from '../components/Layout'
import { useShoppingCart } from "use-shopping-cart"
import Content, { HTMLContent, clickedContent, Blocks } from '../components/Content'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ensureHttp = (str) => str && (str.indexOf("http")> - 1 ? str : "https://"+ str).replace("http://","https://")
const spanify = (str) => str.split("").map((char,i)=> <span key={i}>{char}</span>)

const WorkTemplate = ({
  content,
  contentComponent,
  description,
  images,
  featuredSharp,
  featuredImg,
  featuredImgs,
  display_url,
  product,
  featured,
  tags,
  mode,
  slug,
  url,
  title,
  helmet,
  type,
  postContent,
  blockImgs,
  other
}) => {
  const PostContent = contentComponent || Content
  const formatCurrency = (price) => `$${price/100}`
  const img = getImage(featuredImg)
  const niceImages = featuredImgs ? featuredImgs.map((e,i) => {
      return e.childImageSharp ? getImage(e) : images[i];
  }) : null;
  let [iframeClicked,setIframeClicked] = useState("")
  const iframeCoverClicked = (e) => setIframeClicked("clicked")
  const { addItem,cartDetails,incrementItem } = useShoppingCart()
  const addToCart = async (e) => {
      e.preventDefault()
      delete product.id
      if(cartDetails[product.price_id])
        incrementItem(product.price_id,1)
      else
        addItem(product,1)
    }
  const displayURL = display_url ? display_url : url;
  return (
    <div id="work-page-wrapper">
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
        {postContent && <Blocks postContent={postContent} images={blockImgs}/>}
        {content && <PostContent content={content}/>}
        {featured && url && url.indexOf("https")>-1 ?
          <div className="work-iframe">
            <div className={`iframe-cover ${iframeClicked}`} onClick={iframeCoverClicked}><h3>Browse site</h3></div>
            <iframe style={{
            width: "100%",
            height: "70vh",
            }} src={url}></iframe>
            <a className="work-iframe-link" target="_blank" href={display_url && display_url.indexOf("http://") ? display_url : "http://"+display_url}>{display_url}</a>
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
        {product && product.price ?
          <div className="product">
          <p className="price">{formatCurrency(product.price)}</p>
          <p className="add-to-cart" onClick={addToCart}>{spanify("Add to Cart")}</p>
          </div>
           : ""}
      </div>
    </section>
    <section className="section other-work">
      {other.edges.length > 2 && <div id="other-work">
        <h3>More {type.toLowerCase()}s:</h3>
        <div id="other-work-list">
        {other.edges.filter(({node: work})=> (!!!work.frontmatter.draft && work.fields.slug !== slug)).map(({node: work},i)=>
          <a key={i} class="other-work-item" href={work.fields.slug}>
            <p key={i} class="other-work-item-title">{work.frontmatter.title}</p>
            {work.featuredImg && <div class="other-work-item-image"><GatsbyImage objectFit="contain" image={work.featuredImg.childImageSharp.gatsbyImageData} alt={"we testin"} /></div>}
          </a>
        )}
        </div>
      </div>}
    </section>
    </div>
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

const getProduct = (allStripePrice,price_id) => {
  if(!allStripePrice || !price_id)
    return {}
  const prices = allStripePrice.edges.map(e => e.node)
  const price = prices.find((p)=>p.id === price_id)
  const product = price.product
  product.image = product.images[0]
  product.price = price.unit_amount
  product.price_id = price.id
  product.currency = "USD"
  delete product.id
  return product
}

const Work = ({ data }) => {
  const { markdownRemark: post } = data
  const { allStripePrice, other } = data
  const mode = data.site.siteMetadata.gatsby_env
  let price_id = post.frontmatter[`price_${(mode === "development" ? 'test_':'')}id`]
  const product = getProduct(allStripePrice, price_id)
  console.log("other",other)
  return (
    <Layout>
      <WorkTemplate
        blockImgs={post.blockImgs}
        content={post.html}
        contentComponent={HTMLContent}
        display_url={post.frontmatter.display_url}
        description={post.frontmatter.description}
        url={post.frontmatter.url}
        images={post.frontmatter.images}
        featured={post.frontmatter.featured}
        postContent={post.frontmatter.postContent}
        product={product}
        mode={mode}
        type={post.frontmatter.type}
        slug={post.fields.slug}
        featuredSharp={post.featuredSharp}
        featuredImgs={post.featuredImgs}
        featuredImg={post.featuredImg}
        helmet={
          <Helmet titleTemplate="%s | Work">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        other={other}
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
  query WorkByID($id: String!, $type: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      featuredImg {
        childImageSharp {
          gatsbyImageData
        }
      }
      featuredImgs {
        childImageSharp {
          gatsbyImageData
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        type
        description
        postContent {
            type
            text
            caption
            image
            video
          }
        price_id
        price_test_id
        images
        featured
        url
        display_url
        tags
      }
      blockImgs {
          id
          childImageSharp {
            gatsbyImageData
          }
        }
    }
    other: allMarkdownRemark(filter: {frontmatter: {type: {eq: $type}}}) {
      edges {
        node {
          frontmatter {
            title
            draft
          }
          featuredImg {
            childImageSharp {
              gatsbyImageData
            }
          }
          fields {
            slug
          }
        }
      }
    }
    allStripePrice {
      edges {
        node {
          id
          unit_amount
          product {
            id
            images
            description
            name
          }
        }
      }
    }
    site {
      siteMetadata {
        gatsby_env
      }
    }
  }
`
