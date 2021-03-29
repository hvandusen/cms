import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/ellsworth-shape-logo-padding.png'


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
        <Link to="/" className="navbar-item" title="henry van dusen homepage">
          <div className="nav-icon"
          role="menu" tabIndex={0}
          data-target="nav"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"

          }}
          onClick={() => this.toggleMenu()}
          onKeyPress={console.log}
          ></div>
        </Link>
        <Link to="/" id="nav-main-link" className="navbar-item" title="henry van dusen homepage"><h5 className="header"><span>H</span><span>e</span><span>n</span><span>r</span><span>y</span><span> </span><span>V</span><span>a</span><span>n</span><span> </span><span>D</span><span>u</span><span>s</span><span>e</span><span>n</span></h5></Link>
        <div className="container">
          <div className="navbar-brand">

          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
