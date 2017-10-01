import React from 'react';
import axios from 'axios';

import $ from 'jquery';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: {
                id: 0,
                year: 2017,
                month: 9,
                day: 30,
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
    handleSubmit(e) {
        e.preventDefault();
        const customer = this.state.customer;
        // axios.post('/controllers/customers.php?action=upsertCustomer', customer)
        // .then(function(res) {
        //     console.log(res);
        // });
        $.ajax({
            url: 'controllers/customers.php?action=upsertCustomer',
            method: 'POST',
            data: customer,
            success() {
                
            }
        });
    }
    render() {
        const customer = this.state.customer;
        const _this = this;
        var inputs = Object.keys(customer).map(function(property) {
            var value = customer[property];
            return (
                <div className="field column is-2" key={property}>
                    <label className="label">{property}</label>
                    <div className="control">
                        <input className="input" type="text" name={property} value={value} onChange={_this.handleChange.bind(_this)} />
                    </div>
                </div>
            );
        });
        return (
            <form className="columns is-multiline" onSubmit={this.handleSubmit.bind(this)}>
                {inputs}
                <button className="button is-primary">Submit</button>
            </form>
        );
    }

}

export default Form;