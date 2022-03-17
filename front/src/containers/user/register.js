import React from "react";
import axios from "axios";
// import {config} from '../../config';
import { Navigate } from "react-router-dom";

// page d'enregistrement d'un utilisateur
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      navigate: false,
    };
    // on enregistre les données de formulaire
    // hors des state pour
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.address = "";
    this.zip = "";
    this.city = "";
    this.country = "";
    this.phone = "";
  }
  //change les attibuts
  onChangetext(type, text) {
    this[type] = text;
  }

  // on envoie le formulaire
  onSubmitForm = () => {
    let datas = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      address: this.address,
      zip: this.zip,
      city: this.city,
      country: this.country,
      phone: this.phone,
    };
    // envoie le formulaire vers l'api
    axios
      .post("http://localhost:8000/api/v1/user/save", datas)
      .then((response) => {
        this.setState({ navigate: true });
      })
      .catch((err) => console.log(err));
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
            placeholder="Votre Prénom"
            onChange={(e) => {
              this.onChangetext("firstName", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Votre Nom"
            onChange={(e) => {
              this.onChangetext("lastName", e.currentTarget.value);
            }}
          />
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
          <input
            type="text"
            placeholder="Votre Adresse"
            onChange={(e) => {
              this.onChangetext("address", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Votre Code postal"
            onChange={(e) => {
              this.onChangetext("zip", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Votre Ville"
            onChange={(e) => {
              this.onChangetext("city", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Votre pays"
            onChange={(e) => {
              this.onChangetext("country", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Votre téléphone"
            onChange={(e) => {
              this.onChangetext("phone", e.currentTarget.value);
            }}
          />

          <input type="submit" name="Enregister" />
        </form>
      </div>
    );
  }
}

export default Register;
