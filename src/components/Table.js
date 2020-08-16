import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { graphql, StaticQuery, Link } from 'gatsby'

 const Table = ({tableRows,filter}) => {
   let nodes = tableRows.allMarkdownRemark.edges
   const data = React.useMemo(
     () => nodes.map( ({node: work},i) => ({
       col1: {
         slug: work.fields.slug,
         title: work.frontmatter.title
       },
       col2: work.frontmatter.date,
       col3: work.frontmatter.type
     })
   ),[])

   const columns = React.useMemo(
     () => [
       {
         Header: 'Title',
         accessor: 'col1', // accessor is the "key" in the data
         sortType: (rowA, rowB) => {
           console.log(rowA,rowB)
           return Math.random() > .5 ? 1: -1;
         },
         Cell: ({ value }) => {
          return <Link to={value.slug}>{value.title}</Link>
         }
       },
       {
         Header: 'Date',
         accessor: 'col2',
       },
       {
         Header: 'Type',
         accessor: 'col3',
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
     <table className="spreadsheet" {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 style={{
                   borderBottom: 'solid 3px red',
                   color: 'black',
                   fontWeight: 'bold',
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
             <tr {...row.getRowProps()}>
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
