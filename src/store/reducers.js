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
  let index, data

  switch(action.type) {
    case 'TOKEN_CONTRACT_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'TOKEN_INFO_LOADED':
      return { ...state, tokenInfo: { ...state.tokenInfo, loaded: true, name: action.name, symbol: action.symbol, decimals: action.decimals, exchangeRate: action.exchangeRate } }
    case 'EXCHANGE_RATE_UPDATES_LOADED':
      return { ...state, exchangeRateUpdates: { loaded: true, data: action.exchangeRateUpdates} }
    case 'PURCHASES_LOADED':
      return { ...state, purchases: { loaded: true, data: action.purchases} }
    case 'PURCHASE_CREATING':
        return { ...state, purchaseCreating: true }
    case 'PURCHASE_CREATED':
      // prevent duplicate orders
      index = state.purchases.data.findIndex(purchase => purchase.id === action.purchase.id);
      
      if(index === -1) {
          data = [...state.purchases.data, action.purchase]
      } else {
          data = state.purchases.data
      }
      
      return {
          ...state,
          purchaseCreating: false,
          purchases: {
              ...state.purchases,
              data
          },
      }
    case 'NEW_PURCHASE_AMOUNT_CHANGED':
      return { ...state, newPurchase: { ...state.newPurchase, amountWei: action.amountWei, amountCustomToken: action.amountCustomToken } }
    case 'PURCHASES_LOADING':
      return { ...state, purchasesLoading: true }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  web3,
  token
})

export default rootReducer