import React from "react";

// User profile state-less component
const User = ({ user, deleteUser }) => {
    return (<div className="user">
        <img className="avatar" src={user.avatar} alt={user.first_name} />
        <span className="user-name">{user.first_name} {user.last_name}</span>
        <div onClick={() => { deleteUser(user.id) }} className="delete-button">Delete</div>
    </div>)
}

export default User