import React from 'react';
import { Link } from 'react-router-dom';

import Customers from '../Customers.jsx';
import $ from 'jquery';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            customers: [],
            customer: {}
        };
    }
    componentDidMount() {
        this.getCustomers();
    }
    getCustomers() {
        const _this = this;
        $.ajax({
            url: '/controllers/customers.php?action=getCustomers',
            success(res) {
                _this.setState({
                    customers: res
                });
            }
        });
    }
    render() {
        return (
            <div>
                <Link to="/transaction/add" className="button">Add</Link>
                <Customers customers={this.state.customers} />
            </div>
        );
    }
}
export default Home;