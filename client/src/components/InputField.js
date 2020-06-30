import React, { Component } from 'react';

export default class InputField extends Component {
    render() {
        return (
            <div className="inputContainer">
                <textarea className="textarea" value={this.props.value} onChange={this.props.handleChange} placeholder="Enter input"></textarea>
            </div>
        );
    }
}
