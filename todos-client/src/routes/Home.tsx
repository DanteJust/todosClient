import React, { useState, FC, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import image from '../resources/logo.png';

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
    <div
      style={{ height: "100vh", width: "100vw", display: "flex", alignItems: 'center', justifyContent: 'center', backgroundColor: "#5CDB95" }}
    >
      <div style={{ 
        height: "80vh", width: "20vw", 
        backgroundColor: '#EDF5E1', 
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column"
      }}>
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={image} width={221} height={146}/>
        </div>
        <div style={{ 
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
         }}>
        <TextField
          required
          value={username}
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
          label="Password"
          placeholder="ex: secret"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          style={{ marginTop: 30 }}
        />
        </div>
        {
          loginFormType 
            ?
              <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
              }}>
                <Button variant="contained" style={{ marginTop: 10, width: 250 }} onClick={login} size="large">Login</Button>
                <div onClick={switchForm}>Don't have an account? Register now!</div>
              </div>
            :
              <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column"
              }}>
                <Button variant="contained" style={{ marginTop: 10, width: 250}} onClick={register} size="large">Register</Button>
                <div onClick={switchForm}>Already have an account? Login now!</div>
            </div>
        }
      </div>
    </div>
  );
};