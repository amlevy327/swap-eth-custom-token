import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Spinner from './Spinner'
import Converter from './Converter'
import {
  loadWeb3,
  loadAccount,
  loadTokenContract,
  getTokenInfo,
  loadTokenContractEvents,
  subscribeToEvents
} from '../store/interactions'
import {
  accountSelector,
  exchangeRateSelector,
  tokenInfoLoadedSelector,
  tokenNameSelector,
  tokenOwnerSelector,
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
      <h2>1 ETH = { exchangeRate } { tokenSymbol }</h2>
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
  const tokenInfoLoaded = tokenInfoLoadedSelector(state)
  
  return {
    showAll: tokenInfoLoaded,
    tokenName: tokenNameSelector(state),
    tokenSymbol: tokenSymbolSelector(state),
    exchangeRate: exchangeRateSelector(state),
    tokenOwner: tokenOwnerSelector(state),
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(App)