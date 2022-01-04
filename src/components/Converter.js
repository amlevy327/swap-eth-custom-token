import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  newPurchaseAmountChanged
} from '../store/actions'
import {
  purchaseTokens
} from '../store/interactions'
import { 
  accountLoadedSelector,
  accountSelector,
  exchangeRateLoadedSelector,
  exchangeRateSelector,
  newPurchaseSelector,
  tokenContractLoadedSelector,
  tokenContractSelector,
  web3Selector
} from '../store/selectors'

const amountEthChanged = (props, amountEth) => {
  const {
    dispatch,
    exchangeRate
  } = props

  if (amountEth === "") {
    document.getElementById("amountCustomToken").value = 0
    amountEth = 0
  }

  document.getElementById("amountCustomToken").value = amountEth * exchangeRate
  dispatch(newPurchaseAmountChanged(parseInt(amountEth * (10 ** 18)), amountEth * exchangeRate))
}

const amountCustomTokenChanged = (props, amountCustomToken) => {
  const {
    dispatch,
    exchangeRate
  } = props

  if (amountCustomToken === "") {
    document.getElementById("amountEth").value = 0
    amountCustomToken = 0
  }

  document.getElementById("amountEth").value = amountCustomToken / exchangeRate
  dispatch(newPurchaseAmountChanged(amountCustomToken / exchangeRate * (10 ** 18), parseInt(amountCustomToken)))
}

const newPurchaseCreation = (props) => {
  const {
    web3,
    account,
    tokenContract,
    newPurchase,
    dispatch
  } = props

  purchaseTokens(web3, account, tokenContract, newPurchase, dispatch)
  
  document.getElementById("amountEth").value = ""
  document.getElementById("amountCustomToken").value = ""
}

class Converter extends Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        newPurchaseCreation(this.props)
      }}>
        <div className="">
          <input
            id = "amountEth"
            type="text"
            placeholder="Amount ETH"
            onChange={(e) => amountEthChanged(this.props, e.target.value)}
            className='input'
            //className="form-control form-control-sm bg-dark text-white"
            required
          />
          <label>ETH</label>
        </div>
        <label>=</label>
        <div className="">
          <input
            id = "amountCustomToken"
            type="text"
            placeholder="Amount LUV"
            onChange={(e) => amountCustomTokenChanged(this.props, e.target.value)}
            className='input'
            //className="form-control form-control-sm bg-dark text-white"
            required
          />
          <label>LUV</label>
        </div>
        <button type="submit" className="">Purchase</button>   
          {/* <button type="submit" className="btn btn-primary btm-sm btn-black">Purchase</button> */}
      </form>
    )
    }
  }
  
  function mapStateToProps(state) {
    const accountLoaded = accountLoadedSelector(state)
    const tokenContractLoaded = tokenContractLoadedSelector(state)
    const exchangeRateLoaded = exchangeRateLoadedSelector(state)

    return {
      showAll: accountLoaded && tokenContractLoaded && exchangeRateLoaded,
      web3: web3Selector(state),
      account: accountSelector(state),
      tokenContract: tokenContractSelector(state),
      exchangeRate: exchangeRateSelector(state),
      newPurchase: newPurchaseSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(Converter)