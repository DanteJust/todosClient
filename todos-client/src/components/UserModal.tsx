import Modal from '@mui/material/Modal';
import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { UserI } from '../types/types';
import { DenseTable } from './DenseTable';

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
            <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-10/12 max-h-min bg-emerald-900 border-2 border-solid border-black p-2 overflow-y-scroll'
            >
            {
                users === undefined
                    ?
                    <div>Not yet!</div>
                    :
                    <div>
                        <DenseTable users={users}/>
                    </div>
            }
            </div>
        </Modal>
    )
}