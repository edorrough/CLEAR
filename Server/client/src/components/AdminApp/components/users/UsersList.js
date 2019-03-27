// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const usersList = ({ adminsList }) => {
    debugger
    // const emptyMessage = (
    //     <p>There is no user in your collection</p>
    // )

    // const allAdminsList = () => {
    //     return (
    //         <div>
    //             {adminsList}
    //         </div>
    //     )
    // }

}

usersList.propTypes = {
    adminsList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        adminsList: state
    }
}

export default connect(mapStateToProps, {

})(usersList)