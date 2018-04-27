import React, {Component} from 'react';
import ReactDOM from "react-dom";

export default class EditOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            type: this.props.type,
            sum: this.props.sum,
            error: false
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSum = this.handleSum.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleTitle() {
        this.setState({title: this.refs.title.value});
    }

    handleType() {
        this.setState({type: this.refs.type.value});
    }

    handleSum() {
        this.setState({sum: this.refs.sum.value});
    }

    handleUpdate() {
        if (!this.state.title
            || !this.state.type
            || !this.state.sum) {
            this.setState({error: true});
            return null;
        }
        this.setState({error: false});

        axios.put(`/api/operations/${this.state.id}`, {
            title: this.state.title,
            type: this.state.type,
            sum: this.state.sum
        })
            .then(response => {
                window.location.pathname = "/home";
            })
            .catch(error => {
                console.log(error);
            });

        // this.refs.title.value = null;
        // this.refs.type.value = "credit";
        // this.refs.sum.value = null;
    }

    handleCancel() {
        window.location.pathname = "/home";
    }

    render() {
        const error = "Input all fields";

        return (
            <div className="offset-sm-4 col-sm-4">
                <h3>Update operation:</h3>
                <div className={this.state.error ? "text-danger" : ""}>{this.state.error ? error : ""}</div>
                <div className="form-group">
                    <label htmlFor="title">Operation:</label>
                    <input ref="title"
                           type="text"
                           name="title"
                           className="form-control"
                           id="title"
                           onChange={this.handleTitle}
                           defaultValue={this.state.title}
                           required/>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="type">Type:</label>
                        <select ref="type"
                                name="type"
                                className="form-control"
                                id="type"
                                onChange={this.handleType}
                                value={this.state.type}>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="sum">Sum:</label>
                        <input ref="sum"
                               type="number"
                               name="sum"
                               className="form-control"
                               id="sum"
                               onChange={this.handleSum}
                               defaultValue={this.state.sum}
                               required/>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-outline-success"
                            onClick={this.handleUpdate}>Update
                    </button>
                    <button className="btn btn-outline-primary"
                            onClick={this.handleCancel}>Cancel
                    </button>
                </div>
            </div>
        );
    }
}

const editOperation = document.getElementById('edit-operation');
if (editOperation) {
    ReactDOM.render(<EditOperation {...editOperation.dataset}/>, editOperation);
}
