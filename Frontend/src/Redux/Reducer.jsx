
 const initialState = {
    cart :[]
 }
const Reducer = (state = initialState , {type , payload}) => {
  switch(type){
    case "addToCart" :
        return{
            ...state,
            cart : [...state.cart , payload]
  }

  case "removeFromCarts" : 
  return{
         ...state,
         cart: state.cart.filter(item => item.id !== payload)
  }

  case "initializeCarts" :
    return {
      ...state,
      cart : payload
    }

  default: 
  return state;
  }
}

export default Reducer