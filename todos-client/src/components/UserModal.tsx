import Modal from '@mui/material/Modal';
import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { UserI } from '../types/types';

interface Props {
    open: boolean;
    setOpen(value: boolean): void;
}

export const UserModal: FC<Props> = ({ open, setOpen }) => {
    const [users, setUsers] = useState<UserI[]>();

    const getUsers = () => {
        const token = localStorage.getItem('token');
        if (token === null) {
            console.log('no token!');
        } else {
            const config = {
                headers: {
                    x_access_token: token
                }
            };
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

    useEffect(() => {
        getUsers();
    }, [open]);

    return(
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                maxHeight: 200,
                backgroundColor: 'green',
                border: '2px solid #000',
                overflowY: 'scroll',
                padding: 10
            }}
            >
            {
                users === undefined
                    ?
                    <div>Not yet!</div>
                    :
                    <div>
                        {
                            users.map((user: UserI, iterator: number) => {
                                return(
                                    <div key={iterator} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <div style={{ color: 'yellow', marginBottom: 5 }}>User number {iterator + 1}:</div>
                                        <div style={{ color: 'white' }}>Username: {user.username}</div>
                                        <div style={{ marginBottom: 10, color: 'white' }}>Id: {user._id}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            </div>
        </Modal>
    )
}