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
      phone: "",
      password: "",
    };
  }
  componentDidMount() {
    let id = localStorage.getItem(`id`);
    const url = `https://lambda-sprout.herokuapp.com/api/user/${id}`
    this.setState({ id: id });
    try {
      axios
        .get(url, { headers: { Authorization: localStorage.getItem("token") } })
        .then((res) => {
          this.setState({
            username: res.data.username,
            phone: res.data.phone,
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
        <h3>Phone : {this.state.phone}</h3>
      </div>
    );
  }
}
export default withRouter(UserProfile);
//withRouter gives component access to this.props.history, which means the component redirect the user.