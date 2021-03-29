import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"

const num = (range) => Math.floor(Math.random()*range)
const ensureHttp = (str) => str && str.indexOf("http")> - 1 ? str : "https://"+ str
const convertTypeNames = (type) => {
  let switcher = {
    "Candusen page": "fun"
  }
  return switcher.hasOwnProperty(type) ? switcher[type] : type
}

const camelCased = (str) => str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });


const slugifyType = (str) => str.replace(/\s+/g, '-').toLowerCase().replace("mix","tape")

const Thumb = ({work,filter}) =>{
  // console.log("work supplied at one", work)
  const fm = work.frontmatter
  const workType = fm.type
  const theClass = " thumb thumb-"+fm.type.split(" ")[0].toLowerCase()
  const img = getImage(work.featuredSharp)
  let bgImg
  try {
    bgImg = convertToBgImage(img)
  } catch (e) {
  }
  switch(workType){
    default:
    return <Link to={work.fields.slug} className={theClass+" wrappler"}>
      <span className="thumb-label color">{workType === 'Candusen page' ? "fun" : workType}</span>
      <p className="thumb-title">{fm.title.replace(".com"," . com")}</p>
      <p className="thumb-description">{fm.description}</p>
      {bgImg ?
        <BackgroundImage
          {...bgImg}
          className="thumb-image"
          preserveStackingContext
          style={{
            backgroundSize: "contain",
            backgroundImage: `url(${bgImg ? '' : img.images.fallback.src})`
          }}
        >
      </BackgroundImage> :
      <GatsbyImage image={img} alt={"we testin"} />
    }


    </Link>
    case "Candusen page":
      return <Link to={work.fields.slug} className={(theClass)+" wrappler"} style={{
          transform: `rotate(${num(20)} translate(${num(40)-20}px,${num(40)-20}px)`
        }}>
        {bgImg ?
          <BackgroundImage
            // Spread bgImage into BackgroundImage:
            {...bgImg}
            className="thumb-image"
            preserveStackingContext
            style={{
              backgroundSize: "contain",
              backgroundImage: `url(${bgImg ? '' : img.images.fallback.src})`
            }}
          >
        </BackgroundImage> :
        <GatsbyImage image={img} alt={"we testin"} />
      }
      </Link>
  }
}

const ThumbLargeThumbs = ({work, filter}) => {
  const fm = work.frontmatter
  const useIframe = fm.url && fm.featured;
  const theClass = " work-box "+slugifyType(fm.type) +
  (!!filter && filter.length > 0  && filter !== slugifyType(fm.type) ? " hide " : " ")+
  (work.firstOfType ? "first " : " ")+ (work.featuredSharp ? "" : " no-image ")+
  (useIframe ? "" : "no-iframe ") + (work.html.length ? "" : " no-html");

    return <Link to={work.fields.slug} className={theClass+" wrappler"}>
      {work.featuredSharp ?
      <GatsbyImage image={getImage(work.featuredSharp)} alt={"Image "} />
      : ""}
      {useIframe ? <iframe title={fm.title} src={ensureHttp(fm.url)}></iframe> : ""}
      {work.html.length ? <div dangerouslySetInnerHTML={{ __html: work.html}}></div> : ""}
      <h2 className="color-text">{fm.title}</h2>
      {fm.description ? <p className="description">{fm.description}</p> : ""}
      <span className="type-label color">{convertTypeNames(fm.type)}</span>
    </Link>
}

export default Thumb
