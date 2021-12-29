import Web3 from 'web3'

import {
  web3Loaded,
  web3AccountLoaded,
  tokenContractLoaded,
  exchangeRateLoaded,
  tokenInfoLoaded,
  exchangeRateUpdatesLoaded,
  purchasesLoaded,
  purchaseCreating,
  purchaseCreated,
  newPurchaseAmountChanged
} from './actions.js'

import Token from '../abis/Token.json'

// WEB3

export const loadWeb3 = async (dispatch) => {
  console.log('window.ethereum: ', window.ethereum)
  if(typeof window.ethereum !== 'undefined'){
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign('https://metamask.io/')
  }
}

// ACCOUNT

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = await accounts[0]
  if(typeof account !== 'undefined') {
    dispatch(web3AccountLoaded(account))
    return account
  } else {
    window.alert('Please login with MetaMask')
    return null
  }
}

// TOKEN

export const loadTokenContract = async (web3, networkId, dispatch) => {
  try {
    const tokenContract = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch(tokenContractLoaded(tokenContract))
    return tokenContract
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const getExchangeRate = async (tokenContract, dispatch) => {
  const exchangeRate = await tokenContract.methods.exchangeRate().call()
  dispatch(exchangeRateLoaded(exchangeRate))
}

export const getTokenInfo = async (tokenContract, dispatch) => {
  const name = await tokenContract.methods.name().call()
  const symbol = await tokenContract.methods.symbol().call()
  const decimals = await tokenContract.methods.decimals().call()
  
  dispatch(tokenInfoLoaded(name, symbol, decimals))
}

export const loadTokenContractEvents = async (tokenContract, dispatch) => {
  // exchange rate updates
  const exchangeRateUpdatesStream = await tokenContract.getPastEvents('ExchangeRateUpdated', { fromBlock: 0, toBlock: 'latest' })
  console.log('exchangeRateUpdatesStream: ', exchangeRateUpdatesStream)
  const exchangeRateUpdates = exchangeRateUpdatesStream.map((event) => event.returnValues)
  dispatch(exchangeRateUpdatesLoaded(exchangeRateUpdates))

  // purchases
  const purchasesStream = await tokenContract.getPastEvents('Purchase', { fromBlock: 0, toBlock: 'latest' })
  console.log('purchasesStream: ', purchasesStream)
  const purchases = purchasesStream.map((event) => event.returnValues)
  dispatch(purchasesLoaded(purchases))
}

export const purchaseTokens = (account, tokenContract, newPurchase, dispatch) => {
  tokenContract.methods.purchaseTokens().send({ from: account, value: newPurchase.amountWei })
  .on('transactionHash', (hash) => {
    dispatch(newPurchaseAmountChanged(0, 0))
    dispatch(purchaseCreating())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

export const subscribeToEvents = async (tokenContract, dispatch) => {
  // exchange rate updated
  // token.events.ExchangeRateUpdated({}, (error, event) => {
  //   dispatch(exchangeRateLoaded())
  // })

  // purchases
  tokenContract.events.Purchase({}, (error, event) => {
    dispatch(purchaseCreated(event.returnValues))
  })
}