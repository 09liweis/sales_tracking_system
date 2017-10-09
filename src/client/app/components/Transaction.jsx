import React from 'react';
import $ from 'jquery';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const c = this.props.c;
        var items = null;
        if (c.item_name != '') {
            items = JSON.parse(c.item_name).map((item) =>
                <p key={item.id}>{item.name} X {item.sales_quantity}</p>
            );   
        }
        return(
            <tr key={c.id}>
                <th>{c.date}</th>
                <th>{c.location}</th>
                <th>{items}</th>
                <th>{c.quantity}</th>
                <th>{c.payment}</th>
                <th>{c.cost}</th>
                <th>{c.shipping_fee}</th>
                <th>{c.packaging}</th>
                <th className={(c.profit_or_loss < 0) ? 'has-text-danger' : ''}>{c.profit_or_loss}</th>
                <th>{c.status == '0' ? '已发货' : '已收货'}</th>
                <th>{c.remarks}</th>
                <th>
                    <button className="button is-danger" onClick={this.props.editCustomer}>Edit</button>
                </th>
            </tr>
        );
    }
}

export default Transaction;