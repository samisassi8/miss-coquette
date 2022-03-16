import { MODIFY_BASKET, CLEAN_BASKET } from "../actions/basket/actions-types";

//on récupère le localstorage que l'on transforme au format objet qu'on stock dans une variable isBasket
let lsBasket = JSON.parse(window.localStorage.getItem("mc-basket"));
//si isBasket est null
if (lsBasket === null) {
  lsBasket = [];
}

//création d'une variable totalPrice qui va récupérer le montant total de isBasket (fonction)
let totalPrice = calculateTotalAmount(lsBasket);

//on initialise notre state on glisse dedans le panier et le montant total
const initialState = {
  basket: lsBasket,
  totalPrice: totalPrice,
};

function calculateTotalAmount(basket) {
  //on initialise une variable totalPrice à 0
  let montantTotal = 0;
  //boucle de ses morts (for) qui va ajouter le prix (en fonction de la quantité) de chaque article au montant total
  for (let i = 0; i < basket.length; i++) {
    let total = parseInt(basket[i].price) * parseInt(basket[i].quantityInCart);
    montantTotal += total;
  }

  //retourne le montant total
  return montantTotal;
}

export default function BasketReducer(state = initialState, action) {
  switch (action.type) {
    case MODIFY_BASKET:
      //calcul du montant total du panier envoyé dans le payload
      let totalPrice = calculateTotalAmount(action.payload);
      //envoi du panier avec son montant total dans la state vers le store
      return { basket: action.payload, totalPrice: totalPrice };
    case CLEAN_BASKET:
      //on renvoi un panier vide avec le montant total à zero dans le store
      return { basket: [], totalPrice: 0 };
    default:
      return state;
  }
}
