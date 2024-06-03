import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(email, password));
    };

    return (
       
    <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label for="email">Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label for="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" >Log In</button>

        <h6 style={{paddingTop:"10px" ,cursor:"pointer" ,color:"skyblue"}}  onClick={() => navigate('/signup')}>dont have account? Signup</h6>

    </form>

    );
};

export default Login;