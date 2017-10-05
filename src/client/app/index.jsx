import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import Header from './Header.jsx';
import Customers from './Customers.jsx';
import Form from './Form.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            customers: [],
            customer: {
                id: 0,
                date: '2017-10-4',
                location: 'guangzhou',
                item_name: 'item name',
                quantity: 3,
                payment: 3.0,
                cost: 1.0,
                shipping_fee: 4.0,
                packaging: 2,
                profit_or_loss: 43,
                status: 'shipped',
                remarks: 'someting'
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const activeModal = this.state.modal ? 'modal is-active' : 'modal';
        return (
            <div>
                <Header addCustomer={this.addCustomer} />
                <div className={activeModal}>
                    <div className="modal-background" onClick={this.closeModal}></div>
                    <div className="modal-content">
                        <Form customer={this.state.customer} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
                </div>
                <div className="container">
                    <Customers customers={this.state.customers} editCustomer={this.editCustomer} />
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));