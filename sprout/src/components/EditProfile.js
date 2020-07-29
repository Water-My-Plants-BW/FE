import React from "react";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

class UserProfile extends React.Component {
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
    let id = localStorage.getItem(`userId`);
    const url = `https://lambda-sprout.herokuapp.com/api/users/${id}`

    this.setState({ id: id });
    try {
      axios
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
        .then((res) => {
          this.setState({
            username: res.data.username,
            phoneNumber: res.data.phoneNumber,
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h3>Name : {this.state.username}</h3>
        <h3>phone# : {this.state.phoneNumber}</h3>
      </div>
    );
  }
}

export default withRouter(UserProfile);
//withRouter gives component access to this.props.history, which means the component redirect the user.
