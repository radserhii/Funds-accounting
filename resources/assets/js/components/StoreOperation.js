import React, {Component} from 'react';

export default class StoreOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (!this.refs.title.value
            || !this.refs.type.value
            || !this.refs.sum.value) {
            this.setState({error: true});
            return null;
        }
        this.setState({error: false});

        axios.post('/api/operations', {
            title: this.refs.title.value,
            type: this.refs.type.value,
            sum: this.refs.sum.value
        })
            .then(response => {
                this.props.update(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const error = "Input all fields";

        return (
            <div>
                <h3>Add new operation:</h3>
                <div className={this.state.error ? "text-danger" : ""}>{this.state.error ? error : ""}</div>
                <div className="form-group">
                    <label htmlFor="title">Operation:</label>
                    <input ref="title"
                           type="text"
                           name="title"
                           className="form-control"
                           id="title"
                           placeholder=""
                           required/>
                </div>
                <div className="row">
                    <div className="form-group col-sm-3">
                        <label htmlFor="type">Type:</label>
                        <select ref="type"
                                name="type"
                                className="form-control"
                                id="type">
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="sum">Sum:</label>
                        <input ref="sum"
                               type="number"
                               name="sum"
                               className="form-control"
                               id="sum"
                               placeholder=""
                               required/>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-outline-success"
                            onClick={this.handleSubmit}>Save
                    </button>
                </div>
            </div>
        );
    }
}

