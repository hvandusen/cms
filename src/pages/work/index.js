import React from 'react'
import Layout from '../../components/Layout'
import CandusenList from '../../components/CandusenList'

export default class WorkIndexPage extends React.Component {
  render() {
    return (
      <Layout>
          <div className="container">
            <div className="content">
              <CandusenList />
            </div>
          </div>
      </Layout>
    )
  }
}
