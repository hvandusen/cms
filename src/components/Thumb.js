import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
const ensureHttp = (str) => str.indexOf("http")> - 1 ? str : "http://"+ str
const convertTypeNames = (type) => {
  let switcher = {
    "Candusen page": "fun"
  }
  return switcher.hasOwnProperty(type) ? switcher[type] : type
}

const slugifyType = (str) => str.replace(/\s+/g, '-').toLowerCase().replace("mix","tape")

const Thumb = ({work, filter,image}) =>{
  const fm = work.frontmatter
    const useIframe = fm.url && fm.featured;
    const theClass = " work-box "+slugifyType(fm.type) +
    (!!filter && filter.length > 0  && filter !== slugifyType(fm.type) ? " hide " : " ")+
    (work.firstOfType ? "first " : " ")+ (work.featuredSharp ? "" : " no-image ")+
    (useIframe ? "" : "no-iframe ") + (work.html.length ? "" : " no-html");

    return <Link to={work.fields.slug} className={theClass+" wrappler"}>


      {work.featuredSharp ?
      <GatsbyImage image={getImage(work.featuredSharp)} alt={"Image "} />
      // <BackgroundImage className="project-img "
      //   style={{
      //     backgroundSize: "contain",
      //     paddingBottom: (100/work.featuredSharp.childImageSharp.fluid.aspectRatio)+"%"
      //   }}
      //   fluid={work.featuredSharp.childImageSharp.fluid}
      //   alt={fm.description}/>
      : ""}


      {useIframe ? <iframe title={fm.title} src={ensureHttp(fm.url)}></iframe> : ""}


      {work.html.length ? <div dangerouslySetInnerHTML={{ __html: work.html}}></div> : ""}


      <h2 className="color-text">{fm.title}</h2>


      {fm.description ? <p className="description">{fm.description}</p> : ""}

      <span className="type-label color">{convertTypeNames(fm.type)}</span>
    </Link>
}

export default Thumb
