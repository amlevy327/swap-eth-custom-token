import { combineReducers } from "redux"

// WEB3
function web3(state = {}, action) {
  switch(action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.connection}
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    default:
      return state
  }
}

// TOKEN
function token(state = {}, action) {
  switch(action.type) {
    case 'NEW_PURCHASE_AMOUNT_CHANGED':
      return { ...state, newPurchase: { ...state.newPurchase, amountWei: action.amountWei, amountCustomToken: action.amountCustomToken } }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  web3,
  token
})

export default rootReducer