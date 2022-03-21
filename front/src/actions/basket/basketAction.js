import { MODIFY_BASKET, CLEAN_BASKET } from "./actions-types";

// add article in the cart (basket)
export const addToBasket = (basket, newProduct, quantityInCart) => {
  return function (dispatch) {
    //on recherche l'index (findIndex) si le produit est déjà présent dans le panier
    // si on trouve un produit same renvoie un index, sinon -1
    let same = basket.findIndex((b) => b.id === newProduct.id);
    if (same === -1) {
      // dans ce cas le produit n'existe pas on l'ajoute au
      // tableau basket
      newProduct.quantityInCart = parseInt(quantityInCart);
      basket.push(newProduct);
      // sinon on ajoute juste la quantityInCart
    } else {
      basket[same].quantityInCart += parseInt(quantityInCart);
    }
    // on ajoute avant redux le localstorage
    let lsBasket = JSON.stringify(basket);
    window.localStorage.setItem("mc-basket", lsBasket);
    // on envoie le basket à redux (dispatch)
    dispatch({
      type: MODIFY_BASKET,
      payload: basket,
    });
  };
};

// on supprime un article du panier
export const deleteToBasket = (basket, product) => {
  return function (dispatch) {
    // filter recréé un nouveau tableau en fonction de la condition
    let newBasket = basket.filter(
      (basketProduct) => basketProduct.id !== product.id
    );

    //on met à jour le localStorage
    let lsBasket = JSON.stringify(newBasket);
    window.localStorage.setItem("mc-basket", lsBasket);
    //on renvoi la réponse dans le dispatch
    dispatch({
      type: MODIFY_BASKET,
      payload: newBasket,
    });
  };
};

export const cleanBasket = () => {
  console.log("action clean");
  return function (dispatch) {
    dispatch({
      type: CLEAN_BASKET,
      payload: null,
    });
  };
};
