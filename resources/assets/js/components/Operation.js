import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Operation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: []
        }
    }

    componentDidMount() {
        axios.get('/api/operations')
            .then(response => {
                this.setState({operations: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const listItems = this.state.operations.map((operation, index) =>
            <tr key={operation.id}>
                <th scope="row">{index + 1}</th>g
                <td>{operation.title}</td>
                <td>{operation.type}</td>
                <td>{operation.sum}</td>
                <td>{operation.sum_usd}</td>
                <td>{operation.created_at}</td>
                <td></td>
            </tr>
        );

        return (
            <div className="container">
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
                    </tr>
                    </thead>
                    <tbody>
                    {listItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById('operation')) {
    ReactDOM.render(<Operation/>, document.getElementById('operation'));
}
