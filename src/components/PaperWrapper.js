import React, {  useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link, navigate } from 'gatsby'
import Content from './Content'
import install from './paperUtils'
import arrows from "../img/arrows.png"

let paper
let paperLoaded = false;



const canvasContainerStyle = {
  position: "relative"
}

const canvasStyle = {
  height: "100%",
  width: "100%"
}

const keyhandler = console.log

const PaperWrapper = ({
  id,
  html,
  contentComponent,
  description,
  images,
  featuredimage,
  tags,
  title,
  code,
  fullscreen
}) => {
  const PostContent = contentComponent || Content
  let [delay, setDelay] = useState(false);
  let [helpToggle, setHelpToggle] = useState([true,true]); //currently showing, currently first time showing
  let helpAutohideTimeout;
  const toggleHelp = () => {
    clearTimeout(helpAutohideTimeout)
    setHelpToggle([!helpToggle[0],false])
  }
  let wrapperRef = React.createRef()
  useEffect(() => {
    if(helpToggle[1] && false)
    helpAutohideTimeout = setTimeout(()=>{
      setHelpToggle([false,false])
    },3000)
    if(typeof window !== "undefined" && typeof window.paper !== "undefined"){
      paper = window.paper
      var scope = new paper.PaperScope()
      install(window,scope)
      const script = document.createElement('script');
      script.type= "text/javascript"
      const canvas = document.getElementById('canvas-'+id)
      canvas.width = wrapperRef.current ? wrapperRef.current.offsetWidth : window.innerWidth
      canvas.height = wrapperRef.current ? wrapperRef.current.offsetHeight : window.innerHeight
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
    }
  });

  return (
      <div ref={wrapperRef} style={canvasContainerStyle} className="canvasContainer" >
        <div className={`help-container ${helpToggle[0] ? "active" : ""}`}>
          <div className="help">
            <h3>use<img className="arrows" src={arrows}></img> to browse</h3>
            <h3>press &nbsp;<span className="key">D</span> to download</h3>
          </div>
          <h3 className="toggle" onClick={toggleHelp}>*help*</h3>
        </div>
        <canvas style={canvasStyle} hidpi="on" id={"canvas-"+id} className={"fullscreen"}></canvas>
      </div>
  )
}

PaperWrapper.propTypes = {
  html: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

export default PaperWrapper
