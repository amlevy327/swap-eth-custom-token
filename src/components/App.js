import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Spinner from './Spinner'
import Converter from './Converter'
import {
  loadWeb3,
  loadAccount,
  loadTokenContract,
  getExchangeRate,
  getTokenInfo,
  loadTokenContractEvents,
  subscribeToEvents
} from '../store/interactions'
import {
  exchangeRateLoadedSelector,
  exchangeRateSelector,
  tokenInfoLoadedSelector,
  tokenNameSelector,
  tokenSymbolSelector
} from '../store/selectors'

const showContent = (props) => {
  const {
    tokenName,
    tokenSymbol,
    exchangeRate
  } = props

  return(
    <div>
      <h1>Buy { tokenName }!</h1>
      <h2>1 WEI = { exchangeRate } { tokenSymbol }</h2>
      <Converter />
    </div>
  )
}

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const {
      dispatch
    } = props

    await window.ethereum.enable()
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    
    await loadAccount(web3, dispatch)
    
    const tokenContract = await loadTokenContract(web3, networkId, dispatch)
    if (!tokenContract) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
    }

    await getExchangeRate(tokenContract, dispatch)
    await getTokenInfo(tokenContract, dispatch)
    await loadTokenContractEvents(tokenContract, dispatch)
    await subscribeToEvents(tokenContract, dispatch)
  }

  render() {
    return (
      <div>
        { this.props.showAll ? showContent(this.props) : <Spinner /> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const exchangeRateLoaded = exchangeRateLoadedSelector(state)
  const tokenInfoLoaded = tokenInfoLoadedSelector(state)
  
  return {
    showAll: tokenInfoLoaded && exchangeRateLoaded,
    tokenName: tokenNameSelector(state),
    tokenSymbol: tokenSymbolSelector(state),
    exchangeRate: exchangeRateSelector(state)
  }
}

export default connect(mapStateToProps)(App)