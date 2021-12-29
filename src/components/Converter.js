import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  newPurchaseAmountChanged
} from '../store/actions'

const exchangeRate = 2 // TODO: TEMP CHANGE THIS - get from contract and use redux store

const amountWeiChanged = (props, amountWei) => {
  // TODO: update with contract exchange rate
  const {
    dispatch
  } = props

  if (amountWei === "") {
    document.getElementById("amountCustomToken").value = 0
    amountWei = 0
  }

  document.getElementById("amountCustomToken").value = amountWei * exchangeRate
  dispatch(newPurchaseAmountChanged(parseInt(amountWei), amountWei * exchangeRate))
}

const amountCustomTokenChanged = (props, amountCustomToken) => {
  // TODO: update with contract exchange rate
  const {
    dispatch
  } = props

  if (amountCustomToken === "") {
    document.getElementById("amountWei").value = 0
    amountCustomToken = 0
  }

  document.getElementById("amountWei").value = amountCustomToken / exchangeRate
  dispatch(newPurchaseAmountChanged(amountCustomToken / exchangeRate, parseInt(amountCustomToken)))
}

class Converter extends Component {
  
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        //makeNewPurchase(dispatch, web3, token, newPurchase, account) // TODO: update when adding interactions
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
    return {
    }
  }
  
  export default connect(mapStateToProps)(Converter)