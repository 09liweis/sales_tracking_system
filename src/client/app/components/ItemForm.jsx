import React from 'react';
import $ from 'jquery';

class ItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.item
        });
    }
    handleChange(e) {
        const item = this.state.item;
        const property = e.target.name;
        const value = e.target.value;
        item[property] = value;
        item.total_cost = (item.cost * item.quantity).toFixed(2);
        item.total_retail = (item.retail * item.quantity).toFixed(2);
        this.setState({
            item: item
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const item = this.state.item;
        this.props.handleSubmit(item);
    }
    render() {
        const activeModal = this.props.modal ? 'modal is-active' : 'modal';
        const item = this.state.item;
        return (
            <div className={activeModal}>
                <div className="modal-background" onClick={this.props.closeModal}></div>
                <form className="modal-card" onSubmit={this.handleSubmit}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete" aria-label="close" onClick={this.props.closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <input type="hidden" name="id" value={item.id} onChange={this.handleChange} />
                        <div className="field">
                            <label className="label">Item Name</label>
                            <div className="control">
                                <input className="input" type="text" name="name" value={item.name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <input className="input" type="text" name="description" value={item.description} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">一件多少包</label>
                            <div className="control">
                                <input className="input" type="text" name="quantity" value={item.quantity} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">成本价</label>
                            <div className="control">
                                <input className="input" type="text" name="cost" value={item.cost} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">零售价</label>
                            <div className="control">
                                <input className="input" type="text" name="retail" value={item.retail} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">总成本</label>
                            <div className="control">
                                <input className="input" type="text" name="total_cost" value={item.total_cost} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">总零售</label>
                            <div className="control">
                                <input className="input" type="text" name="total_retail" value={item.total_retail} onChange={this.handleChange} />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Submit</button>
                        <a className="button" onClick={this.props.closeModal}>Cancel</a>
                    </footer>
                </form>
            </div>
        );
    }
}

export default ItemForm;