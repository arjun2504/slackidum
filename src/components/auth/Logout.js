import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { DJANGO_ENDPOINT } from '../../constants';
import history from '../../history';

const Logout = () => {

    axios.get(DJANGO_ENDPOINT + 'logout/',{
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    }).then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        history.push('/');
    }).catch(e => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        history.push('/');
    });

    

    return (
        <p></p>
    );
}

export default Logout
