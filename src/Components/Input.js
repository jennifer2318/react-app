import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {validateString, validateUsername} from "../Helpers/validator";

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            valid: false,
            err: 'Заполните поле',
        }
    }

    changeHandler = e => {
        const {value} = e.target;
        const name = this.props.name;

        let validator

        switch (this.props.validType) {
            case 'username' : {
                validator = validateUsername(value)
                break
            }
            default: validator = validateString(value)
        }

        const {valid, err} = validator

        this.setState({value, valid, err})

        this.props.onChange({valid, value, name});
    }

    render() {
        return (
            <div className={classNames(this.state.valid ? 'valid' : 'no-valid', `${this.props.name.toLowerCase()}-filed`, 'input', this.props.className)}>
                <label>
                    {
                        this.props.label ? <span className='label'>{this.props.label}</span> : null
                    }
                    <input
                        type={this.props.type ?? 'text'}
                        name={this.props.name}
                        placeholder={this.props.placeholder ?? ''}
                        value={this.state.value}
                        onChange={this.changeHandler}
                    />
                </label>
                {
                    this.state.err ? <span className='error-aria'>{this.state.err}</span> : null
                }
            </div>
        );
    }
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    validType: PropTypes.string,
    value: PropTypes.string,
}

export default Input;