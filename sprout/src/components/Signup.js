import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from 'axios';
import { Button } from 'reactstrap';

const signUpSchema = yup.object().shape({
  username: yup.string().min(6,"minimum of 6 characters required").required("Username is a required field"),
  phone: yup.string().min(12,"Please use 111-111-1111 format").required(),
  password: yup.string().min(10,"minimum of 10 characters required").required()

})

function Signup() {
  const [signUp, setSignUp] = useState({
    username: "",
    phone: "",
    password: "",
  });

  const  [errors, setErrors]= useState({
    username: "",
    phone: "",
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
    axios.post("https://reqres.in/api/users", signUp)
    .then(res => {
      setPost(res.data);
      console.log("Registered!", post);
      
      setSignUp({
    username: "",
    phone: "",
    password: "",

      })

    })
  };

  return (
    <div className="signup">
      <h1>SIGNUP</h1>
      <form onSubmit={submitForm}>
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

        <label htmlFor="phone" className="phone">
          Enter your phone number
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChanges}
            value={signUp.phone}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            placeholder="       123-456-7890"
          />
          {errors.phone.length > 12 ?<p className= "error">{errors.phone}</p> : null}
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
        <Button color="warning"disabled={buttonDisabled} type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
export default Signup;
