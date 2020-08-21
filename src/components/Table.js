import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { graphql, StaticQuery, Link } from 'gatsby'

const slug = (string) => string.replace(/ /g,'-').toLowerCase()
const colorMap = {
  "candusen-page": "red",
  "client-site": "green",
  "software": "blue",
  "website": "orange",
  "print": "purple",
  "essay": "yellow",
}
const wrapH = (priority) => ({ value }) => {
  let Wrap = `h${priority}`
 return <Wrap>{value}</Wrap>
}
 const Table = ({tableRows,filter}) => {
   let nodes = tableRows.allMarkdownRemark.edges
   const data = React.useMemo(
     () => nodes.map( ({node: work},i) => ({
       title: {
         slug: work.fields.slug,
         title: work.frontmatter.title
       },
       date: work.frontmatter.date,
       type: work.frontmatter.type
     })
   ),[])

   const columns = React.useMemo(
     () => [
       {
         Header: 'Title',
         accessor: 'title', // accessor is the "key" in the data
         sortType: (rowA, rowB) => {
           console.log(rowA,rowB)
           return rowA.values.title.title.toLowerCase() >
                  rowB.values.title.title.toLowerCase() ? 1: -1;
         },
         Cell: ({ value }) => {
          return <Link to={value.slug}><h3>{value.title}</h3></Link>
         }
       },
       {
         Header: 'Date',
         accessor: 'date',
         // Cell: wrapH(6)
       },
       {
         Header: 'Type',
         accessor: 'type',
         // Cell: wrapH(6),
         sortType: (rowA, rowB) => {
           return rowA.values.type.toLowerCase() >
                  rowB.values.type.toLowerCase() ? 1: -1;
         },
       },
     ],
     []
   )

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data }, useSortBy)

   return (
     <table className="spreadsheet" {...getTableProps()} >
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 style={{
                   // borderBottom: 'solid 3px red',
                   color: 'black',
                   fontWeight: 'normal',
                 }}
               >
                 {column.render('Header')}
                 <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()} style={{
                 background: colorMap[slug(row.values.type)]
               }} className={slug(row.values.type)}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray'
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   )
 }

 export default () => (
   <StaticQuery
     query={graphql`
       query allWorks {
        allMarkdownRemark(filter: {fields: {slug: {regex: "/work/"}}}) {
          edges {
            node {
              id
              html
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                featuredimage
                tags
                type
              }
              fields {
                slug
              }
            }
          }
        }
      }
     `}
     render={(data) => <Table tableRows={data} />}
   />
 )
