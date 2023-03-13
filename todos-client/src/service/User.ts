import React from 'react';
// import axios, { AxiosResponse } from 'axios';
// import { UserI } from '../types/types';

// const getUsers = async () => {
//     const token = localStorage.getItem('token');
//     if (token === null) {
//         console.log('no token!');
//         return [];
//     } else {
//         const config = {
//             headers: {
//                 x_access_token: token
//             }
//         };
//         const res = await axios.get("http://localhost:1337/api/user", config
//         )
//         .then((response: AxiosResponse) => {
//             console.log("RESPONSE: ", response.data.users);
//             return response.data.users;
//         })
//         .catch((error: Error) => {
//             console.log(error);
//         });
//         return res.data;
//     }
// }

// export { getUsers };