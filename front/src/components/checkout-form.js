import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { config } from "../config";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

// cb formulary
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
    };
  }

  // sending formulary
  handleSubmit = async (event) => {
    event.preventDefault();

    let data = {
      email: this.props.user.infos.email,
      orderId: this.props.orderId,
    };

    //Stripe payment
    const paymentAuth = await axios.post(
      config.api_url + "/api/v1/order/payment",
      data,
      { headers: { "x-access-token": this.props.user.infos.token } }
    );

    const secret = paymentAuth.data.client_secret;
    const payment = await this.props.stripe.confirmCardPayment(secret, {
      payment_method: {
        card: this.props.elements.getElement(CardElement),
        billing_details: {
          email: this.props.user.infos.email,
        },
      },
    });

    // Error case
    if (payment.error) {
    } else {
      // If payment successful
      if (payment.paymentIntent.status === "succeeded") {
        let data = {
          orderId: this.props.orderId,
          status: "payed",
        };
        // write in db payed status
        axios
          .put(config.api_url + "/api/v1/order/validate", data, {
            headers: { "x-access-token": this.props.user.infos.token },
          })
          .then((response) => {
            this.setState({ navigate: true });
          });
      }
    }
  };

  render() {
    if (this.state.navigate) {
      return <Navigate to="/success" />;
    }
    const { stripe } = this.props;
    //
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

// store redux
const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
