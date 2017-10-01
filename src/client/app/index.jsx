import React from 'react';
import {render} from 'react-dom';

import Header from './Header.jsx';
import Customers from './Customers.jsx';
import Form from './Form.jsx';

class App extends React.Component {
    render () {
        return (
            <div>
                <Header />
                <Form />
                <Customers />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));