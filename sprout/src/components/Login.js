import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Button } from 'reactstrap';
import Navbar from './Navbar'

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
      <h1>LOGIN</h1>
      <form onSubmit={submitLogin}>
        <label htmlFor="loginUsername" className="loginUsername">
          Enter username
          <input
            type="text"
            id="loginUsername"
            name="loginUsername"
            required
            onChange={handleChange}
            value={login.loginUsername}
            placeholder="       Enter username"
          />
          {errors.loginUsername.length > 6 ? (
            <p className="error">{errors.loginUsername}</p>
          ) : null}
        </label>

        <label htmlFor="loginPassword" className="loginPassword">
          Enter password
          <input
            type="password"
            id="loginPassword"
            name="loginPassword"
            required
            onChange={handleChange}
            value={login.loginPassword}
            minLength="10"
            placeholder="       Enter password"
          />
          {errors.loginPassword.length > 10 ? (
            <p className="error">{errors.loginPassword}</p>
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
