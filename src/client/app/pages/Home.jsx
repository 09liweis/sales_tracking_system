import React from 'react';
import { Link } from 'react-router-dom';
import { Button, DatePicker, Grid, Cell } from 'react-md';

import Customers from '../Customers.jsx';
import $ from 'jquery';

import {parseDate} from '../utility.js';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            customers: [],
            date: {
                start: '',
                end: ''
            }
        };
        this.getCustomers = this.getCustomers.bind(this);
    }
    componentDidMount() {
        this.getCustomers();
    }
    handleStartDateChange(v) {
        const date = parseDate(v);
        let dateState = this.state.date;
        dateState.start = date;
        this.setState({
            date: dateState
        });
    }
    handleEndDateChange(v) {
        const date = parseDate(v);
        let dateState = this.state.date;
        dateState.end = date;
        this.setState({
            date: dateState
        });
    }
    getCustomers() {
        const _this = this;
        $.ajax({
            url: '/controllers/customers.php?action=getCustomers',
            data: {date: _this.state.date},
            success(res) {
                _this.setState({
                    customers: res
                });
            }
        });
    }
    render() {
        const {customers, date} = this.state;
        var total_payment = 0.0;
        var total_cost = 0.0;
        var total_shipping = 0.0;
        var total_packaging = 0.0;
        var total_profit_or_loss = 0.0;
        customers.map((c) => {
            total_payment += parseFloat(c.payment);
            total_cost += parseFloat(c.cost);
            total_shipping += parseFloat(c.shipping_fee);
            total_packaging += parseFloat(c.packaging);
            total_profit_or_loss += parseFloat(c.profit_or_loss);
        });
        return (
            <div>
                <Button flat primary swapTheming><Link to="/transaction/add">添加交易</Link></Button>
                
                <Grid>
                    <Cell size={2}>
                    <DatePicker
                        id="inline-date-picker-portait"
                        label="选择开始日期"
                        inline
                        displayMode="portrait"
                        fullWidth={false}
                        name="start"
                        value={date.start}
                        onChange={this.handleStartDateChange.bind(this)}
                        formatOptions={{year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',}}
                    />
                    </Cell>
                    <Cell size={2}>
                    <DatePicker
                        id="inline-date-picker-portait"
                        label="选择结束日期"
                        inline
                        displayMode="portrait"
                        fullWidth={false}
                        name="end"
                        value={date.end}
                        onChange={this.handleEndDateChange.bind(this)}
                        formatOptions={{year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',}}
                    />
                    </Cell>
                    <Cell size={2}>
                        <Button flat primary swapTheming onClick={this.getCustomers}>搜索</Button>
                    </Cell>
                    <Cell size={3}>
                        <h3>总交易: {total_payment.toFixed(2)} </h3>
                        <h3>总成本: {total_cost.toFixed(2)}</h3>
                        <h3>总运费: {total_shipping.toFixed(2)}</h3>
                        <h3>总包装: {total_packaging.toFixed(2)}</h3>
                        <h3>总盈亏: {total_profit_or_loss.toFixed(2)}</h3>
                    </Cell>
                </Grid>
                
                <Customers customers={customers} />
            </div>
        );
    }
}
export default Home;