import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from './../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);

    const handleSignup = async (e) => {
        e.preventDefault();
        await dispatch(signup(name, email, password));
        if (!error) navigate('/home');
    };

    return (
            
            <form onSubmit={handleSignup}>
            <h3>Signup</h3>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Signup</button>

                <h6 style={{paddingTop:"10px" ,cursor:"pointer" ,color:"skyblue"}} onClick={() => navigate('/')} >already a user ? login</h6>
            
            <h2>{error}</h2>
            </form>
    );
};

export default Signup;
