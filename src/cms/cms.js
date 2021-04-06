import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

// import AboutPagePreview from './preview-templates/AboutPagePreview'
// import BlogPostPreview from './preview-templates/BlogPostPreview'
// import ProductPagePreview from './preview-templates/ProductPagePreview'
// import IndexPagePreview from './preview-templates/IndexPagePreview'
// import PaperPagePreview from './preview-templates/PaperPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerEditorComponent({
  // Internal id of the component
  id: "imgcaption",
  // Visible label
  label: "Img + Caption",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {name: 'img', label: 'Image', widget: 'image'},
  {name: 'caption', label: 'Caption', widget: 'text'}],
  // Pattern to identify a block as being an instance of this component
  pattern: /^caption (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log("match", match)
    const attempt = {
      caption: match[1].split("~")[0],
      img: match[1].split("~")[1]
    }
    console.log("attempt: ", attempt)
    return attempt;
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<div class='imgcaption'><img src=${obj.img}></img><div class='caption'>${obj.caption}</div></div>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      obj.caption
    );
  }
});

// CMS.registerPreviewTemplate('index', IndexPagePreview)
// CMS.registerPreviewTemplate('about', AboutPagePreview)
// CMS.registerPreviewTemplate('products', ProductPagePreview)
// // CMS.registerPreviewTemplate('work', PaperPagePreview)
// CMS.registerPreviewTemplate('blog', BlogPostPreview)
