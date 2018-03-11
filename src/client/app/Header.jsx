import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-md';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <Button flat primary swapTheming><Link to='/'>交易管理</Link></Button>
                <Button flat primary swapTheming><Link to='/items'>商品管理</Link></Button>
            </nav>
        );
    }

}

export default Header;