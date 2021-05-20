import React from 'react'
import PropTypes from 'prop-types'

export const clickedContent = (e) => {
  console.log("We clicked content baby",e.target)
  const {target} = e;
  if(target.play){
    target.play()
    target.parentElement.className = target.parentElement.className+" clicked"
  }
}

export const HTMLContent = ({ content, className }) => (
  <div onClick={clickedContent} className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content, className }) => {
  console.log(content)
  return (
  <div onClick={clickedContent} className={className}>{content}</div>
  )
}

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
