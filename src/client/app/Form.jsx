import React from 'react';
import $ from 'jquery';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.customer,
            items: [],
            searchItems: [],
            hideItems: true,
            salesItems: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
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
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            customer: nextProps.customer
        });
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
    changeQuantity(item, e) {
        const value = e.target.value;
        item.sales_quantity = value;
        var salesItems = this.state.salesItems;
        for (var i = 0; i < salesItems.length; i++) {
            if (salesItems[i].id == item.id) {
                salesItems[i] = item;
            }
        }
        var customer = this.state.customer;
        var total_cost = 0;
        var total_sales = 0;
        salesItems.map((item) => {
            total_cost += item.cost * item.sales_quantity;
            total_sales += item.retail * item.sales_quantity;
        });
        customer.payment = total_sales.toFixed(2);
        customer.cost = total_cost.toFixed(2);
        
        this.setState({
            customer: customer,
            salesItems: salesItems
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const customer = this.state.customer;
        this.props.handleSubmit(customer);
    }
    render() {
        const c = this.state.customer;
        var profit_or_loss = c.payment - c.cost - c.shipping_fee - c.packaging;
        const _this = this;
        const options = this.state.searchItems.map((item) => 
            <li key={item.id} onClick={_this.addItem.bind(_this, item)}>{item.name}</li>
        );
        const salesItems = this.state.salesItems.map((item) =>
            <div key={item.id}>
                <h5>{item.name}</h5>
                <p>Cost: {item.cost}</p>
                <p>Retail: {item.retail}</p>
                <input type="number" className="input" onChange={_this.changeQuantity.bind(_this, item)}  />
                <p>Total Cost: {parseFloat(item.cost).toFixed(2) * item.sales_quantity}</p>
                <p>Total Retail: {parseFloat(item.retail).toFixed(2) * item.sales_quantity}</p>
            </div>
        );
        return (
            <form className="box" autoComplete="off" onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" value={c.id} />
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Item Name</label>
                            <div className="control">
                                <input className="input" type="text" name="item_name" value={c.item_name} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        
                        <div className="Search">
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
                            <div className="control">
                                <input className="input" type="text" name="date" value={c.date} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Quantity</label>
                            <div className="control">
                                <input className="input" type="text" name="quantity" value={c.quantity} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Payment</label>
                            <div className="control">
                                <input className="input" type="text" name="payment" value={c.payment} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Cost</label>
                            <div className="control">
                                <input className="input" type="text" name="cost" value={c.cost} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Shipping Fee</label>
                            <div className="control">
                                <input className="input" type="text" name="shipping_fee" value={c.shipping_fee} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Packing</label>
                            <div className="control">
                                <input className="input" type="text" name="packaging" value={c.packaging} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Profile or Loss</label>
                            <div className="control">
                                <input className="input" type="text" name="profit_or_loss" value={profit_or_loss} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Status</label>
                            <div className="control">
                                <input className="input" type="text" name="status" value={c.status} onChange={this.props.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Remarks</label>
                            <div className="control">
                                <input className="input" type="text" name="remarks" value={c.remarks} onChange={this.props.handleChange} />
                            </div>
                        </div>
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