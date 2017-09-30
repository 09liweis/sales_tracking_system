import React from 'react';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="http://bulma.io">
                    <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                </a>
                
                <button className="button navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
  }

}

export default Header;