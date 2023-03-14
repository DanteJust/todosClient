import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { ListTable } from '../components/ListTable';
import { ListI } from '../types/types';

interface Props {

}

export const Lists: FC<Props> = () => {
    const [lists, setLists] = useState<ListI[]>();
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        getLists();
    }, []);

    const getLists = () => {
        const findToken = localStorage.getItem('token');
        if (findToken === null) {
            console.log('no token!');
            setToken('');
        } else {
            const config = {
                headers: {
                    x_access_token: findToken
                }
            };
            setToken(findToken);
            axios.get("http://localhost:1337/api/list", config
            )
            .then((response: AxiosResponse) => {
                setLists(response.data.lists);
            })
            .catch((error: Error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className='w-screen h-screen'>
            {
                token === ''
                    ?
                    <div>No Access</div>
                    :
                    <div>
                        {
                            lists !== undefined
                                ?
                                <ListTable lists={lists}/>
                                :
                                <div></div>
                        }
                    </div>
            }
        </div>
    )
}