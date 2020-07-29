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

  toggleHamburger = () => {
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
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="henryvd.com" style={{ width: '188px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              role="menu" tabIndex={0}
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="nav"
              onClick={() => this.toggleHamburger()}
              onKeyPress={console.log}
            >
            </div>
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
