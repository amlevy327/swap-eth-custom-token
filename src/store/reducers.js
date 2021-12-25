import { combineReducers } from 'redux';

// WEB 3
function web3(state = {}, action) {
  switch (action.type) {
  case 'WEB3_LOADED':
      return { ...state, connection: action.connection }
  case 'WEB3_ACCOUNT_LOADED':
      return { ...state, loaded: true, account: action.account }
  default:
      return state
  }
}

// TOKEN

function token(state = {}, action) {
  switch(action.type) {
    case 'TOKEN_CONTRACT_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'TOKEN_BALANCE_LOADED':
      return { ...state, tokenBalance: { loaded: true, data: action.tokenBalance} }
    // case 'APPROVAL_FOR_ALL_LOADED':
    //     return { ...state, approvalForAll: { loaded: true, data: action.approvalForAll } } 
    // case 'APPROVING_EXCHANGE':
    //   return {
    //     ...state,
    //     approvalForAll: {
    //       loaded: false,
    //       data: [
    //         ...state.approvalForAll.data,
    //       ]
    //     }
    //   }
    // case 'EXCHANGE_APPROVED':
    //   return {
    //     ...state,
    //     approvalForAll: {
    //       loaded: true,
    //       data: [
    //         ...state.approvalForAll.data,
    //         action.approval
    //       ]
    //     }
    //   }
    default:
      return state
  }
}

// EXCHANGE

function exchange(state = {}, action) {
  let index, data

  switch(action.type) {
    case 'EXCHANGE_CONTRACT_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'DEPOSIT_AMOUNT_LOADED':
      return { ...state, loaded: true, depositAmount: action.depositAmount }
    case 'ALL_BETS_LOADED':
      return { ...state, allBets: { loaded: true, data: action.allBets} }
    case 'ACCEPTED_BETS_LOADED':
      return { ...state, acceptedBets: { loaded: true, data: action.acceptedBets} }
    case 'CANCELLED_BETS_LOADED':
      return { ...state, cancelledBets: { loaded: true, data: action.cancelledBets} }
    case 'CLOSED_BETS_LOADED':
      return { ...state, closedBets: { loaded: true, data: action.closedBets} }
    case 'WINNER_SUBMITTED_LOADED':
      return { ...state, winnerSubmitted: { loaded: true, data: action.winnerSubmitted} }
    case 'EXCHANGE_TOKEN_BALANCE_LOADED':
      return { ...state, exchangeTokenBalance: { loaded: true, data: action.exchangeTokenBalance} }
    case 'BALANCES_LOADING':
      return { ...state, balancesLoading: true }
    case 'BALANCES_LOADED':
      return { ...state, balancesLoading: false }
    case 'TOKEN_DEPOSIT_AMOUNT_CHANGED':
      return { ...state, tokenDepositAmount: action.amount }
    case 'TOKEN_WITHDRAW_AMOUNT_CHANGED':
      return { ...state, tokenWithdrawAmount: action.amount }
    case 'NEW_BET_NAME_CHANGED':
      return { ...state, newBet: { ...state.newBet, name: action.name } }
    case 'NEW_BET_TAKER_CHANGED':
      return { ...state, newBet: { ...state.newBet, taker: action.taker } }
    case 'NEW_BET_MAKER_AMOUNT_CHANGED':
      return { ...state, newBet: { ...state.newBet, amountMaker: action.amount } }
    case 'NEW_BET_TAKER_AMOUNT_CHANGED':
      return { ...state, newBet: { ...state.newBet, amountTaker: action.amount } }
    
    
        case 'BET_CREATING':
      return { ...state, betCreating: true }
    case 'BET_CREATED':
      // prevent duplicate orders
      index = state.allBets.data.findIndex(bet => bet.id === action.bet.id);
      
      if(index === -1) {
          data = [...state.allBets.data, action.bet]
      } else {
          data = state.allBets.data
      }

      return {
          ...state,
          betCreating: false,
          allBets: {
              ...state.allBets,
              data
          },
      }
    case 'BET_ACCEPTING':
      return { ...state, betAccepting: true }
    case 'BET_ACCEPTED':
      // prevent duplicate orders
      index = state.acceptedBets.data.findIndex(bet => bet.id === action.bet.id);
      
      if(index === -1) {
          data = [...state.acceptedBets.data, action.bet]
      } else {
          data = state.acceptedBets.data
      }

      return {
          ...state,
          betAccepting: false,
          acceptedBets: {
              ...state.acceptedBets,
              data
          },
      }
    case 'BET_CANCELLING':
      return { ...state, betCancelling: true }
    case 'BET_CANCELLED':
      // prevent duplicate orders
      index = state.cancelledBets.data.findIndex(bet => bet.id === action.bet.id);
      
      if(index === -1) {
          data = [...state.cancelledBets.data, action.bet]
      } else {
          data = state.cancelledBets.data
      }

      return {
          ...state,
          betCancelling: false,
          cancelledBets: {
              ...state.cancelledBets,
              data
          },
      }
    case 'BET_CLOSED':
      // prevent duplicate orders
      index = state.closedBets.data.findIndex(bet => bet.id === action.bet.id);
      
      if(index === -1) {
          data = [...state.closedBets.data, action.bet]
      } else {
          data = state.closedBets.data
      }

      return {
          ...state,
          betClosing: false,
          closedBets: {
              ...state.closedBets,
              data
          },
      }
    case 'SUBMITTING_WINNER':
      return { ...state, winnerSubmitting: true }
    case 'WINNER_SUBMITTED':
      // prevent duplicate orders
      index = state.winnerSubmitted.data.findIndex(bet => bet.id === action.bet.id);
      
      if(index === -1) {
          data = [...state.winnerSubmitted.data, action.bet]
      } else {
          data = state.winnerSubmitted.data
      }

      return {
          ...state,
          winnerSubmitting: false,
          winnerSubmitted: {
              ...state.winnerSubmitted,
              data
          },
      }
    default:
      return state
  }
}

// ROOT

const rootReducer = combineReducers({
  web3,
  token,
  exchange
})

export default rootReducer