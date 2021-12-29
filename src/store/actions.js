

export function newPurchaseAmountChanged(amountWei, amountCustomToken) {
  return {
      type: 'NEW_PURCHASE_AMOUNT_CHANGED',
      amountWei,
      amountCustomToken
  }
}