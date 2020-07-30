import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Button } from 'reactstrap';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "minimum of 5 characters required")
    .required(),
  password: yup
    .string()
    .min(7, "minimum of 7 characters required")
    .required(),
});

function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(true);

  const [post, setPost] = useState([]);

  useEffect(() => {
    loginSchema.isValid(login).then((valid) => {
      setButtonDisable(!valid);
    });
  }, [login]);

  const validateChanges = (event) => {
    yup
      .reach(loginSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((error) => {
        setErrors({
          ...errors,
          [event.target.name]: error.errors[0],
        });
      });
  };

  const handleChange = (event) => {
    event.persist();
    const newlogin = {
      ...login,
      [event.target.name]: event.target.value,
    };
    validateChanges(event);
    setLogin(newlogin);
  };

  const submitLogin = (event) => {
    event.preventDefault();
    axiosWithAuth().post("https://lambda-sprout.herokuapp.com/login", login)
    .then((res) => {
      setPost(res.data);
      console.log("logged in", post);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)

      setLogin({
        username: "",
        password: "",
      });
    });
  };

  return (
    <div className="login">
      <h1>LOGIN</h1>
      <form onSubmit={submitLogin}>
        <label htmlFor="username" className="loginUsername">
          Enter username
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={handleChange}
            value={login.username}
            placeholder="       Enter username"
          />
          {errors.username.length > 5 ? (
            <p className="error">{errors.username}</p>
          ) : null}
        </label>

        <label htmlFor="password" className="loginPassword">
          Enter password
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            value={login.password}
            minLength="7"
            placeholder="       Enter password"
          />
          {errors.password.length > 7 ? (
            <p className="error">{errors.password}</p>
          ) : null}
        </label>
        <Button color="warning"disabled={buttonDisable} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
