import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { changeLanguage } from '../../redux/actions/codeActions';
import { Select } from 'antd';
const { Option } = Select;

const Landing = (props) => {

    const history = useHistory();
    const [lang, setLang] = useState('');

    const handleChange = (value) => {
        setLang(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.changeLanguage(lang);
        history.push('/code');
    }

    return (
        <div className="landing">
            <div className="landing-header">
                <h1>CodeStock</h1>
            </div>
            <div className="landing-form">
                <div className="form-desc">
                    <h1>WELCOME TO CODESTOCK</h1>
                    <p>Write code | Share code | Learn code</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Select defaultValue={props.language} onChange={handleChange} dropdownStyle={{ background: '#252f35', color: 'white' }} className="select-drop">
                        <Option value="C" className="option">C</Option>
                        <Option value="C++" className="option">C++</Option>
                        <Option value="Py" className="option">Python</Option>
                        <Option value="C#" className="option">C Sharp</Option>
                    </Select>
                    <button type="submit">Code Now</button>
                </form>
            </div>
            <div className="landing-footer">
                <p>Made with love by Abhi</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.code.language
})

export default connect(mapStateToProps, { changeLanguage })(Landing);