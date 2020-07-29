import React from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      id: "",
      phoneNumber: "",
      password: "",
    };
  }
  componentDidMount() {
    let id = localStorage.getItem(`useId`);
    const url = `https://lambda-sprout.herokuapp.com/api/users/${id}`;
    this.setState({ id: id });
    
      // The try statement lets you test a block of code for errors. The catch statement lets you handle the error. 
      try {
        axios
            .get(url, { headers: { Authorization: localStorage.getItem("token") } })
            .then(res => {
                this.setState({ username: res.data.username,  phoneNumber: res.data.phoneNumber})
            })
    } catch (err) {
        console.log(err);
    }
}

  handleInput = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  updateInfo = (data, id) => {
    data = {
      username: this.state.username,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
    };
    id = localStorage.getItem(`useId`);
    console.log(id);
    const url =
      `https://lambda-sprout.herokuapp.com//api/users/${id}` ||

              `http://localhost:3000/api/users/${id}`;

      // The try statement lets you test a block of code for errors. The catch statement lets you handle the error. The throw statement lets you create custom errors. 
      try{
      axios
        .put(url, data, {
          headers: { Authorization: localStorage.getItem("token") },
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
          this.props.history.push("/plants");
        });
    } catch (err) {
      console.log(err);
    }
  };

  deleteMyAccount = (id) => {
    id = localStorage.getItem(`useId`);
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
          <div className="loginform">
            <form onSubmit={this.updateInfo}>
              <input
                className="input"
                onChange={this.handleInput}
                placeholder="name"
                value={this.state.username}
                name="username"
              />
              <input
                className="input"
                type="password"
                onChange={this.handleInput}
                placeholder=" new password"
                value={this.state.password}
                name="password"
              />
 
              <input
                className="input"
                onChange={this.handleInput}
                placeholder="phoneNumber"
                value={this.state.phoneNumber}
                name="phone"
              />
            </form>

            <div className="btn">
              <button onClick={this.deleteMyAccount}>
                {" "}
                Delete My Account permanantly
              </button>
              <button className="updateBtn" onClick={this.updateInfo}>
                Update
              </button>
            </div>
          </div>
    );
  }
}
export default withRouter(User);
