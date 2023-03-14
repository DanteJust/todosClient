import React, { useState, FC, useEffect } from "react";
import { TextField, Button, createStyles } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import image from '../resources/logo-transparent2.png';

interface Props {
}

export const Home: FC<Props> = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFormType, setLoginFormType] = useState<boolean>(true);

  const login = () => {
    axios.post("http://localhost:1337/api/auth/login", {
      username: username,
      password: password
    })
    .then((response: AxiosResponse) => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate("/hub");
    })
    .catch((error: Error) => {
      console.log(error);
    });
  }

  const register = () => {
    axios.post("http://localhost:1337/api/auth/registration", {
      username: username,
      password: password
    })
    .then((response: AxiosResponse) => {
      console.log(response.data);
      setUsername("");
      setPassword("");
      switchForm();
    })
    .catch((error: Error) => {
      console.log(error);
    });
  }

  const switchForm = () => {
    setLoginFormType(!loginFormType);
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-emerald-900'>
      <div className='h-4/5 w-3/12 bg-gray-300 rounded-t flex items-center justify-around flex-col'
      >
        <div className='h-1/2 flex justify-center items-center'>
          <img src={image} width={221} height={146}/>
        </div>
        <div className='h-1/4 flex justify-center items-center flex-col'>
          <TextField
            required
            value={username}
            variant="filled"
            id="outlined-required"
            label="Username"
            placeholder="ex: peter123"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            required
            value={password}
            id="outlined-required"
            type="password"
            label="Password"
            variant="filled"
            placeholder="ex: secret"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            style={{ marginTop: 30 }}
            // sx={{ input: { color: 'red' } }}
          />
        </div>
        {
          loginFormType 
            ?
              <div className='h-1/4 flex justify-around items-center flex-col'>
                <Button variant="contained" style={{ marginTop: 10, width: 250, backgroundColor: '#064e3b' }} onClick={login} size="large">Login</Button>
                <div onClick={switchForm}>Don't have an account? Register now!</div>
              </div>
            :
              <div className='h-1/4 flex justify-around items-center flex-col'>
                <Button variant="contained" style={{ marginTop: 10, width: 250}} onClick={register} size="large">Register</Button>
                <div onClick={switchForm}>Already have an account? Login now!</div>
            </div>
        }
      </div>
    </div>
  );
};