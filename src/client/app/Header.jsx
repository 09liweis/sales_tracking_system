import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">
                        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                    </Link>
                    
                    <button className="button navbar-burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-head">
                        <Link to='/items'>Items</Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="button is-primary">
                                        what ever
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

}

export default Header;