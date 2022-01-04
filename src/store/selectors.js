import { createSelector } from 'reselect'
import { get } from 'lodash'

// WEB3

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const accountLoaded = state => get(state, 'web3.loaded', false)
export const accountLoadedSelector = createSelector(accountLoaded, l => l)

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

// TOKEN

const tokenContractLoaded = state => get(state, 'token.loaded', false)
export const tokenContractLoadedSelector = createSelector(tokenContractLoaded, tl => tl)

const tokenContract = state => get(state, 'token.contract')
export const tokenContractSelector = createSelector(tokenContract, t => t)

const exchangeRateLoaded = state => get(state, 'token.exchangeRate.loaded', false)
export const exchangeRateLoadedSelector = createSelector(exchangeRateLoaded, l => l)

const exchangeRate = state => get(state, 'token.tokenInfo.exchangeRate', '0')
export const exchangeRateSelector = createSelector(exchangeRate, e => e)

const tokenInfoLoaded = state => get(state, 'token.tokenInfo.loaded', false)
export const tokenInfoLoadedSelector = createSelector(tokenInfoLoaded, l => l)

const tokenName = state => get(state, 'token.tokenInfo.name', '')
export const tokenNameSelector = createSelector(tokenName, n => n)

const tokenSymbol = state => get(state, 'token.tokenInfo.symbol', '')
export const tokenSymbolSelector = createSelector(tokenSymbol, s => s)

const tokenDecimals = state => get(state, 'token.tokenInfo.decimals', '')
export const tokenDecimalsSelector = createSelector(tokenDecimals, d => d)

const tokenOwner = state => get(state, 'token.tokenInfo.owner', '')
export const tokenOwnerSelector = createSelector(tokenOwner, o => o)

const newPurchase = state => get(state, 'token.newPurchase', [])
export const newPurchaseSelector = createSelector(newPurchase, np => np)

const newExchangeRate = state => get(state, 'token.newExchangeRate.amount', '')
export const newExchangeRateSelector = createSelector(newExchangeRate, ne => ne)