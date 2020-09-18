import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleMenu = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className={`navbar is-transparent ${this.state.navBarActiveClass}`}
        role="navigation"
        aria-label="main-navigation"
      >
        <Link to="/" className="navbar-item" title="Logo"><div className="nav-icon"
          role="menu" tabIndex={0}
          data-target="nav"
          onClick={() => this.toggleMenu()}
          onKeyPress={console.log}
          ></div></Link>
        <h5 className="header">henry van dusen</h5>
        <div className="container">
          <div className="navbar-brand">
            {/* Menu menu */}
          </div>
          <div
            id="nav"
            className={`navbar-menu ${this.state.navBarActiveClass}`}>
            <div className="navbar-start">
              <Link activeClassName="active" className="navbar-item" to="/">
                All
              </Link>
              <Link activeClassName="active" className="navbar-item" to="/work">
                Web
              </Link>
              <Link activeClassName="active" className="navbar-item" to="/candusen">
                Art
              </Link>
              <Link activeClassName="active" className="navbar-item" to="/contact/examples">
                Music
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
