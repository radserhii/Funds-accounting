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

    handleDelete(id, title) {
        confirm("Are you sure? Operation will be delete!");
        console.log(id);
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
            const totalGrnArray = this.state.operations.map(function (item) {
                return item.sum;
            });

            totalGrnArray.forEach((item) => {
                totalSumGrn += parseFloat(item);
            });

            totalSumGrn = totalSumGrn.toFixed(2);

            // Compute total sum for USD
            const totalUsdArray = this.state.operations.map(function (item) {
                return item.sum_usd;
            });

            totalUsdArray.forEach((item) => {
                totalSumUsd += parseFloat(item);
            });

            totalSumUsd = totalSumUsd.toFixed(2);
        }

        const listItems = this.state.operations.map((operation, index) =>
            <tr key={operation.id}>
                <th scope="row">{index + 1}</th>
                <td>{operation.title}</td>
                <td>{operation.type}</td>
                <td>{operation.sum}</td>
                <td>{operation.sum_usd}</td>
                <td>{operation.created_at}</td>
                <td></td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(operation.id, operation.title)}>Delete
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
