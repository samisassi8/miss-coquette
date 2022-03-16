import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { config } from "../config";
import axios from "axios";

//  gestion de la page profil utilisateur
// codage en hook

const Profil = (props) => {
  // gestion de tous les states (firstName, lastName, address, zip, country, city, phone, msg)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState(null);

  // s'execute à tous les changement de props (useEffect) écrase nos states par les valeurs dans le store
  useEffect(() => {
    console.log(props);
    setFirstName(props.user.infos.firstName);
    setLastName(props.user.infos.lastName);
    setAddress(props.user.infos.address);
    setCity(props.user.infos.city);
    setZip(props.user.infos.zip);
    setCountry(props.user.infos.country);
    setPhone(props.user.infos.phone);
  }, [props]);

  // on envoie le formulaire d'edition vers l'api
  const onSubmitForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      zip: zip,
      country: country,
      city: city,
      phone: phone,
    };
    console.log(data);
    axios
      .put(
        config.api_url + "/api/v1/user/update/" + props.user.infos.id,
        data,
        { headers: { "x-access-token": props.user.infos.token } }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setMsg("Le profil a bien été modifié !");
          window.location.reload(); //raffraichit la page
        } else {
          setMsg("Echec de la modification");
        }
      });
  };

  return (
    <div>
      {msg !== null && <p>{msg}</p>}
      <h2>Mon profil</h2>
      {/* FORMULAIRE */}
      {props.user.isLogged && (
        <form
          className="b-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitForm();
          }}
        >
          <input
            type="text"
            placeholder="Prénom"
            value={props.user.infos.firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Nom"
            value={props.user.infos.lastName}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Adresse"
            value={props.user.infos.address}
            onChange={(e) => {
              setAddress(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Code postal"
            value={props.user.infos.zip}
            onChange={(e) => {
              setZip(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Ville"
            value={props.user.infos.city}
            onChange={(e) => {
              setCity(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Pays"
            value={props.user.infos.country}
            onChange={(e) => {
              setCountry(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={props.user.infos.phone}
            onChange={(e) => {
              setPhone(e.currentTarget.value);
            }}
          />
          <input type="submit" name="Modifier" />
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
