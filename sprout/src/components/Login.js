import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Button } from 'reactstrap';
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
    <Navbar />
    <LoginContainer> 
      <form onSubmit={submitLogin}>
      <h1>LOGIN</h1>
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
        <button color="warning"disabled={buttonDisable} type="submit">
          Log In
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
