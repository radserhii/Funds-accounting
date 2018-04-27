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
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit() {
    //     if (!this.refs.title.value
    //         || !this.refs.type.value
    //         || !this.refs.sum.value) {
    //         this.setState({error: true});
    //         return null;
    //     }
    //     this.setState({error: false});
    //
    //     axios.post('/api/operations', {
    //         title: this.refs.title.value,
    //         type: this.refs.type.value,
    //         sum: this.refs.sum.value
    //     })
    //         .then(response => {
    //             this.props.update(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //
    //     this.refs.title.value = null;
    //     this.refs.type.value = "credit";
    //     this.refs.sum.value = null;
    // }

    render() {
        const error = "Input all fields";

        return (

            <div>
                <h3>Update operation:</h3>
                <div className={this.state.error ? "text-danger" : ""}>{this.state.error ? error : ""}</div>
                <div className="form-group">
                    <label htmlFor="title">Operation:</label>
                    <input ref="title"
                           type="text"
                           name="title"
                           className="form-control"
                           id="title"
                           defaultValue={this.state.title}
                           required/>
                </div>
                <div className="row">
                    <div className="form-group col-sm-3">
                        <label htmlFor="type">Type:</label>
                        <select ref="type"
                                name="type"
                                className="form-control"
                                id="type">
                            <option value="credit"
                                    defaultChecked={this.state.type === "credit" ? "checked" : ""}>Credit
                            </option>
                            <option value="debit"
                                    defaultChecked={this.state.type === "debit" ? "checked" : ""}>Debit
                            </option>
                        </select>
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="sum">Sum:</label>
                        <input ref="sum"
                               type="number"
                               name="sum"
                               className="form-control"
                               id="sum"
                               defaultValue={this.state.sum}
                               required/>
                    </div>
                </div>
                <div className="form-group">
                    {/*<button className="btn btn-outline-success"*/}
                    {/*onClick={this.handleSubmit}>Save*/}
                    {/*</button>*/}
                </div>
            </div>
        );
    }
}

const editOperation = document.getElementById('edit-operation');
if (editOperation) {
    ReactDOM.render(<EditOperation {...editOperation.dataset}/>, editOperation);
}
