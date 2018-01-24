import React from 'react';
import { Link } from 'react-router-dom';

import Customers from './Customers.jsx';
import $ from 'jquery';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            customers: [],
            customer: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
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
    addCustomer() {
        this.setState({
            modal: true
        });
    }
    editCustomer(customer) {
        this.setState({
            modal: true,
            customer: customer
        });
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    handleSubmit(c) {
        c.profit_or_loss = c.payment - c.cost - c.shipping_fee - c.packaging;
        c.item_name = JSON.stringify(c.item_name);
        const _this = this;
        $.ajax({
            url: 'controllers/customers.php?action=upsertCustomer',
            method: 'POST',
            data: c,
            success(res) {
                _this.closeModal();
            }
        });
    }
    render() {
        return (
            <div>
                <Link to="/add" className="button" onClick={this.addCustomer}>Add</Link>
                <Customers customers={this.state.customers} editCustomer={this.editCustomer} />
            </div>
        );
    }
}
export default Home;