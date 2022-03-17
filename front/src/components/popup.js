import React from "react";
import winwin from "../assets/logo/thumb_up.jpg";

// popup de validation d'ajout de produit au panier
class Popup extends React.Component {
  render() {
    return (
      <div>
        {this.props.isPopUp && (
          <div className="popUp">
            <p
              className="closePopUp"
              onClick={(e) => {
                this.props.onClickClose();
              }}
            >
              X
            </p>
            <h4>Félicitation</h4>
            <p>{this.props.msg}</p>
            <img src={winwin} alt="" />
            <button
              className="closePopUp"
              onClick={(e) => {
                this.props.onClickClose();
              }}
            >
              Retour aux achats
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Popup;
