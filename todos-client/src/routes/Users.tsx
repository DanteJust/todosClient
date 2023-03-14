import { Button } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserTable } from '../components/UserTable';
import { UserI } from '../types/types';

interface Props {

}

export const Users: FC<Props> = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserI[]>();
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        const findToken = localStorage.getItem('token');
        if (findToken === null) {
            console.log('no token!');
            setToken("");
        } else {
            const config = {
                headers: {
                    x_access_token: findToken
                }
            };
            setToken(findToken);
            axios.get("http://localhost:1337/api/user", config
            )
            .then((response: AxiosResponse) => {
                setUsers(response.data.users);
            })
            .catch((error: Error) => {
                console.log(error);
            });
        }
    }

    return(
        <div className='w-screen h-screen'>
            {
                token === ''
                    ?
                    <div>No Access</div>
                    :
                    <div className='w-screen h-screen'>
                        <div className='w-screen h-20 bg-emerald-900 flex items-center px-2'>
                            <Button onClick={() => navigate('/hub')}>back</Button>
                        </div>
                        {
                            users !== undefined
                                ?
                                <UserTable users={users}/>
                                :
                                <div></div>
                        }
                    </div>
            }
        </div>
    )
} 