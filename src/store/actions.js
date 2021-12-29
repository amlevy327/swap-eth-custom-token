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

export function exchangeRateLoaded(exchangeRate) {
  return {
    type: 'EXCHANGE_RATE_LOADED',
    exchangeRate
  }
}

export function newPurchaseAmountChanged(amountWei, amountCustomToken) {
  return {
      type: 'NEW_PURCHASE_AMOUNT_CHANGED',
      amountWei,
      amountCustomToken
  }
}

export function tokenInfoLoaded(name, symbol, decimals) {
  return {
      type: 'TOKEN_INFO_LOADED',
      name,
      symbol,
      decimals
  }
}

export function exchangeRateUpdatesLoaded(exchangeRateUpdates) {
  return {
    type: 'EXCHANGE_RATE_UPDATES_LOADED',
    exchangeRateUpdates
  }
}

export function purchasesLoaded(purchases) {
  return {
    type: 'PURCHASES_LOADED',
    purchases
  }
}

export function purchaseCreating() {
  return {
    type: 'PURCHASE_CREATING'
  }
}

export function purchaseCreated(purchase) {
  return {
    type: 'PURCHASE_CREATED',
    purchase
  }
}