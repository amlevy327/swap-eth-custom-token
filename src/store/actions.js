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

export function tokenInfoLoaded(name, symbol, decimals, exchangeRate) {
  return {
      type: 'TOKEN_INFO_LOADED',
      name,
      symbol,
      decimals,
      exchangeRate
  }
}

export function purchasesLoaded(purchases) {
  return {
    type: 'PURCHASES_LOADED',
    purchases
  }
}

export function newPurchaseAmountChanged(amountWei, amountCustomToken) {
  return {
      type: 'NEW_PURCHASE_AMOUNT_CHANGED',
      amountWei,
      amountCustomToken
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