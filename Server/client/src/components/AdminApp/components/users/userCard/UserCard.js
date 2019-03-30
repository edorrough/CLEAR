import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserCard = ({ admin, deleteAdmin }) => {
    return (
        <div className="ui card">
            <div className="image">
                <img src={admin.adminImagePath ? admin.adminImagePath : 'NoImage'} alt={admin.adminImagePathAlt} />

            </div>
            
            <div className="content">
                <div className="header">{admin.firstname} {admin.lastname}</div>
                <div className="meta">
                    <span className="date">{admin.createdDate}</span>
                </div>
            </div>

            <div className="extra content">
                <div className="ui two buttons ">
                    <Link to={`/admins/users/AddNewAdmins/${admin._id}`} className="ui basic button green">Edit</Link>
                    <div className="ui basic button red" onClick={() => deleteAdmin(admin._id)}>Delete</div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    admin: PropTypes.object,
    deleteAdmin: PropTypes.func
}

export default UserCard;