import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router';
import fetcher from '../utils/fetch';

export const Input = styled.input`
    padding: 10px;
    background: #929292;
    border: none;
    border-radius: 5px;
    color: #fff;
`;

export const Button = styled.button`
    padding: 10px;
    background: #fff;
    border: none;
    border-radius: 5px;
    margin: 0 5px;
`;

const Sep = styled.hr`
    margin: 20px 0;
    border: none;
`;

export default function() {
    const history = useHistory();
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleOnUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleOnPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleOnClick = () => {
        const url = '/auth/login';
        fetcher(url, {
            method: 'POST',
            body: { username, password }
        })
        .then(data => {
            if (!data) {
                return;
            }
            const tokenData = jwt.decode(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('tokenData', JSON.stringify(tokenData));
            history.push('/');
        })
    };
    return (
        <div>
            <h1>Login page</h1>
            <div>
                <h3>Username:</h3>
                <Input value={username} onChange={handleOnUsernameChange} type="text" />
            </div>
            <Sep />
            <div>
                <h3>Password:</h3>
                <Input value={password} onChange={handleOnPasswordChange} type="password" />
            </div>
            <Sep />
            <Button onClick={handleOnClick}>Submit</Button>
        </div>
    )
}