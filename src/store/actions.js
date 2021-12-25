// WEB3

export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

// TOKEN

export function tokenContractLoaded(contract) {
  return {
    type: 'TOKEN_CONTRACT_LOADED',
    contract
  }
}

export function tokenBalanceLoaded(tokenBalance) {
  return {
    type: 'TOKEN_BALANCE_LOADED',
    tokenBalance
  }
}

export function approvalForAllLoaded(approvalForAll) {
  return {
    type: 'APPROVAL_FOR_ALL_LOADED',
    approvalForAll
  }
}

export function approvingExchange() {
  return {
    type: 'APPROVING_EXCHANGE'
  }
}


export function exchangeApproved(approval) {
  return {
    type: 'EXCHANGE_APPROVED',
    approval
  }
}

// EXCHANGE

export function exchangeContractLoaded(contract) {
  return {
    type: 'EXCHANGE_CONTRACT_LOADED',
    contract
  }
}

export function depositAmountLoaded(depositAmount) {
  return {
    type: 'DEPOSIT_AMOUNT_LOADED',
    depositAmount
  }
}

export function allBetsLoaded(allBets) {
  return {
    type: 'ALL_BETS_LOADED',
    allBets
  }
}

export function acceptedBetsLoaded(acceptedBets) {
  return {
    type: 'ACCEPTED_BETS_LOADED',
    acceptedBets
  }
}

export function cancelledBetsLoaded(cancelledBets) {
  return {
    type: 'CANCELLED_BETS_LOADED',
    cancelledBets
  }
}

export function closedBetsLoaded(closedBets) {
  return {
    type: 'CLOSED_BETS_LOADED',
    closedBets
  }
}

export function winnerSubmittedLoaded(winnerSubmitted) {
  return {
    type: 'WINNER_SUBMITTED_LOADED',
    winnerSubmitted
  }
}

export function exchangeTokenBalanceLoaded(exchangeTokenBalance) {
  return {
    type: 'EXCHANGE_TOKEN_BALANCE_LOADED',
    exchangeTokenBalance
  }
}

export function betCreated(bet) {
  return {
    type: 'BET_CREATED',
    bet
  }
}

export function betAccepted(bet) {
  return {
    type: 'BET_ACCEPTED',
    bet
  }
}

export function betCancelled(bet) {
  return {
    type: 'BET_CANCELLED',
    bet
  }
}

export function betClosed(bet) {
  return {
    type: 'BET_CLOSED',
    bet
  }
}

export function winnerSubmitted(bet) {
  return {
    type: 'WINNER_SUBMITTED',
    bet
  }
}

export function betCreating() {
  return {
    type: 'BET_CREATING'
  }
}

export function betCancelling() {
  return {
    type: 'BET_CANCELLING'
  }
}

export function betAccepting() {
  return {
    type: 'BET_ACCEPTING'
  }
}

export function submittingWinner() {
  return {
    type: 'SUBMITTING_WINNER'
  }
}

export function tokenDepositAmountChanged(amount) {
  return {
      type: 'TOKEN_DEPOSIT_AMOUNT_CHANGED',
      amount
  }
}

export function tokenWithdrawAmountChanged(amount) {
  return {
      type: 'TOKEN_WITHDRAW_AMOUNT_CHANGED',
      amount
  }
}

export function newBetNameChanged(name) {
  return {
      type: 'NEW_BET_NAME_CHANGED',
      name
  }
}

export function newBetTakerChanged(taker) {
  return {
      type: 'NEW_BET_TAKER_CHANGED',
      taker
  }
}

export function newBetMakerAmountChanged(amount) {
  return {
      type: 'NEW_BET_MAKER_AMOUNT_CHANGED',
      amount
  }
}

export function newBetTakerAmountChanged(amount) {
  return {
      type: 'NEW_BET_TAKER_AMOUNT_CHANGED',
      amount
  }
}

// COMBO

export function balancesLoading() {
  return {
    type: 'BALANCES_LOADING'
  }
}

export function balancesLoaded() {
  return {
    type: 'BALANCES_LOADED'
  }
}
