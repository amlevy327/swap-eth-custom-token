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
  tokenContractSelector
} from '../store/selectors'

const amountWeiChanged = (props, amountWei) => {
  const {
    dispatch,
    exchangeRate
  } = props

  if (amountWei === "") {
    document.getElementById("amountCustomToken").value = 0
    amountWei = 0
  }

  document.getElementById("amountCustomToken").value = amountWei * exchangeRate
  dispatch(newPurchaseAmountChanged(parseInt(amountWei), amountWei * exchangeRate))
}

const amountCustomTokenChanged = (props, amountCustomToken) => {
  const {
    dispatch,
    exchangeRate
  } = props

  if (amountCustomToken === "") {
    document.getElementById("amountWei").value = 0
    amountCustomToken = 0
  }

  document.getElementById("amountWei").value = amountCustomToken / exchangeRate
  dispatch(newPurchaseAmountChanged(amountCustomToken / exchangeRate, parseInt(amountCustomToken)))
}

const newPurchaseCreation = (props) => {
  const {
    account,
    tokenContract,
    newPurchase,
    dispatch
  } = props

  purchaseTokens(account, tokenContract, newPurchase, dispatch)
  
  document.getElementById("amountWei").value = ""
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
            id = "amountWei"
            type="number"
            placeholder="Amount WEI"
            onChange={(e) => amountWeiChanged(this.props, e.target.value)}
            className='input'
            //className="form-control form-control-sm bg-dark text-white"
            required
          />
          <label>WEI</label>
        </div>
        <label>=</label>
        <div className="">
          <input
            id = "amountCustomToken"
            type="number"
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
      account: accountSelector(state),
      tokenContract: tokenContractSelector(state),
      exchangeRate: exchangeRateSelector(state),
      newPurchase: newPurchaseSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(Converter)