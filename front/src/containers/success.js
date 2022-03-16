import React from "react";
import { Link } from "react-router-dom";
import { cleanBasket } from "../actions/basket/basketAction";
import { connect } from "react-redux";

//Page de succès de la commande
class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.localStorage.removeItem("mc-basket");
    this.props.cleanBasket();
  }

  render() {
    let id = this.props.params.orderId;
    return (
      <div>
        <p>Votre commande n°{id} a été effectué avec succès</p>
        <Link to="/">Retour</Link>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    cart: store.basket,
  };
};
const mapDispatchToProps = {
  cleanBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
