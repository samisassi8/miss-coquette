import React from "react";
import axios from "axios";
import { config } from "../../config.js";
import { Navigate } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      navigate: false,
    };

    this.email = "";
    this.password = "";
  }

  onChangetext(type, text) {
    this[type] = text;
  }

  onSubmitForm = () => {
    let datas = {
      email: this.email,
      password: this.password,
    };

    axios
      .post(config.api_url + "/api/v1/user/login", datas)
      .then((response) => {
        if (response.data.status === 200) {
          window.localStorage.setItem("mc-token", response.data.token);
          this.setState({ navigate: true });
        }
      })
      .catch((err) => {
        return err;
      });
  };
  render() {
    if (this.state.navigate) {
      return <Navigate to="/" />;
    }

    return (
      <div>
        <form
          className="b-form"
          onSubmit={(e) => {
            e.preventDefault();
            this.onSubmitForm();
          }}
        >
          <input
            type="text"
            placeholder="Votre Mail"
            onChange={(e) => {
              this.onChangetext("email", e.currentTarget.value);
            }}
          />
          <input
            type="password"
            placeholder="Votre Mot de passe"
            onChange={(e) => {
              this.onChangetext("password", e.currentTarget.value);
            }}
          />

          <input type="submit" name="Enregister" />
        </form>
      </div>
    );
  }
}

export default Login;
