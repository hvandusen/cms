import React, {  useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import Content from './Content'
import {paper, PaperScope} from 'paper'
import install from './paperUtils'

const canvasContainerStyle = {
  minHeight: "100vh"
}

const canvasStyle = {
  boxShadow: "blue 0 0 10px",
  height: "100%",
  width: "100%",
  position: "relative"
}

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
}) => {
  const PostContent = contentComponent || Content
  let wrapperRef = React.createRef()
  let [dims,setDims] = useState([window.innerWidth,window.innerHeight])
  let scope = new PaperScope()
  if(typeof window !== "undefined")
    install(window,scope)
  useEffect(() => {
      //setDims([wrapperRef.current.offsetWidth,wrapperRef.current.offsetHeight])
    const script = document.createElement('script');
    script.type= "text/javascript"
    const canvas = document.getElementById('canvas-'+id)
    canvas.width = wrapperRef.current ? wrapperRef.current.offsetWidth : window.innerWidth//dims[0]
    canvas.height = wrapperRef.current ? wrapperRef.current.offsetHeight : window.innerHeight//dims[1]
    console.log(wrapperRef.current.offsetHeight)
    scope.install(window)
    scope.setup(canvas);
    scope.execute(code)
    scope.activate()
    return () => {
      scope.remove()
    }
  });
  return (
    <section className="section">
      {helmet || ''}
      <div ref={wrapperRef} style={canvasContainerStyle} className="canvasContainer">
        <canvas style={canvasStyle} hidpi="on" id={"canvas-"+id}></canvas>
      </div>
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
