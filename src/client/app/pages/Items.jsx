import React from 'react';
import $ from 'jquery';

import ItemForm from '../components/ItemForm.jsx';

class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            item: {
                id: 0,
                name: '',
                description: '',
                cost: 0,
                retail: 0,
                quantity: 0,
                total_cost: 0,
                total_retail: 0
            },
            modal: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.upsert = this.upsert.bind(this);
        this.resetItem = this.resetItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    upsert(item) {
        this.setState({
            modal: true,
            item: item,
        });
    }
    resetItem() {
        this.setState({
            item: {
                id: 0,
                name: '',
                description: '',
                cost: 0,
                retail: 0,
                quantity: 0,
                total_cost: 0,
                total_retail: 0
            }
        });
    }
    closeModal() {
        this.setState({
            modal: false
        });
        this.resetItem();
    }
    handleSubmit(item) {
        const _this = this;
        $.ajax({
            url: '/controllers/items.php?action=upsertItem',
            method: 'POST',
            data: item,
            success(res) {
                _this.closeModal();
                _this.resetItem();
            }
        });
    }
    render() {
        const items = this.state.items;
        const _this = this;
        const list = items.map((item) => 
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.cost}</td>
                <td>{item.retail}</td>
                <td>{item.quantity}</td>
                <td>{item.total_cost}</td>
                <td>{item.total_retail}</td>
                <td><a className="button is-danger" onClick={_this.upsert.bind(_this, item)}>Edit</a></td>
            </tr>
        );
        const newItem = this.state.item;
        return (
            <div>
            <a className="button is-primary" onClick={this.upsert}>Add Item</a>
            <ItemForm handleSubmit={this.handleSubmit} modal={this.state.modal} closeModal={this.closeModal} item={this.state.item} />
            <table className="table is-fullwidth is-striped is-narrow">
                <thead>
                    <tr>
                        <th>名字</th>
                        <th>描述</th>
                        <th>成本价</th>
                        <th>零售价</th>
                        <th>一件多少包</th>
                        <th>总成本</th>
                        <th>总零售</th>
                        <th>Action></th>
                    </tr>
                </thead>
                <tbody>
                {list}
                </tbody>
            </table>
            </div>
        );
    }
}

export default Items;