import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Operation extends Component {
    render() {
        return (
            <div className="container">
                hello
            </div>
        );
    }
}

if (document.getElementById('operation')) {
    ReactDOM.render(<Operation />, document.getElementById('operation'));
}
