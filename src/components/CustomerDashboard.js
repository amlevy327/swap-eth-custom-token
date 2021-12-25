import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  accountSelector,
  allBetTypesLoadedSelector,
  closedBetsForAccountSelector,
  createdBetsForAccountSelector,
  exchangeSelector,
  exchangeTokenBalanceSelector,
  openBetsForAccountSelector,
  tokenBalanceSelector,
  tokenSelector,
  winnerSubmittedSelector,
  tokenDepositAmountSelector,
  tokenWithdrawAmountSelector,
  newBetSelector
} from '../store/selectors'
import {
  createBet,
  cancelBet,
  acceptBet,
  submitWinner,
  loadBalances,
  depositToken,
  withdrawToken
} from '../store/interactions'
import {
  newBetNameChanged,
  newBetTakerChanged,
  newBetMakerAmountChanged,
  newBetTakerAmountChanged,
  tokenDepositAmountChanged,
  tokenWithdrawAmountChanged
} from '../store/actions'

const newBetForm = (props) => {
  const {
    dispatch,
    exchange,
    token,
    web3,
    account,
    newBet
  } = props

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      console.log('button clicked new bet')
      createBet(web3, account, token, exchange, newBet, dispatch)
    }}>
      <div className="form-group small">
        <label>Name</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Describe your bet"
          onChange={(e) => dispatch(newBetNameChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
        />
        <label>Taker</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Taker address"
          onChange={(e) => dispatch(newBetTakerChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
        />
        <label>Maker Amount</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Amount maker will wager"
          onChange={(e) => dispatch(newBetMakerAmountChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
        />
        <label>Taker Amount</label>
        <div className="input-group"></div>
          <input
          type="text"
          placeholder="Amount taker will wager"
          onChange={(e) => dispatch(newBetTakerAmountChanged(e.target.value))}
          className="form-control form-control-sm bg-dark text-white"
          required
        />
        </div>
        <button type="submit" className="btn btn-primary btm-sm btn-black">Create Bet</button>
    </form>
  )
}

const showPendingBets = (props) => {
  const {
    createdBets
  } = props

  console.log('createdBets: ', createdBets.length)

  return(
    <tbody>
      { createdBets.map((bet) => {
        return(
          <tr className={`nft-${bet.id}`} key={bet.id}>
            <td>{bet.id}</td>
            <td>{bet.name}</td>
            <td>{bet.maker}</td>
            <td>{bet.taker}</td>
            <td>{bet.amountMaker}</td>
            <td>{bet.amountTaker}</td>
            <td
              className="text-muted cancel-order"
              onClick={(e) => {
                completePendingBetAction(props, bet)
              }}
            >{bet.buttonText}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const completePendingBetAction = (props, bet) => {
  const {
    account,
    token,
    exchange,
    dispatch
  } = props

  switch(bet.buttonText) {
    case "Cancel":
      console.log("AML pending bet action text: cancel")
      cancelBet(account, exchange, bet, dispatch) 
      break
    case "Accept":
      console.log("AML pending bet action text: accept")
      acceptBet(account, exchange, bet, dispatch) 
      break
    default:
      console.log("AML no button text action")
  }
}

const showActiveBets = (props) => {
  const {
    activeBets
  } = props

  console.log('activeBets: ', activeBets.length)

  return(
    <tbody>
      { activeBets.map((bet) => {
        return(
          <tr className={`nft-${bet.id}`} key={bet.id}>
            <td>{bet.id}</td>
            <td>{bet.name}</td>
            <td>{bet.maker}</td>
            <td>{bet.taker}</td>
            <td>{bet.amountMaker}</td>
            <td>{bet.amountTaker}</td>
            <td>{bet.updatedWinnerMaker}</td>
            <td>{bet.updatedWinnerTaker}</td>
            <td
              className="text-muted cancel-order"
              onClick={(e) => {
                submitWinningAddress(props, bet, bet.maker)
              }}
            >Submit Winner - Maker</td>
            <td
              className="text-muted cancel-order"
              onClick={(e) => {
                submitWinningAddress(props, bet, bet.taker)
              }}
            >Submit Winner - Taker</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const submitWinningAddress = (props, bet, winner) => {
  const {
    account,
    exchange,
    dispatch
  } = props

  submitWinner(account, exchange, bet, winner, dispatch)
}

const showClosedBets = (props) => {
  const {
    closedBets
  } = props

  console.log('closedBets: ', closedBets.length)

  return(
    <tbody>
      { closedBets.map((bet) => {
        return(
          <tr className={`nft-${bet.id}`} key={bet.id}>
            <td>{bet.id}</td>
            <td>{bet.name}</td>
            <td>{bet.maker}</td>
            <td>{bet.taker}</td>
            <td>{bet.amountMaker}</td>
            <td>{bet.amountTaker}</td>
            <td>{bet.winnerMaker}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
}

const balancesForm = (props) => {
  const {
    tokenBalance,
    exchangeTokenBalance
  } = props
  
  return(
    <div>
      <table className="table table-dark table-sm small">
      <thead>
          <tr>
            <th>Token</th>
            <th>Wallet</th>
            <th>Exchange</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$HAKES</td>
            <td>{tokenBalance}</td>
            <td>{exchangeTokenBalance}</td>
          </tr>
        </tbody>
      </table>
      { tokenDepositField(props) }
      { tokenWithdrawField(props) }
    </div>
  )
}

const tokenDepositField = (props) => {
  const {
    dispatch,
    exchange,
    web3,
    token,
    tokenDepositAmount,
    account
  } = props

  return(
    <form className="row" onSubmit={(event) => {
      event.preventDefault()
      depositToken(web3, account, token, exchange, tokenDepositAmount, dispatch)
    }}>
      <div className="col-12 col-sm pr-sm-2">
        <input
        type="text"
        placeholder="$HAKES amount"
        onChange={(e) => dispatch(tokenDepositAmountChanged(e.target.value))}
        className="form-control form-control-sm bg-dark text-white"
        required />
      </div>
      <div className="col-12 col-sm-auto pl-sm-0">
        <button type="submit" className="btn btn-primary btn-black btm-sm">Deposit</button>
      </div>
  </form>
  )
}

const tokenWithdrawField = (props) => {
  const {
    dispatch,
    exchange,
    web3,
    token,
    tokenWithdrawAmount,
    account
  } = props

  return(
    <form className="row" onSubmit={(event) => {
      event.preventDefault()
      withdrawToken(web3, account, token, exchange, tokenWithdrawAmount, dispatch)
    }}>
      <div className="col-12 col-sm pr-sm-2">
        <input
        type="text"
        placeholder="$HAKES amount"
        onChange={(e) => dispatch(tokenWithdrawAmountChanged(e.target.value))}
        className="form-control form-control-sm bg-dark text-white"
        required />
      </div>
      <div className="col-12 col-sm-auto pl-sm-0">
        <button type="submit" className="btn btn-primary btn-black btm-sm">Withdraw</button>
      </div>
  </form>
  )
}

class CustomerDashboard extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const {
      account,
      token,
      exchange,
      dispatch
    } = props

    await loadBalances(account, token, exchange, dispatch)
  }

  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Customer Dashboard
        </div>
        <div className="card-body">
          <Tabs defaultActiveKey="create" className="bg-dark text-white">
            <Tab eventKey="create" title="Create" className="bg-dark">
              { newBetForm(this.props) }
            </Tab>
            <Tab eventKey="pending" title="Pending" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Maker</th>
                    <th>Taker</th>
                    <th>Amount Maker</th>
                    <th>Amount Taker</th>
                  </tr>
                </thead>
                { this.props.showAll ? showPendingBets(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="active" title="Active" className="bg-dark">
              <table className="table table-dark table-sm small break">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Maker</th>
                    <th>Taker</th>
                    <th>Amount Maker</th>
                    <th>Amount Taker</th>
                    <th>Winner Maker</th>
                    <th>Winner Taker</th>
                  </tr>
                </thead>
                { this.props.showAll ? showActiveBets(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="closed" title="Closed" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                  <th>ID</th>
                    <th>Name</th>
                    <th>Maker</th>
                    <th>Taker</th>
                    <th>Amount Maker</th>
                    <th>Amount Taker</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                { this.props.showAll ? showClosedBets(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="balances" title="Balances" className="bg-dark">
              { balancesForm(this.props) }
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const allBetTypesLoaded = allBetTypesLoadedSelector(state)
  return {
    showAll: allBetTypesLoaded,
    account: accountSelector(state),
    token: tokenSelector(state),
    exchange: exchangeSelector(state),
    createdBets: createdBetsForAccountSelector(state),
    activeBets: openBetsForAccountSelector(state),
    closedBets: closedBetsForAccountSelector(state),
    winnersSubmitted: winnerSubmittedSelector(state),
    tokenBalance: tokenBalanceSelector(state),
    exchangeTokenBalance: exchangeTokenBalanceSelector(state),
    tokenDepositAmount: tokenDepositAmountSelector(state),
    tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
    newBet: newBetSelector(state)
  }
}

export default connect(mapStateToProps)(CustomerDashboard)