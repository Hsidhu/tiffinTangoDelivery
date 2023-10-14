
export const BASKET_ADD_REQUEST = 'BASKET_ADD_REQUEST'
export const BASKET_ADD_SUCCESS = 'BASKET_ADD_SUCCESS'


export function addToBasketRequest(id) {
  return {
    type: BASKET_ADD_REQUEST,
    id,
  };
}

export function addToBasketSuccess(product) {
  return {
    type: BASKET_ADD_SUCCESS,
    product,
  };
}
