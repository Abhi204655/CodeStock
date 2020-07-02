import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd';
import { changeLanguage, setCode } from '../redux/actions/codeActions';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Input } from 'antd';

import downloadFile from '../utility';

const { Option } = Select;

class Topbar extends Component {
    state = { visible: false, fileName: '', code: '' }


    static getDerivedStateFromProps(props, state) {
        if (props.code !== state.code) {
            return {
                code: props.code
            }
        } else {
            return null;
        }
    }

    handleChange = (value) => {
        this.props.setCode('');
        this.props.changeLanguage(value);
    }
    handleFileName = (e) => {
        this.setState({
            fileName: e.target.value
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        downloadFile(this.state.code, this.props.language, this.state.fileName);
        this.setState({
            visible: false,
            fileName: ''
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { loading, language } = this.props;
        return (
            <div className="topbar-wrapper">
                <div className="topbar">
                    <div className="topbar-btngroup">
                        <button className="topbar-btn" onClick={this.props.compileCode}>
                            {loading ? (
                                <>
                                    <LoadingOutlined className="loading" />
                                Compiling
                            </>
                            ) : (
                                    "Compile"
                                )}
                        </button>
                        <button className="topbar-btn" onClick={this.showModal}>Download</button>
                        <Modal
                            title="Download File"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <button className="topbar-btn" key="back" onClick={this.handleCancel}>
                                    Cancel
                                </button>,
                                <button className="topbar-btn" key="submit" onClick={this.handleOk}>
                                    Download
                                </button>,
                            ]}
                        >
                            <Input placeholder="Enter File name (without extension)" value={this.state.fileName} onChange={this.handleFileName} />
                        </Modal>
                    </div>
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

export default connect(getStateFromProps, { changeLanguage, setCode })(Topbar);