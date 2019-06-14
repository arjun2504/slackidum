import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');

    return (
        <Redirect to="/" />
    );
}

export default Logout
