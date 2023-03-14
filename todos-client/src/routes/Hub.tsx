import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { UserModal } from '../components/UserModal';

interface Props {
}

export const Hub: FC<Props> = () => {
    const [token, setToken] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const findToken = localStorage.getItem('token');
        if (findToken === null) {
            console.log('Token is null!');
        } else {
            setToken(findToken);
            console.log(findToken);
        }
    }, []);

    return(
        <div className='h-screen w-screen flex bg-emerald-900'
        >
            {
                token === ""
                    ?
                    <h1>Access denied!</h1>
                    :
                    <div className='h-screen w-screen flex items-center flex-col'>
                        <h1>Welcome to the hub!</h1>
                        <h2>Users</h2>
                        <div className='w-10/12 h-1/4 flex items-center flex-row justify-center'>
                            <Button onClick={() => setOpen(!open)}>Show users</Button>
                        </div>
                        <UserModal open={open} setOpen={setOpen}/>
                    </div>
            }
        </div>
    )
}