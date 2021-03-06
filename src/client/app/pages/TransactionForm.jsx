import React from 'react';
import $ from 'jquery';

import { DatePicker, TextField, SelectField, Grid, Cell, List, ListItem, Card } from 'react-md';

import {parseDate} from '../utility.js';

class TransactionForm extends React.Component {

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
                other_fee: '',
                cost: '',
                shipping_fee: '',
                packaging: '',
                profit_or_loss: '',
                status: '0',
                remarks: ''
            },
            items: [],
            searchItems: [],
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
                    items: res,
                    searchItems: res
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
            url: '/controllers/customers.php?action=getTransaction',
            data: {id: id},
            method: 'GET',
            success(res) {
                if (res.date == '0000-00-00') {
                    res.date = '';
                }
                _this.setState({
                    customer: res,
                    salesItems: JSON.parse(res.item_name)
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
        console.log(val);
        const date = parseDate(val);
        const e = {
            target: {
                name: 'date',
                value: date
            }
        };
        this.handleChange(date, e);
    }
    handleStatusChange(v) {
        let customer = this.state.customer;
        customer.status = v;
        this.setState({
            customer: customer
        });
    } 
    searchItem(v, e) {
        var searchItems = [];
        this.state.items.map((item) => {
            if (item.name.indexOf(v) != -1) {
                searchItems.push(item);
            }
        });
        this.setState({
            searchItems: searchItems,
        });
    }
    addItem(item) {
        var salesItems = this.state.salesItems;
        item.sales_quantity = 0;
        salesItems.push(item);
        this.setState({
            salesItems: salesItems,
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
            let quantity = parseInt(item.sales_quantity, 10);
            total_cost += (parseFloat(item.cost) * quantity);
            total_sales += (parseFloat(item.retail) * quantity);
            total_quantity += quantity;
        });
        customer.payment = parseFloat(total_sales).toFixed(2);
        customer.cost = parseFloat(total_cost).toFixed(2);
        customer.quantity = total_quantity;
        this.setState({
            customer: customer
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var c = this.state.customer;
        c.item_name = this.state.salesItems;
        c.item_name = JSON.stringify(c.item_name);
        const total_payment = parseFloat(c.payment) + parseFloat(c.other_fee);
        c.profit_or_loss = (total_payment - c.cost - c.shipping_fee - c.packaging).toFixed(2);
        const _this = this;
        $.ajax({
            url: '/controllers/customers.php?action=upsert',
            method: 'POST',
            data: c,
            success(res) {
                _this.props.history.push('/transactions');
            }
        });
    }
    render() {
        const c = this.state.customer;
        const total_payment = parseFloat(c.payment) + parseFloat(c.other_fee);
        var profit_or_loss = (total_payment - c.cost - c.shipping_fee - c.packaging).toFixed(2);
        const _this = this;
        const options = this.state.searchItems.map((item) => 
            <ListItem primaryText={item.name} key={item.id} onClick={_this.addItem.bind(_this, item)} />
        );
        const salesItems = this.state.salesItems.map((item) =>
            <Card key={item.id} style={{padding: '10px', marginBottom: '10px'}}>
                <h5>{item.name}</h5>
                <button style={{float: 'right'}} onClick={_this.removeSalesItem.bind(_this, item)}>移除此商品</button>
                <p>成本价: {item.cost}</p>
                <p>零售价: {item.retail}</p>
                增减数量: <input type="number" className="input" value={item.sales_quantity} onChange={_this.changeQuantity.bind(_this, item)}  />
                <p>总成本价: {parseFloat(item.cost).toFixed(2) * item.sales_quantity}</p>
                <p>总零售价: {parseFloat(item.retail).toFixed(2) * item.sales_quantity}</p>
            </Card>
        );
        return (
            <form className="box" autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid>
                    <Cell size={6}>
                        <Grid>
                            <Cell size={6}>
                                <div className="Search">
                                    <TextField
                                        id="search"
                                        label="搜素商品"
                                        onChange={this.searchItem}
                                        lineDirection="center"
                                        className="md-cell md-cell--bottom"
                                    />
                                    <List>
                                    {options}
                                    </List>
                                </div>
                            </Cell>
                            <Cell size={6}>
                                {salesItems}
                            </Cell>
                        </Grid>
                    </Cell>
                    <Cell size={6}>
                        {/*
                        <div className="field">
                            <label className="label">Date</label>
                            <DatePicker
                                id="appointment-date-portrait"
                                label="交易日期"
                                className="md-cell"
                                displayMode="portrait"
                                value={c.date}
                                onChange={this.onDateChange}
                                formatOptions={{year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',}}
                            />
                        </div>
                         */}
                        <TextField
                            id="date"
                            label="交易日期(格式: yyyy-mm-dd)"
                            name="date"
                            value={c.date}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
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
                            label="总(付款)零售"
                            name="payment"
                            value={c.payment}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="other_fee"
                            label="其他费用"
                            name="other_fee"
                            value={c.other_fee}
                            onChange={this.handleChange}
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                        />
                        <TextField
                            id="cost"
                            label="总成本"
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
                        <SelectField
                            id="status"
                            placeholder="Placeholder"
                            className="md-cell"
                            label="已发货"
                            name="status"
                            value={c.status}
                            onChange={this.handleStatusChange.bind(this)}
                            menuItems={[{value: 0, label: '未发货'}, {value: 1, label: '已发货'}, {value: 2, label: '已收货'}]}
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
                        <button className="button is-primary">Submit</button>
                    </Cell>
                </Grid>
            </form>
        );
    }
}

export default TransactionForm;