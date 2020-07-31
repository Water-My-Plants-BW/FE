import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from 'axios';
import styled  from 'styled-components';
import img from '../images/plants.jpg'

const signUpSchema = yup.object().shape({
  username: yup.string().min(6,"minimum of 6 characters required").required("Username is a required field"),
  phoneNumber: yup.string().min(12,"Please use 111-111-1111 format").required(),
  password: yup.string().min(10,"minimum of 10 characters required").required()

})

function Signup() {
  const [signUp, setSignUp] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });

  const  [errors, setErrors]= useState({
    username: "",
    phoneNumber: "",
    password: "",
  })

const [buttonDisabled, setButtonDisabled] = useState(true);

 const [post, setPost]= useState([]);

useEffect(() => {
  signUpSchema.isValid(signUp).then(valid => {
    setButtonDisabled(!valid);
  })
}, [signUp])

const validateChange = event => {
  yup.reach(signUpSchema, event.target.name)
  .validate(event.target.value)
  .then(valid => {
    setErrors({
      ...errors, [event.target.name] : ""
    })
  })
  .catch(error =>{
    setErrors({
      ...errors, [event.target.name] : error.errors[0]

    })
  })
}

  const handleChanges = (event) => {
    event.persist();
    const newSignUp = {
...signUp, [event.target.name] : event.target.value

    }
    validateChange(event);
    setSignUp(newSignUp)
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post("https://lambda-sprout.herokuapp.com/register", signUp)
    .then(res => {
      setPost(res.data);
      console.log("Registered!", post);
      
      setSignUp({
    username: "",
    phoneNumber: "",
    password: "",

      })

    })
  };

  return (
    <div className="signup">
      <SignupContainer>
      <form onSubmit={submitForm}>
      <h1>Create Account!</h1>
        <label htmlFor="username" className="username">
          Create username:
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={handleChanges}
            value={signUp.username}
            placeholder="Create a unique username"
          />
          {errors.username.length > 6 ?<p className= "error">{errors.username}</p> : null}
        </label>

        <label htmlFor="phoneNumber" className="phone">
          Enter your phone number
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChanges}
            value={signUp.phoneNumber}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            placeholder="       123-456-7890"
          />
          {errors.phoneNumber.length > 12 ?<p className= "error">{errors.phoneNumber}</p> : null}
        </label>

        <label htmlFor="password" className="password">
          Create a password
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChanges}
            value={signUp.password}
            minLength="10"
            required
            placeholder="       Enter password"
          />
          {errors.password.length > 10 ?<p className= "error">{errors.password}</p> : null}
        </label>
        <button color="warning"disabled={buttonDisabled} type="submit">Sign Up</button>
      </form>
      </SignupContainer>
    </div>
  );
}
export const SignupContainer = styled.div`
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
export default Signup;
