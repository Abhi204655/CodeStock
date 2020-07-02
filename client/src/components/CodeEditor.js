import React, { Component } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import Topbar from './Topbar';
import InputField from './InputField';
import OutputField from './OutputField';
import { connect } from 'react-redux';
import { compileCode, setCode } from '../redux/actions/codeActions';

import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/bootstrap-v4.css';


import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';



class CodeEditor extends Component {
    state = {
        code: '',
        mode: '',
        input: '',
        error: ''
    }

    showNortification = (type, msg) => {
        new Noty({
            type,
            theme: 'bootstrap-v4',
            layout: 'topRight',
            text: msg,
            timeout: 3000
        }).show();
    }

    compileCode = () => {
        this.props.setCode(this.state.code);
        this.props.compileCode(this.state.code, this.state.input)
    }

    componentDidMount() {
        const { language } = this.props;
        if (language === 'Py') {
            this.setState({ mode: 'python' })
        } else if (language === 'C++') {
            this.setState({ mode: 'text/x-c++src' })
        } else if (language === 'C') {
            this.setState({ mode: 'text/x-csrc' })
        } else if (language === 'C#') {
            this.setState({ mode: 'text/x-csharp' })
        }

        if (this.props.code) {
            this.setState({ code: this.props.code });
        }
        if (this.props.input) {
            this.setState({ input: this.props.input });
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.output !== this.props.output) {
            if (this.props.output.status === 'success') {
                this.showNortification('success', 'Code compiled successfully');
            } else {
                this.showNortification('error', 'Failed to compile')
            }
        }
        if (prevProps.error !== this.props.error) {
            this.showNortification('error', this.props.error)
        }
        if (prevProps.code !== this.props.code) {
            this.setState({ code: this.props.code });
        }


    }

    handleChange = (e) => {
        this.setState(
            { input: e.target.value }
        )
    }

    render() {
        return (
            <div className="editor">
                <Topbar compileCode={this.compileCode} code={this.props.code} />
                <div className="code-wrapper">
                    <CodeMirror
                        value={this.state.code}
                        options={{
                            mode: this.state.mode,
                            styleActiveLine: true,
                            styleActiveSelected: true,
                            theme: 'material',
                            lineNumbers: true,
                            closeBrackets: true,
                            autoCloseBrackets: {
                                pairs: "\"\"**//__()[]{}''``",
                                triples: "",
                                explode: "[]{}"
                            }
                        }}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ code: value });
                        }}
                        onChange={(editor, data, value) => {
                        }}
                    />
                </div>
                <div className="inputs">
                    <InputField handleChange={this.handleChange} value={this.state.input} />
                    <OutputField />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    error: state.code.error,
    language: state.code.language,
    code: state.code.code,
    output: state.code.output,
    input: state.code.input
})

// export default CodeEditor;
export default connect(mapStateToProps, { compileCode, setCode })(CodeEditor);