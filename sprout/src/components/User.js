import React from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import img from "../img/user.jpg"

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phoneNumber: "",
      password: "",
    };
  }
  componentDidMount() {
    let id = localStorage.getItem(`userId`);
    const url = `https://lambda-sprout.herokuapp.com/api/users/${id}`;
    this.setState({ id: id });
    
      // The try statement lets you test a block of code for errors. The catch statement lets you handle the error. 
      try {
        axios
            .get(url, { headers: { token: localStorage.getItem("token") } })
            .then(res => {
                this.setState({ username: res.data.username,  phoneNumber: res.data.phoneNumber})
            })
    } catch (err) {
        console.log(err);
    }
}

  handleInput = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  updateInfo = (data, id) => {
    data = {
      username: this.state.username,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
    };
    id = localStorage.getItem(`userId`);
    console.log(id);
    const url =
      `https://lambda-sprout.herokuapp.com//api/users/${id}` ||

              `http://localhost:3000/api/users/${id}`;

      // The try statement lets you test a block of code for errors. The catch statement lets you handle the error. The throw statement lets you create custom errors. 
      try{
      axios
        .put(url, data, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          this.setState({
            username: res.data.username,
            phoneNumber: res.data.phoneNumber,
            password: res.data.password,
          });
          alert("Your Update Submitted Successfully");
          console.log(res.data.phoneNumber);
          // this.props.history.push("/plants");
        });
    } catch (err) {
      console.log(err);
    }
  };

  deleteMyAccount = (id) => {
    id = localStorage.getItem(`userId`);
    const url =
    `https://lambda-sprout.herokuapp.com/api/users/${id}` ||
      `http://localhost:3000/api/users/${id}`;
      
    alert("Your Account Will be deleted permanantly");
    try {
      axios.delete(url).then((res) => {
        console.log(res);
        localStorage.clear();
        sessionStorage.clear();
        alert("Your Account deleted Successfully");
        this.props.history.push("/");
        window.location.reload(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Wrapper>
      <UserBar>
        <div className ='loginform'>
          <form onSubmit= {this.updateInfo}>
              <input
                  className='input'
                  onChange={this.handleInput}
                  placeholder="name"
                  value={this.state.username}
                  name="username"
              />
              <input
                  className='input'
                  type= 'password'
                  onChange={this.handleInput}
                  placeholder=" new password"
                  value={this.state.password}
                  name="password"
              />
              <input
                  className='input'
                  onChange={this.handleInput}
                  placeholder="phone#"
                  value={this.state.phoneNumber}
                  name="phone"
              />
          </form>

          <div className="btn">
              <button onClick={this.deleteMyAccount}> Delete My Account permanantly</button>
              <button className="updateBtn" onClick={this.updateInfo}>Update</button>
          </div>
        
          </div>
      </UserBar>
  </Wrapper>
)
}
}

export default withRouter(User);


const Wrapper =styled.div`
        background-image: url(${img});
        background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
      width: 1500px;
      height: 1000px;
`
const UserBar = styled.div`
    box-shadow: 0px 2px 2px #9464FA;
    text-align : center;
    width: 400px;
    border-radius: 5px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin: 50px auto;
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
      }
    }
  `


