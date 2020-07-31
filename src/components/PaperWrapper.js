import React, {  useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'
import Content from './Content'
import {paper, PaperScope} from 'paper'
import install from './paperUtils'

const canvasContainerStyle = {
  position: "relative"
}

const canvasStyle = {
  // boxShadow: "blue 0 0 10px",
  height: "100%",
  width: "100%"
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
  code
}) => {
  const PostContent = contentComponent || Content
  let wrapperRef = React.createRef()
  let [dims,setDims] = useState([window.innerWidth,window.innerHeight])
  let scope = new PaperScope()
  useEffect(() => {
    if(typeof window !== "undefined")
      install(window,scope)
      //setDims([wrapperRef.current.offsetWidth,wrapperRef.current.offsetHeight])
    const script = document.createElement('script');
    script.type= "text/javascript"
    const canvas = document.getElementById('canvas-'+id)
    canvas.width = wrapperRef.current ? wrapperRef.current.offsetWidth : window.innerWidth//dims[0]
    canvas.height = wrapperRef.current ? wrapperRef.current.offsetHeight : window.innerHeight//dims[1]
    scope.install(window)
    scope.setup(canvas);
    const regex = /window\.innerWidth/gi;
    const regex2 = /window\.innerHeight/gi;
    let amendedCode = code.replace(regex,"view.bounds.width").replace(regex2,"view.bounds.height")
    scope.execute(amendedCode)
    scope.activate()
    return () => {
      scope.remove()
    }
  });
  return (
      <div ref={wrapperRef} style={canvasContainerStyle} className="canvasContainer">
        <canvas style={canvasStyle} hidpi="on" id={"canvas-"+id}></canvas>
      </div>
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
