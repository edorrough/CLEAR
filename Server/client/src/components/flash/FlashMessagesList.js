import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessagesList extends Component {

    render() {
        const messages = this.props.messages.map(message => {
            return <FlashMessage 
                        key={message.id} 
                        message={message} 
                        deleteFlashMessage={this.props.deleteFlashMessage}
                    />
        });
        return (
            <div>
                { messages }
            </div>
        )
    }
}

FlashMessagesList.propTypes = {
    messages: PropTypes.array,
    deleteFlashMessage: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        messages: state.flashMessage
    }
}

export default connect(mapStateToProps, {
    deleteFlashMessage
})(FlashMessagesList)