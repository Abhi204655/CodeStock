import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd';
import { changeLanguage } from '../redux/actions/codeActions';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

class Topbar extends Component {

    handleChange = (value) => {
        this.props.changeLanguage(value);
    }
    render() {
        const { loading, language } = this.props;
        return (
            <div className="topbar-wrapper">
                <div className="topbar">
                    <button id="compile" onClick={this.props.compileCode}>
                        {loading ? (
                            <>
                                <LoadingOutlined className="loading" />
                                Compiling
                            </>
                        ) : (
                                "Compile"
                            )}
                    </button>
                    <Select defaultValue={language} style={{ width: 140 }} onChange={this.handleChange} dropdownStyle={{ background: '#252f35', color: 'white' }}>
                        <Option value="C" className="option">C</Option>
                        <Option value="C++" className="option">C++</Option>
                        <Option value="Py" className="option">Python</Option>
                        <Option value="C#" className="option">C Sharp</Option>
                    </Select>

                </div>
            </div>
        )
    }
}

const getStateFromProps = (state) => ({
    loading: state.code.loading,
    language: state.code.language
})

export default connect(getStateFromProps, { changeLanguage })(Topbar);