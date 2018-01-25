import React from 'react';
import $ from 'jquery';

import { DatePicker, TextField, SelectionControl } from 'react-md';


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: {
                id: props.match.params.id || 0,
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
            },
            items: [],
            searchItems: [],
            hideItems: true,
            salesItems: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.removeSalesItem = this.removeSalesItem.bind(this);
        this.calculate = this.calculate.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
    }
    componentDidMount() {
        const _this = this;
        $.ajax({
            url: '/controllers/items.php?action=getItems',
            success(res) {
                _this.setState({
                    items: res
                });
            }
        });
        const id = this.state.customer.id;
        if (id != 0) {
            this.getTransaction(id);
        }
    }
    componentWillReceiveProps(nextProps) {
        const items = nextProps.customer.item_name;
        if (typeof items != 'undefined' && items != '') {
            this.setState({
                salesItems: JSON.parse(items)
            });
        }
        this.setState({
            customer: nextProps.customer,
        });
    }
    getTransaction(id) {
        const _this = this;
        $.ajax({
            url: '/controllers/customers.php?action=getCustomer',
            data: {id: id},
            method: 'GET',
            success(res) {
                console.log(res);
                _this.setState({
                    customer: res
                });
            }
        });
    }
    handleChange(v, e) {
        const property = e.target.name;
        const customer = this.state.customer;
        customer[property] = v;
        this.setState({
            customer: customer
        });
    }
    onDateChange(val) {
        const dateArray = val.split('/');
        const date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
        const e = {
            target: {
                name: 'date',
                value: date
            }
        };
        this.handleChange(date, e);
    }
    searchItem(e) {
        const name = e.target.value;
        var searchItems = [];
        this.state.items.map((item) => {
            if (item.name.indexOf(name) != -1) {
                searchItems.push(item);
            }
        });
        this.setState({
            searchItems: searchItems,
            hideItems: false
        });
    }
    addItem(item) {
        var salesItems = this.state.salesItems;
        item.sales_quantity = 0;
        salesItems.push(item);
        this.setState({
            salesItems: salesItems,
            hideItems: true
        });
    }
    removeSalesItem(item) {
        var salesItems = [];
        this.state.salesItems.map((s) => {
            if (s.id != item.id) {
                salesItems.push(s);
            }
        });
        this.setState({
            salesItems: salesItems
        });
        this.calculate();
    }
    changeQuantity(item, e) {
        const value = e.target.value;
        item.sales_quantity = value;
        var salesItems = this.state.salesItems;
        for (var i = 0; i < salesItems.length; i++) {
            if (salesItems[i].id == item.id) {
                salesItems[i] = item;
            }
        }
        this.setState({
            salesItems: salesItems
        });
        this.calculate();
    }
    calculate() {
        var customer = this.state.customer;
        var total_cost = 0;
        var total_sales = 0;
        var total_quantity = 0;
        this.state.salesItems.map((item) => {
            total_cost += (item.cost * item.sales_quantity).toFixed(2);
            total_sales += (item.retail * item.sales_quantity).toFixed(2);
            total_quantity += parseInt(item.sales_quantity);
        });
        customer.payment = total_sales.toFixed(2);
        customer.cost = total_cost.toFixed(2);
        customer.quantity = total_quantity;
        this.setState({
            customer: customer
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var c = this.state.customer;
        c.item_name = this.state.salesItems;
        c.profit_or_loss = c.payment - c.cost - c.shipping_fee - c.packaging;
        c.item_name = JSON.stringify(c.item_name);
        const _this = this;
        $.ajax({
            url: '/controllers/customers.php?action=upsertCustomer',
            method: 'POST',
            data: c,
            success(res) {
                _this.props.history.push('/');
            }
        });
    }
    render() {
        const c = this.state.customer;
        var profit_or_loss = (c.payment - c.cost - c.shipping_fee - c.packaging).toFixed(2);
        const _this = this;
        const options = this.state.searchItems.map((item) => 
            <li key={item.id} onClick={_this.addItem.bind(_this, item)}>{item.name}</li>
        );
        const salesItems = this.state.salesItems.map((item) =>
            <div key={item.id}>
                <h5>{item.name}</h5>
                <button onClick={_this.removeSalesItem.bind(_this, item)}>Remove</button>
                <p>Cost: {item.cost}</p>
                <p>Retail: {item.retail}</p>
                <input type="number" className="input" value={item.sales_quantity} onChange={_this.changeQuantity.bind(_this, item)}  />
                <p>Total Cost: {parseFloat(item.cost).toFixed(2) * item.sales_quantity}</p>
                <p>Total Retail: {parseFloat(item.retail).toFixed(2) * item.sales_quantity}</p>
            </div>
        );
        return (
            <form className="box" autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="columns">
                    <div className="column">
                        <div className="Search">
                            <label>搜素商品</label>
                            <input className="input" type="text" onChange={this.searchItem} />
                            <ul className={this.state.hideItems ? 'is-hidden' : ''}>
                            {options}
                            </ul>
                        </div>
                        {salesItems}
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Date</label>
                            <DatePicker
                                id="appointment-date-portrait"
                                label="Portrait mode"
                                className="md-cell"
                                displayMode="portrait"
                                value={c.date}
                                onChange={this.onDateChange}
                                formatOptions={{year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',}}
                            />
                        </div>
                        <TextField
                            id="quantity"
                            label="数量"
                            name="quantity"
                            value={c.quantity}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="payment"
                            label="Payment"
                            name="payment"
                            value={c.payment}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="cost"
                            label="Cost"
                            name="cost"
                            value={c.cost}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="shipping_fee"
                            label="运费"
                            name="shipping_fee"
                            value={c.shipping_fee}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="packaging"
                            label="包装费"
                            name="packaging"
                            value={c.packaging}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="profit_or_loss"
                            label="盈亏"
                            name="profit_or_loss"
                            value={profit_or_loss}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="location"
                            label="地址"
                            name="location"
                            value={c.location}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <SelectionControl
                            id="status"
                            type="switch"
                            label="已发货"
                            name="status"
                            value={c.status}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="remarks"
                            label="备注"
                            name="remarks"
                            value={c.remarks}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                    </div>
                </div>
                <div className="">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
        );
    }
}

export default Form;