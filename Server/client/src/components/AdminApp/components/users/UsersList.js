import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './userCard/UserCard';
import { connect } from 'react-redux';
import { deleteAdmin } from '../../../../actions/userCRUDaction';

const UsersList = ({ admins, deleteAdmin }) => {

    const emptyMessage = (
        <p>There is no user in your collection</p>
    )

    const adminsList = (admins, deleteAdmin) => {
        return (
            <div className="ui container">
                <div className="ui four stackable cards">
                    {admins.map(admin => <UserCard 
                                            admin={admin} 
                                            key={admin._id} 
                                            deleteAdmin={deleteAdmin} 
                                        />)}
                </div>
            </div>
        )
    }
    return (
        <div className="userlist-page">
            {admins.length === 0 ? emptyMessage : adminsList(admins, deleteAdmin)}
        </div>
    )
}

UsersList.propTypes = {
    admins: PropTypes.array.isRequired,
    deleteAdmin: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        admins: state.admins
    }
}

export default connect(mapStateToProps, {
    deleteAdmin
})(UsersList)