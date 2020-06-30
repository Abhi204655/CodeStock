import React, { Component } from 'react';
import { connect } from 'react-redux';

class OutputField extends Component {
    state = {
        output: ''
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.output !== prevState.output) {
            return {
                output: nextProps.output
            }
        } else {
            return null
        }
    }

    render() {
        const { output } = this.state;
        return (
            <div className="inputContainer">
                <textarea className="textarea" value={output} placeholder="Output" readOnly>
                </textarea>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    output: state.code.output.output
})

export default connect(mapStateToProps)(OutputField);