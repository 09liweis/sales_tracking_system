import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <Link to='/'>交易管理</Link>
                <br/>
                <Link to='/items'>商品管理</Link>
            </nav>
        );
    }

}

export default Header;