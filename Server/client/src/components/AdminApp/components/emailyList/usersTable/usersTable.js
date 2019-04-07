import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default function UsersTable({ user, deleteUser }) {
    // debugger
    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.createDate}</td>
            <td className="center aligned">
                <Link to={`/admins/users/AddNewUserOnList/${user._id}`}><i className="pencil alternate icon"></i></Link>
                <i className="trash alternate icon" onClick={() => deleteUser(user._id)}></i>
            </td>
            <td>{user.notes}</td>
        </tr>
    )
}

UsersTable.propTypes = {
    user: PropTypes.object,
    deleteUser: PropTypes.func
}