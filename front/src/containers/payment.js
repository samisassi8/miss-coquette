import React from "react";
import CheckoutForm from "../components/checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";

//Payment page
class Payment extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  InjectedCheckoutForm = () => {
    // CB formulary
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm
            orderId={this.props.match.params.orderId}
            stripe={stripe}
            elements={elements}
          />
        )}
      </ElementsConsumer>
    );
  };
  render() {
    const stripePromise = loadStripe(
      "pk_test_51JLSY9GTJJamR6etkKSMkQWzP2CHF6Ge0CwAYEilIYLSMcBH2EWHadJOqoX6hlV5U1pNufyhhPxdAWWDtgjAfDS700eGWKC67H"
    );

    return (
      <div>
        <h2>Paiement</h2>
        <Elements stripe={stripePromise}>
          {this.InjectedCheckoutForm()}
        </Elements>
      </div>
    );
  }
}

export default Payment;
