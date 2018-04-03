import React from 'react';
import $ from 'jquery';

import {TextField,Button,Grid,Cell,Card, CardTitle, CardText} from 'react-md';

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            ticket: {
                id: 0,
                name: '',
                description: '',
                status: 'pending',
                category: 'feature'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.getTickets();
    }
    getTickets() {
        const _this= this;
        $.ajax({
            url: '/controllers/tickets.php?action=getAll',
            method: 'GET',
            success(res) {
                _this.setState({
                    todos: res
                });
            }
        });
    }
    handleChange(v, e, idx) {
        if (typeof idx != 'undefined') {
            const i = v;
            const ev = idx;
            const value = e;
            let todos = this.state.todos;
            const p = ev.target.name;
            todos[i][p] = value;
            this.setState({
                todos: todos
            });
        } else {
            let ticket = this.state.ticket;
            const p = e.target.name;
            ticket[p] = v;
            this.setState({
                ticket: ticket
            });
        }
    }
    handleDrag(e) {
        console.log(e);
    }
    handleSubmit(ticket) {
        const _this = this;
        $.ajax({
            url: '/controllers/tickets.php?action=upsert',
            data: ticket,
            method: 'POST',
            success(res) {
                if (res) {
                    _this.setState({
                        ticket: {
                            id: 0,
                            name: '',
                            description: '',
                            status: 'pending',
                            category: 'feature'
                        }
                    });
                    _this.getTickets();
                }
            }
        });
    }
    render() {
        const newTicket = this.state.ticket;
        const tickets = this.state.todos.map((t, idx) => {
            return (
                <Card key={t.id} className="ticket" onDrag={this.handleDrag.bind(this)}>
                    <CardTitle title={t.name} subtitle={t.status} />
                    <CardText><TextField id={'ticket' + idx} label="Description" name="description" rows={2} value={t.description} onChange={this.handleChange.bind(this, idx)} /></CardText>
                </Card>
            );
        });
        return (
            <div style={{maxWidth: '768px', margin: 'auto',width: '100%'}}>
                <h1>反馈与修复</h1>
                <Grid>
                    <Cell size={6}>
                        {tickets}
                        <Card className="ticket">
                            <CardTitle title="" subtitle="">
                                <TextField id="title" label="New Ticket Title" name="name" value={newTicket.name} onChange={this.handleChange} />
                            </CardTitle>
                            <CardText>
                                <TextField id="description" label="description" name="description" value={newTicket.description} rows={2} onChange={this.handleChange} />
                            </CardText>
                            <Button flat secondary swapTheming onClick={this.handleSubmit.bind(this, newTicket)}>Create</Button>
                        </Card>
                    </Cell>
                    <Cell size={6}>
                        <Card>
                            <CardTitle title="Ticket Title" subtitle="done" />
                            <CardText>This is description</CardText>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default TodoList;