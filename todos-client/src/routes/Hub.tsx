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
        <div style={{ width: "100vw", height: "100vh", backgroundColor: "#5CDB95", display: "flex" }}
        >
            {
                token === ""
                    ?
                    <h1>Access denied!</h1>
                    :
                    <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                        <h1>Welcome to the hub!</h1>
                        <h2>Users</h2>
                        <div style={{ width: "80vw", height: "20vh", display: "flex", alignItems: "center", flexDirection: 'row', justifyContent: 'center' }}>
                            <Button onClick={() => setOpen(!open)}>Show users</Button>
                        </div>
                        <UserModal open={open} setOpen={setOpen}/>
                    </div>
            }
        </div>
    )
}