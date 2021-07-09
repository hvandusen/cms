import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from 'gatsby'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <script src={`${withPrefix('/')}paper-full.min.v0.12.15.js`}></script>
        <script src={`https://code.jquery.com/jquery-3.6.0.min.js`}></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EQH20J0HNS"></script>
        <script type="text/javascript"   dangerouslySetInnerHTML={{ __html: `
          if(!!window || typeof window !== "undefined"){
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments)
            };
            if(dataLayer){
              gtag('js', new Date());
              gtag('config', 'G-EQH20J0HNS');
            }
          }
          ` }}>
        </script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
