import React from "react";
import axios from "axios";
import { config } from "../../../config.js";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loadProducts } from "../../../actions/product/productAction";

// component d'edition
class EditProduct extends React.Component {
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
    this.price = "";
    this.quantity = "";
    this.picture = "";
  }

  //change les attibuts
  onChangetext(type, text) {
    this[type] = text;
  }

  // sauvegarde les produits en bdd
  saveProduct(datas) {
    let id = this.props.params.id;
    axios
      .put(config.api_url + "/api/v1/product/update/" + id, datas, {
        headers: { "x-access-token": this.props.user.infos.token },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.props.loadProducts();
          this.setState({ navigate: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // sauvegarde les produits entièrement avec les photos en plus
  saveCompleteProduct(photo) {
    if (this.state.selectedFile === null) {
      let datas = {
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        picture: this.picture,
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
        console.log(response);
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

  onSubmitForm(photo) {
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
      this.saveCompleteProduct(photo);
    }
  }

  render() {
    let id = this.props.params.id;
    let index;

    index = this.props.product.products.findIndex(
      (product) => product.id === parseInt(id)
    );
    this.name = this.props.product.products[index].name;
    this.description = this.props.product.products[index].description;
    this.quantity = this.props.product.products[index].quantity;
    this.price = this.props.product.products[index].price;
    this.picture = this.props.product?.products[index]?.picture;

    // }

    if (this.state.navigate) {
      return <Navigate to="/admin" />;
    }
    return (
      <div>
        <h2>Modifier le produit</h2>
        {this.state.error !== null && <p>{this.state.error}</p>}
        {this.props.product.products.length > 0 && (
          <form
            className="b-form"
            onSubmit={(e) => {
              e.preventDefault();
              this.onSubmitForm(this.props.product.products[index].photo);
            }}
          >
            <input
              type="text"
              placeholder="Nom du produit"
              defaultValue={this.name}
              onChange={(e) => {
                this.onChangetext("name", e.currentTarget.value);
              }}
            />
            <input
              type="file"
              onChange={(e) => {
                console.log(e.currentTarget.files[0]);
                this.setState(
                  { selectedFile: e.currentTarget.files[0] },
                  () => {
                    console.log(this.state.selectedFile);
                  }
                );
              }}
            />
            <textarea
              type="text"
              name="description"
              onChange={(e) => {
                this.onChangetext("description", e.currentTarget.value);
              }}
            >
              {this.description}
            </textarea>

            <input
              type="text"
              placeholder="Quantité"
              defautlValue={this.quantity}
              onChange={(e) => {
                this.onChangetext("quantity", e.currentTarget.value);
              }}
            />
            <input
              type="text"
              placeholder="Prix de de vente"
              defaultValue={this.price}
              onChange={(e) => {
                this.onChangetext("price", e.currentTarget.value);
              }}
            />
            <input type="submit" name="Enregister" />
          </form>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
