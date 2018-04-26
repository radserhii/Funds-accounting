import React, {Component} from 'react';

export default class StoreOperation extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         operations: [],
    //         sum: null
    //     }
    // }

    // componentDidMount() {
    //     axios.get('/api/operations')
    //         .then(response => {
    //             this.setState({operations: response.data});
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    render() {

        return (
            <form>
                <h3>Add new operation:</h3>
                <div className="form-group">
                    <label htmlFor="title">Operation:</label>
                    <input type="text" name='title' className="form-control" id="title" placeholder=""/>
                </div>
                <div className="row">
                    <div className="form-group col-sm-3">
                        <label htmlFor="type">Type:</label>
                        <select name="type" className="form-control" id="type">
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="sum">Sum:</label>
                        <input type="number" name='sum' className="form-control" id="sum" placeholder=""/>
                    </div>
                </div>
            </form>
        );
    }
}

