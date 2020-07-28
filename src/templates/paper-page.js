import React, {  useEffect } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import {paper, PaperScript} from 'paper'
console.log(PaperScript)

window.colorWheel = (entry) =>
        {
            var key;
            if(entry<0)
              entry = 1535-(-entry%1535)
            else
              entry = entry%1535
            var text = "rgb(";
            var num = entry%256;
            if(entry >= 0 && entry < 256)
            	text= text+ "0,255,"+num+")";
            else if(entry>255 && entry<512)
				text= text+ "0,"+(255-num)+",255)";
			else if(entry>511 && entry<768)
            	text= text+ num +",0,255)";
			else if(entry>767 && entry<1024)
            	text= text+ "255,0,"+(255-num)+")";
            else if(entry>1023 && entry<1280)
            	text= text+ "255,"+num+",0)";
            else if(entry>1279 && entry<1535)
            	text= text+ (255-num)+",255,0)";
            return text;
        }
window.prettyRaCo = () => {
  var colorWheel =  Math.floor(Math.random()*6);

    var color = "rgb(";
    var randomNumber =  Math.floor(Math.random()*256);
    if(colorWheel ==0)
    color= color+ "0,255,"+randomNumber+")";
     if(colorWheel ==1)
    color= color+ "0,"+randomNumber+",255)";
     if(colorWheel ==2)
    color= color+ "255, 0,"+randomNumber+")";
     if(colorWheel ==3)
    color= color+ "255,"+randomNumber+",0)";
     if(colorWheel ==4)
    color= color+ randomNumber+",255,0)";
     if(colorWheel ==5)
    color= color+ randomNumber+",0,255)";
    return color;

}

let canv = () => (
  <div style={{position: "fixed"}} className="canvasContainer"><canvas hidpi="on" id="myCanvas" width={window.innerWidth} height={window.innerHeight}></canvas></div>
)
// console.log(useEffect);
export const CandusenTemplate = ({
  content,
  contentComponent,
  description,
  images,
  featuredimage,
  tags,
  title,
  helmet,
  code
}) => {
  const PostContent = contentComponent || Content
  useEffect(() => {
    const script = document.createElement('script');
    script.type= "text/javascript"
    let src = paper.PaperScript.compile(code)
    console.log(src)
    // script.innerHTML = src.source;
    // script.async = true;
    const canvas = document.getElementById('myCanvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    paper.install(window)
    paper.setup(canvas);
    paper.execute(code)
    paper.activate()
    // document.body.appendChild(script);
    return () => {
      // document.body.removeChild(script);
    }
  }, []);
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {images && images.length ? (
                images.map((img) => <img src={img}></img>)
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
        </div>
        {canv()}
      </div>
    </section>
  )
}

CandusenTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  images: PropTypes.object,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Candusen = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CandusenTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        images={post.frontmatter.images}
        featuredimage={post.frontmatter.featuredimage}
        code={post.frontmatter.paper_code.code}
        helmet={
          <Helmet titleTemplate="%s | Candusen">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

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
