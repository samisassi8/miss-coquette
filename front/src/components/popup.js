import React from "react";

// popup de validation d'ajout de produit au panier
class Popup extends React.Component {
  render() {
    return (
      <div>
        {this.props.isPopUp && (
          <div
            className="popUp"
            onClick={(e) => {
              this.props.onClickClose();
            }}
          >
            <p>{this.props.msg}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Popup;
