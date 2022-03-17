import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/user/userAction";
import { Navigate } from "react-router-dom";

//page de déconnexion
class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
    };
  }

  componentDidMount() {
    window.localStorage.removeItem("mc-token");
    this.props.logoutUser();
    this.setState({ navigate: true });
  }

  render() {
    return <Navigate to="/" />;
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
