import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.customer
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            customer: nextProps.customer
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const customer = this.state.customer;
        this.props.handleSubmit(customer);
    }
    render() {
        const customer = this.state.customer;
        const _this = this;
        var inputs = Object.keys(customer).map(function(property) {
            var value = customer[property];
            var className = (property == 'id') ? 'field column is-2 is-hidden' : 'field column is-2';
            return (
                <div className={className} key={property}>
                    <label className="label">{property}</label>
                    <div className="control">
                        <input className="input" type="text" name={property} value={value} onChange={_this.props.handleChange} />
                    </div>
                </div>
            );
        });
        return (
            <form className="columns is-multiline box" autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <input className="input" type="date" />
                    </div>
                </div>
                <div className="column is-2">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
        );
    }

}

export default Form;