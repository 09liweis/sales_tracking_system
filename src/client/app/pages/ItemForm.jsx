import React from 'react';
import $ from 'jquery';

import { DatePicker, TextField, SelectionControl, Grid, Cell } from 'react-md';

class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                id: props.match.params.id || 0,
                name: '',
                description: '',
                cost: 0,
                retail: 0,
                quantity: 0,
                total_cost: 0,
                total_retail: 0
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const id = this.state.item.id;
        if (id != 0) {
            const _this = this;
            $.ajax({
                url: '/controllers/items.php?action=getItem',
                data: {id: id},
                method: 'GET',
                success(res) {
                    console.log(res);
                    _this.setState({
                        item: res,
                    });
                }
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.item
        });
    }
    handleChange(v, e) {
        const item = this.state.item;
        const property = e.target.name;
        item[property] = v;
        item.total_cost = (item.cost * item.quantity).toFixed(2);
        item.total_retail = (item.retail * item.quantity).toFixed(2);
        this.setState({
            item: item
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const item = this.state.item;
        const _this = this;
        $.ajax({
            url: '/controllers/items.php?action=upsertItem',
            method: 'POST',
            data: item,
            success(res) {
                _this.props.history.push('/items');
            }
        });
    }
    render() {
        const item = this.state.item;
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="name"
                    label="商品名字"
                    name="name"
                    value={item.name}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="description"
                    label="描述"
                    name="description"
                    value={item.description}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="quantity"
                    label="一件多少包"
                    name="quantity"
                    value={item.quantity}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="cost"
                    label="成本价"
                    name="cost"
                    value={item.cost}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="retail"
                    label="零售价"
                    name="retail"
                    value={item.retail}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="total_cost"
                    label="总成本"
                    name="total_cost"
                    value={item.total_cost}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <TextField
                    id="total_retail"
                    label="总零售"
                    name="total_retail"
                    value={item.total_retail}
                    onChange={this.handleChange}
                    lineDirection="center"
                    className="md-cell md-cell--bottom"
                />
                <button className="button is-success">Submit</button>
            </form>
        );
    }
}

export default ItemForm;