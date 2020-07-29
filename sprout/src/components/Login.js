import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import img from "../images/plants.jpg";

const loginSchema = yup.object().shape({
  loginUsername: yup
    .string()
    .min(6, "minimum of 6 characters required")
    .required(),
  loginPassword: yup
    .string()
    .min(10, "minimum of 10 characters required")
    .required(),
});

function Login() {
  const [login, setLogin] = useState({
    loginusername: "",
    loginPassword: "",
  });

  const [errors, setErrors] = useState({
    loginUsername: "",
    loginPassword: "",
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
    axios.post("https://reqres.in/api/users", login).then((res) => {
      setPost(res.data);
      console.log("logged in", post);

      setLogin({
        loginUsername: "",
        loginPassword: "",
      });
    });
  };

  return (
    <div className="login">
      <Navbar />
      <LoginContainer>
        <form onSubmit={submitLogin}>
          <h1>LOG IN</h1>
          <label htmlFor="loginUsername" className="loginUsername">
            Username
            <input
              type="text"
              id="loginUsername"
              name="loginUsername"
              required
              onChange={handleChange}
              value={login.loginUsername}
              placeholder="   Enter username"
            />
            {errors.loginUsername.length > 6 ? (
              <p className="error">{errors.loginUsername}</p>
            ) : null}
          </label>

          <label htmlFor="loginPassword" className="loginPassword">
            Password
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              required
              onChange={handleChange}
              value={login.loginPassword}
              minLength="10"
              placeholder="   Enter password"
            />
            {errors.loginPassword.length > 10 ? (
              <p className="error">{errors.loginPassword}</p>
            ) : null}
          </label>
          <button disabled={buttonDisable} type="submit">
            LOG IN
          </button>
        </form>
      </LoginContainer>
    </div>
  );
}

export const LoginContainer = styled.div`
  .signup .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    background-image: url(${img});
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
    font-size: 1.4rem;
  }

  input,
  textarea {
    width: 100%;
    margin: 5px 0 0;
    display: block;
    width: 95%;
    border: 1px solid #242829;
    border-radius: 0.6 rem;
    padding: 10px;
    transition: all 0.3s;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    background-color: transparent;
    color: #373e3f;
    font-family: "Bebas Neue", cursive;
  }
  button {
    width: fit-content;
    background-color: #c8713d;
    font-size: 2.5rem;
    padding: 0.5rem 2.5rem;
    border-radius: 0.6rem;
    border: 4px solid #242829;
    font-family: "Bebas Neue", cursive;
    color: #f5f5f5;
  }
`;

export default Login;
