import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Navbar from './Navbar'
import {
  loadWeb3,
  loadAccount,
  loadTokenContract,
  loadExchangeContract,
  loadExchangeEvents
} from '../store/interactions'
import {
  accountSelector,
  allBetTypesLoadedSelector
} from '../store/selectors'
import CustomerDashboard from './CustomerDashboard'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const {
      dispatch
    } = props

    await window.ethereum.enable() // not sure if need this?
    const web3 = await loadWeb3(dispatch)
    const networkId = await web3.eth.net.getId()
    
    await loadAccount(web3, dispatch)

    const token = await loadTokenContract(web3, networkId, dispatch)
    if (!token) {
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamark.')
    }

    const exchange = await loadExchangeContract(web3, networkId, dispatch)
    if (!exchange) {
      window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamark.')
    }

    await loadExchangeEvents(exchange, dispatch)
  }

  render() {
    return (
      <div>
        <Navbar />
        <CustomerDashboard />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(App)