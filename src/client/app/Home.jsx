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
        this.handleChange = this.handleChange.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.setEmptyCustomer = this.setEmptyCustomer.bind(this);
    }
    componentDidMount() {
        this.getCustomers();
    }
    setEmptyCustomer() {
        this.setState({
            customer: {
                id: 0,
                date: '',
                location: '',
                item_name: '',
                quantity: '',
                payment: '',
                cost: '',
                shipping_fee: '',
                packaging: '',
                profit_or_loss: '',
                status: '0',
                remarks: ''
            }
        });
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
    handleChange(event) {
        const property = event.target.name;
        const value = event.target.value;
        const customer = this.state.customer;
        customer[property] = value;
        this.setState({
            customer: customer
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
                _this.setEmptyCustomer();
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