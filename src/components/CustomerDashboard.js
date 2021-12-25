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
  openBetsForAccountSelector,
  winnerSubmittedSelector
} from '../store/selectors'
import {
  cancelBet,
  acceptBet,
  submitWinner
} from '../store/interactions'
// import {
// } from '../store/actions'

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

class CustomerDashboard extends Component {
  // componentWillMount() {
  //   this.loadBlockchainData(this.props)
  // }

  // async loadBlockchainData(props) {
  // }

  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Customer Dashboard
        </div>
        <div className="card-body">
          <Tabs defaultActiveKey="pending" className="bg-dark text-white">
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
    exchange: exchangeSelector(state),
    createdBets: createdBetsForAccountSelector(state),
    activeBets: openBetsForAccountSelector(state),
    closedBets: closedBetsForAccountSelector(state),
    winnersSubmitted: winnerSubmittedSelector(state)
  }
}

export default connect(mapStateToProps)(CustomerDashboard)