import Web3 from 'web3'

import {
  web3Loaded,
  web3AccountLoaded,
  tokenContractLoaded,
  exchangeContractLoaded,
  depositAmountLoaded,
  allBetsLoaded,
  acceptedBetsLoaded,
  cancelledBetsLoaded,
  closedBetsLoaded,
  winnerSubmittedLoaded,
  tokenBalanceLoaded,
  exchangeTokenBalanceLoaded,
  balancesLoaded,
  betCreated,
  betAccepted,
  betCancelled,
  betClosed,
  winnerSubmitted,
  betCreating,
  betCancelling,
  betAccepting,
  submittingWinner,
  balancesLoading
  // approvingExchange,
  // approvalForAllLoaded,
  // exchangeApproved
} from './actions.js'

import Token from '../abis/Token.json'
import Exchange from '../abis/Exchange.json'

// WEB3

export const loadWeb3 = async (dispatch) => {
  //console.log('window.ethereum: ', window.ethereum)
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
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch(tokenContractLoaded(token))
    return token
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

// // TODO: need this?
// export const loadApprovalForAll = async (token, dispatch) => {
//   const approvalForAllStream = await token.getPastEvents('ApprovalForAll', { fromBlock: 0, toBlock: 'latest' })
//   console.log('approvalForAll stream: ', approvalForAllStream)
//   const approvalForAll = approvalForAllStream.map((event) => event.returnValues)
//   dispatch(approvalForAllLoaded(approvalForAll))
// }

// // TODO: need this? - check on deposit?
// export const approveExchange = (account, token, exchange, amount, dispatch) => {
//   token.methods.approve(exchange.options.address, amount).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(approvingExchange())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const loadTokenEvents = async (exchange, dispatch) => {
//   // approval for all
//   const approvalForAllStream = await exchange.getPastEvents('ApprovalForAll', { fromBlock: 0, toBlock: 'latest' })
//   const approvalForAll = approvalForAllStream.map((event) => event.returnValues)
//   dispatch(allBetsLoaded(approvalForAll))
// }

// EXCHANGE

export const loadExchangeContract = async (web3, networkId, dispatch) => {
  try {
    const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
    dispatch(exchangeContractLoaded(exchange))
    return exchange
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const getDepositAmount = async (exchange, dispatch) => {
  const depositAmount = await exchange.methods.depositAmount().call()
  dispatch(depositAmountLoaded(depositAmount))
}

export const loadExchangeEvents = async (exchange, dispatch) => {
  // all bets
  const allBetsStream = await exchange.getPastEvents('BetCreated', { fromBlock: 0, toBlock: 'latest' })
  console.log('allBetsStream: ', allBetsStream)
  const allBets = allBetsStream.map((event) => event.returnValues)
  dispatch(allBetsLoaded(allBets))

  // accepted bets
  const acceptedBetsStream = await exchange.getPastEvents('BetAccepted', { fromBlock: 0, toBlock: 'latest' })
  const acceptedBets = acceptedBetsStream.map((event) => event.returnValues)
  dispatch(acceptedBetsLoaded(acceptedBets))

  // cancelled bets
  const cancelledBetsStream = await exchange.getPastEvents('BetCancelled', { fromBlock: 0, toBlock: 'latest' })
  console.log('cancelledBetsStream: ', cancelledBetsStream)
  const cancelledBets = cancelledBetsStream.map((event) => event.returnValues)
  dispatch(cancelledBetsLoaded(cancelledBets))

  // closed bets
  const closedBetsStream = await exchange.getPastEvents('BetClosed', { fromBlock: 0, toBlock: 'latest' })
  const closedBets = closedBetsStream.map((event) => event.returnValues)
  dispatch(closedBetsLoaded(closedBets))

  // winner submitted
  const winnerSubmittedStream = await exchange.getPastEvents('WinnerSubmitted', { fromBlock: 0, toBlock: 'latest' })
  const winnerSubmitted = winnerSubmittedStream.map((event) => event.returnValues)
  dispatch(winnerSubmittedLoaded(winnerSubmitted))
}

export const loadBalances = async (account, token, exchange, dispatch) => {
  if(typeof account !== 'undefined') {
    // token balance in wallet
    const tokenBalance = await token.methods.balanceOf(account).call()
    dispatch(tokenBalanceLoaded(tokenBalance))
    
    // token balance in exchange contract
    const exchangeTokenBalance = await exchange.methods.balanceOf(token.options.address, account).call()
    dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance))

    // all balances loaded
    dispatch(balancesLoaded())

  } else {
    window.alert('Please login with MetaMask')
  }
}

// create bet

export const createBet = (web3, account, token, exchange, bet, dispatch) => {
  const addressToken = token.options.address
  const addressTaker = bet.taker
  const amountMaker = web3.utils.toWei(bet.amountMaker, 'ether')
  const amountTaker = web3.utils.toWei(bet.amountTaker, 'ether')

  exchange.methods.createBet(addressToken, addressTaker, amountMaker, amountTaker).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(betCreating())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

// cancel bet

export const cancelBet = (account, exchange, bet, dispatch) => {
  exchange.methods.cancelBet(bet.id).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(betCancelling())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

// accept bet

export const acceptBet = (account, exchange, bet, dispatch) => {
  console.log('account', account)
  console.log('exchange', exchange)
  console.log('bet.id', bet.id)
  exchange.methods.acceptBet(bet.id).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(betAccepting())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

// submit winner - TODO: check bet/winner how to handle
export const submitWinner = (account, exchange, bet, winner, dispatch) => {
  exchange.methods.submitWinner(bet.id, winner).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(submittingWinner())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

// deposit token - TODO: check approving methods

export const depositToken = (web3, account, token, exchange, amount, dispatch) => {
  amount = web3.utils.toWei(amount, 'ether')
  
  token.methods.approve(exchange.options.address, amount).send({ from: account })
  .on('transactionHash', (hash) => {
    exchange.methods.depositToken(token.options.address, amount).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(balancesLoading())
    })
    .on('error',(error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })
  })
}

// withdraw token

export const withdrawToken = (web3, account, token, exchange, amount, dispatch) => {
  exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error',(error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
}

// BOTH

// subscribe to all events

export const subscribeToEvents = async (exchange, dispatch) => {
  // deposit
  exchange.events.Deposit({}, (error, event) => {
    dispatch(balancesLoaded())
  })

  // withdraw
  exchange.events.Withdraw({}, (error, event) => {
    dispatch(balancesLoaded())
  })

  // bet created
  exchange.events.BetCreated({}, (error, event) => {
    dispatch(betCreated(event.returnValues))
  })

  // bet accepted
  exchange.events.BetAccepted({}, (error, event) => {
    dispatch(betAccepted(event.returnValues))
  })

  // bet cancelled
  exchange.events.BetCancelled({}, (error, event) => {
    dispatch(betCancelled(event.returnValues))
  })

  // bet closed
  exchange.events.BetClosed({}, (error, event) => {
    dispatch(betClosed(event.returnValues))
  })

  // winner submitted
  exchange.events.WinnerSubmitted({}, (error, event) => {
    dispatch(winnerSubmitted(event.returnValues))
  })

  // // TODO: need this? appoval for all - can be done in deposit call
  // token.events.ApprovalForAll({}, (error, event) => {
  //   dispatch(exchangeApproved(event.returnValues))
  // })
}