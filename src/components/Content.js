import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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

export const Blocks = ({ postContent, images }) => {
  let imagesUsed = 0;
  console.log(postContent)
  return postContent.map((block,i) => {
    switch (block.type) {
      case "text":
        return <div key={i} onClick={clickedContent} className={"block block-text"}>text</div>
        break;
      case "figure":
        if(block.image[0].indexOf("mp4")>-1){
          return <div key={i} onClick={clickedContent} className={"block block-video"}>video</div>
        } else {
          return <div key={i} className='caption-container image-caption block block-image'>
              <GatsbyImage image={images[imagesUsed++].childImageSharp.gatsbyImageData} alt="" />
            {block.caption && <div class='caption'>{block.caption}</div>}
            </div>
        }
        break;

      case "code":
        return <div key={i} onClick={clickedContent} className={"block block-code"}>code</div>
        break;
      default:

    }
  }

  )
}


Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
