import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick = () => {
        this.props.deleteFlashMessage(this.props.message.id)
    }
    render() {
        const { type, text } = this.props.message;
        return (
            <div className={classnames('alert', {
                'alert-success' : type === 'success',
                'alert-danger' : type === 'error',
                'alert-info' : type === 'info'
            })}>
                <button 
                    className="close"
                    onClick={this.onClick}
                ><span>&times;</span></button>
                {text}
            </div>
        )
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object,
    deleteFlashMessage: PropTypes.func
}

export default FlashMessage;