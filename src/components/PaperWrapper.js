import React, {  useEffect } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import Content from './Content'
import {paper, PaperScope} from 'paper'
import install from './paperUtils'
if(typeof window !== "undefined")
  install(window,paper)

const PaperWrapper = ({
  id,
  html,
  contentComponent,
  description,
  images,
  featuredimage,
  tags,
  title,
  helmet,
  code,
  width,
  height
}) => {
  const PostContent = contentComponent || Content
  let scope = new PaperScope()
  let canv = () => (
    <div style={{position: "fixed"}} className="canvasContainer">
      <canvas hidpi="on" id={"canvas-"+id}
        width={width ? width : window.innerWidth}
        height={height ? height : window.innerHeight}>
      </canvas>
    </div>
  )
  useEffect(() => {

    const script = document.createElement('script');
    script.type= "text/javascript"
    const canvas = document.getElementById('canvas-'+id)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    scope.install(window)
    scope.setup(canvas);
    scope.execute(code)
    console.log("executing ",title)
    scope.activate()
    return () => {
      paper.remove()
    }
  });
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
            <PostContent content={html} />
            {images && images.length ? (
                images.map((img) => <img src={img} alt=""></img>)
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

PaperWrapper.propTypes = {
  html: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  // images: PropTypes.object,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

export default PaperWrapper
