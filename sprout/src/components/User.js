import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import img from "../img/user.jpg"


function User(props) {

    const name = localStorage.getItem('username');
    const id = Number(localStorage.getItem('id'));
    let history = useHistory();
    // The useHistory hook gives you access to the history instance that you may use to navigate.

    const [updatedUser, setUpdatedUser] = useState({
        password: '',
        phoneNumber: ''
    })

    const [err, setErr] = useState('');

    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    }

    const updateAccount = (user) => {

        if (user.phoneNumber === '' || user.password === '') {
            setErr('Please fill out both of the fields.');
            return;
        }
        else if (user.phoneNumber.length !== 10 ) {
            setErr('Please enter a valid phone number.');
            return;
        }
        else if (user.password.length < 4 || user.password.length >= 16) {
            setErr('Your password must be between 4 and 16 characters.');
            return;
        }

        axiosWithAuth().put(`/users/${id}`, user)
            .then((res) => {
                console.log(res);
                history.push(`/plants`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            <div className="usercard">
          

                <div className="card-info">
                    <h3>Hey! <span className="strong">{name}</span></h3>
                    <p>What would you like to update?</p>
                </div>
            </div>

            <h4>Update Account:</h4>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateAccount(updatedUser);
            }}>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="New Phone Number"
                    value={updatedUser.phoneNumber}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={updatedUser.password}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button className ="btn" type="submit">Update Account</button>
            </form>
            {err && <div className="error">{err}</div>}
        </Container>
    )
}

const Container = styled.div`
background-image: url(${img});
        background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
      width: 1500px;
      height: 1000px;

      form {
        display: flex;
        flex-direction: column;
        align-items: center;

    input {
        margin: 0.5rem 0;
        width: 20rem;
        height: 2.5rem;
        background: #bfbfbf;
        border: none;
        border-radius: 0.3rem;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        font-size: 1.2rem;
        font-weight: 300;
        letter-spacing: 0.1rem;
        &:focus {
            outline: none;
        border: 1px solid #ababab;
    }
}

      

      h3 {
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
    }

    h4 {
      margin: 2rem 0 2rem;
      font-size: 1.2em;
      font-weight: 300;
      letter-spacing: 0.1rem;
      color: red;
      padding-bottom: 1rem;
      border-bottom: 1px dotted #444444;
  }
  p {
font-size: 2rem;
        font-weight: 500;
        letter-spacing: 0.1rem;
}
.strong {
    font-weight: 700;
}

.input{
  margin: 5px;
  height: 25px;
  width : 300px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 4px #272727;
  text-align:center;
  @media(max-width: 479px){
      width: 250px;
  }
}
button{
background-color: #009FB7;
border-radius: 5px;
color : white;
margin: 10px;
height: 30px;
border: none;       
}
button:hover{
  box-shadow: 0 2px 4px #272727;
  transform: scaleX(1.025) scaleY(1.025);
  cursor : pointer;
  transition: all 0.2s;
}
.error {
margin-top: 2rem;
width: 100%;
text-align: center;
color: red;
font-size: 1.4rem;
font-weight: 300;
letter-spacing: 0.1rem;
}


      `

  const usercard = styled.div`
    box-shadow: 0px 2px 2px #9464FA;
    text-align : center;
    width: 400px;
    border-radius: 5px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin: 50px auto;
    


    
    
  `
      

export default User;


  // .user-card {
    //     display: flex;
    //     justify-content: space-evenly;
    //     align-items: center;
    //     background: #d1ffd6;
    //     width: 100%;
    //     padding: 1.rem 1rem;
    //     border-radius: 0.3rem;
    //     letter-spacing: 0.1rem;
    //     color: #444444;
    //     box-shadow: 0px 2px 5px -5px;
    //     .card-avatar {
    //         width: 25%;
    //         img {
    //             width: 100%;
    //             object-fit: cover;
    //             border: 1px solid #444444;
    //             border-radius: 50%;
    //         }    