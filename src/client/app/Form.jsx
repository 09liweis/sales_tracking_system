import React from 'react';
import $ from 'jquery';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.customer,
            items: [],
            searchItems: [],
            hideItems: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.addItem = this.addItem.bind(this);
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
        console.log(item);
        this.setState({
            hideItems: true
        })
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
                            <ul className={this.hideItems ? 'is-hidden' : ''}>
                            {options}
                            </ul>
                        </div>
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