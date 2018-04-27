import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Store from './StoreOperation';

export default class Operation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: [],
            sum: null
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateStateFromStore = this.updateStateFromStore.bind(this);
    }

    componentDidMount() {
        axios.get('/api/operations')
            .then(response => {
                this.setState({operations: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleEdit(id) {
        window.location.pathname = "/api/operations/" + id + "/edit";
    }

    handleDelete(id) {
        confirm("Are you sure? Operation will be delete!");

        axios.delete(`/api/operations/${id}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        this.componentDidMount();
    }

    updateStateFromStore(operation) {
        // this.setState({operations: [operation, ...this.state.operations]});
        this.componentDidMount();
    }

    render() {

        let totalSumGrn = 0;
        let totalSumUsd = 0;

        if (this.state.operations.length !== 0) {

            // Compute total sum for GRN
            this.state.operations.forEach(function (operation) {
                if (operation.type === "credit") totalSumGrn -= operation.sum;
                if (operation.type === "debit") totalSumGrn += operation.sum;
            });
            totalSumGrn = totalSumGrn.toFixed(2);

            // Compute total sum for USD
            this.state.operations.forEach(function (operation) {
                if (operation.type === "credit") totalSumUsd -= operation.sum_usd;
                if (operation.type === "debit") totalSumUsd += operation.sum_usd;
            });
            totalSumUsd = totalSumUsd.toFixed(2);
        }

        const listItems = this.state.operations.map((operation, index) =>
            <tr key={operation.id}>
                <th scope="row">{index + 1}</th>
                <td>{operation.title}</td>
                <td>{operation.type}</td>
                <td className={operation.type === 'credit' ? "text-danger" : "text-success"}>
                    {operation.type === 'credit' ? "-" : ""}{operation.sum}
                </td>
                <td className={operation.type === 'credit' ? "text-danger" : "text-success"}>
                    {operation.type === 'credit' ? "-" : ""}{operation.sum_usd}
                    </td>
                <td>{operation.created_at}</td>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.handleEdit(operation.id)}>Edit
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(operation.id)}>Delete
                    </button>
                </td>
            </tr>
        );

        return (
            <div className="container">
                <Store update={this.updateStateFromStore}/>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Operation</th>
                        <th scope="col">Type</th>
                        <th scope="col">Sum(GRN)</th>
                        <th scope="col">Sum(USD)</th>
                        <th scope="col">Created</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listItems}
                    <tr>
                        <th scope="row"></th>
                        <td><b>Total:</b></td>
                        <td></td>
                        <td><b>{totalSumGrn}</b></td>
                        <td><b>{totalSumUsd}</b></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById('operation')) {
    ReactDOM.render(<Operation/>, document.getElementById('operation'));
}
