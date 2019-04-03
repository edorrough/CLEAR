import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserTable from './usersTable/usersTable';
import { deleteUser } from '../../../../actions/userEmailsAction';

function EmailsList({ users, deleteUser }) {

    const emptyMessage = (
        <p>There is no email list in the collection</p>
    );

    const userEmailsList = (
        <div className="ui container">
            <table className="ui celled fixed table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                            <th className="eight wide">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => 
                            <UserTable 
                                user={user} 
                                key={user._id}
                                deleteUser={deleteUser} 
                            />)}
                    </tbody>
                </table>
        </div>
    )
    return (
        <div>
            {users.length === 0 ? emptyMessage : userEmailsList}
        </div>
    )
}

EmailsList.propTypes = {
    users: PropTypes.array,
    deleteUser: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, {
    deleteUser
})(EmailsList)