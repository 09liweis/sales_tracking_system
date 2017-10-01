import React from 'react';
import $ from 'jquery';

class Customers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: this.props.customers
        };
    }

    render() {
        const _this = this;
        const customers = this.props.customers.map(function(c) {
            return (
                <tr key={c.id}>
                    <th>{c.year}-{c.month}-{c.day}</th>
                    <th>{c.location}</th>
                    <th>{c.item_name}</th>
                    <th>{c.quantity}</th>
                    <th>{c.payment}</th>
                    <th>{c.cost}</th>
                    <th>{c.shipping_fee}</th>
                    <th>{c.packaging}</th>
                    <th>{c.profit_or_loss}</th>
                    <th>{c.status}</th>
                    <th>{c.remarks}</th>
                    <th>
                        <button className="button is-danger" onClick={_this.props.editCustomer.bind(_this, c)}>Edit</button>
                    </th>
                </tr>
            );
        });
        return (
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>买家所在地</th>
                        <th>出售商品</th>
                        <th>数量</th>
                        <th>买家付款</th>
                        <th>成本</th>
                        <th>运费</th>
                        <th>包装</th>
                        <th>盈亏</th>
                        <th>状态</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {customers}
                </tbody>
            </table>
        );
    }

}

export default Customers;