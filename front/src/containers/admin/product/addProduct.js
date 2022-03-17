import React from "react";
import axios from "axios";
import { config } from "../../../config.js";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loadProducts } from "../../../actions/product/productAction";

// page d'ajout d'un produit'
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      error: null,
      navigate: false,
    };
    // on enregistre les données de formulaire
    // hors des state pour
    this.name = "";
    this.description = "";
    this.quantity = "";
    this.price = "";
  }

  //change les attibuts
  onChangetext(type, text) {
    this[type] = text;
  }

  // sauvegarde les produits en bdd
  saveProduct(datas) {
    axios
      .post(config.api_url + "/api/v1/product/save", datas, {
        headers: { "x-access-token": this.props.user.infos.token },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.props.loadProducts();
          this.setState({ navigate: true });
        }
      });
  }

  // sauvegarde les produits entièrement avec les photos
  saveCompleteProduct() {
    if (this.state.selectedFile === null) {
      let datas = {
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        picture: "no-pict.jpg",
      };

      this.saveProduct(datas);
    } else {
      let formData = new FormData();
      formData.append("image", this.state.selectedFile);
      // enregistrement de la photo
      axios({
        method: "post",
        url: config.api_url + "/api/v1/product/pict",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": this.props.user.infos.token,
        },
      }).then((response) => {
        if (response.data.status === 200) {
          let datas = {
            name: this.name,
            description: this.description,
            quantity: this.quantity,
            price: this.price,
            picture: response.data.url,
          };
          // lorsque l'image est sauvegardé on sauvegarde le produit
          this.saveProduct(datas);
        }
      });
    }
  }

  // Envoie du formulaire
  onSubmitForm() {
    if (
      this.name === "" ||
      this.description === "" ||
      this.price === "" ||
      this.quantity === ""
    ) {
      this.setState({ error: "Tous les champs ne sont pas encore remplis !" });
    } else if (isNaN(this.quantity) || isNaN(this.price)) {
      this.setState({
        error: "Les champs Prix et quantités doivent être des chiffres ! ",
      });
    } else {
      this.saveCompleteProduct();
    }
  }

  render() {
    if (this.state.navigate) {
      return <Navigate to="/admin" />;
    }
    return (
      <div>
        <h2>Ajoutez un produit</h2>
        {this.state.error !== null && <p>{this.state.error}</p>}
        <form
          className="b-form"
          onSubmit={(e) => {
            e.preventDefault();
            this.onSubmitForm();
          }}
        >
          <input
            type="text"
            placeholder="Nom du produit"
            onChange={(e) => {
              this.onChangetext("name", e.currentTarget.value);
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              this.setState(
                { selectedFile: e.currentTarget.files[0] },
                () => {}
              );
            }}
          />
          <textarea
            type="text"
            name="description"
            onChange={(e) => {
              this.onChangetext("description", e.currentTarget.value);
            }}
          ></textarea>

          <input
            type="text"
            placeholder="Quantité"
            onChange={(e) => {
              this.onChangetext("quantity", e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="Prix de vente"
            onChange={(e) => {
              this.onChangetext("price", e.currentTarget.value);
            }}
          />
          <input type="submit" name="Enregister" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    product: store.products,
    user: store.user,
  };
};
const mapDispatchToProps = {
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
