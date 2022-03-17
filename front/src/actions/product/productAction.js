import {LOAD_PRODUCTS} from './actions-types';
import axios from 'axios';
import {config} from '../../config';

// action de chargement des produits
export const loadProducts = ()=>{
    return function(dispatch) {
        axios.get(config.api_url+"/api/v1/product/all")
            .then((response)=>{
                dispatch({
                    type: LOAD_PRODUCTS,
                    payload: response.data.result
                })
            })
    }
}