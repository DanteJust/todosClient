import React, { useState, FC, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

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
        height: "60vh", width: "30vw", 
        backgroundColor: '#EDF5E1', 
        border: "solid #000", borderWidth: "1 1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column"
      }}>
        {
          loginFormType
            ?
            <h1>
              Please login below
            </h1>
            :
            <h1>
              Please register below
            </h1>
        }
        <div style={{ 
          height: "30%", width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column"
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
        />
        </div>
        {
          loginFormType 
            ?
              <div style={{
                height: "20%",
                width: "50%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column"
              }}>
                <Button variant="contained" style={{ marginTop: 10 }} onClick={login}>Login</Button>
                <div onClick={switchForm}>Don't have an account? Register now!</div>
              </div>
            :
              <div style={{
                height: "20%",
                width: "50%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column"
              }}>
                <Button variant="contained" style={{ marginTop: 10 }} onClick={register}>Register</Button>
                <div onClick={switchForm}>Already have an account? Login now!</div>
            </div>
        }
      </div>
    </div>
  );
};