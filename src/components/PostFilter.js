import React, {useState} from 'react'
import GetWorks from '../hooks/GetWorks'


const slugifyTypez = (str) => str.replace(/\s+/g, '-').toLowerCase().replace("-"," ").split(" ")[0]
const slugifyType = (str) => str.split("-")[0].toLowerCase()
let filter;
const PostFilter = ({works, setFilter}) => {
  const handleFilter = (e) => setFilter(slugifyType(e.currentTarget.textContent))
  const allWorks = works.slice()
  const published = allWorks.filter( w => !w.frontmatter.draft)
  const categories = published.map((work) => work.frontmatter.type).filter((e,i,self) => self.indexOf(e) === i)
  return (<div role="form" key={1} className="project-nav">
  <span key={1} className="filter-header">Filter projects by category:</span>
  <div key={2} className="filter-buttons">
    {categories.map((cat,i) =>
      <span tabIndex={i} role="button"  key={i+2} onKeyDown={handleFilter} onClick={handleFilter} className={"project-category project-category-"+slugifyType(cat)}>{cat}</span>
    )}</div>
  </div>)
}

export default PostFilter
