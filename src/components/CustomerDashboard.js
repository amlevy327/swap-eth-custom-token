import React, { Component } from 'react'
import { connect } from "react-redux"
import { Tab, Tabs } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  accountSelector,
  allBetTypesLoadedSelector,
  createdBetsForAccountSelector,
  openBetsForAccountSelector
} from '../store/selectors'
// import {
// } from '../store/interactions'
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
            <td>{bet.buttonText}</td>
          </tr>
        )
      })
      }
    </tbody>
  )
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
            <td>Submit Winner</td>
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
                { this.props.showAll ? showActiveBets(this.props) : <Spinner type="table"/> }
              </table>
            </Tab>
            <Tab eventKey="closed" title="Closed" className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>NFT ID</th>
                    <th># Owned</th>
                    <th># Minted</th>
                    <th># For Sale</th>
                  </tr>
                </thead>
                {/* { this.props.showAll ? showMyNFTs(this.props) : <Spinner type="table"/> } */}
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
    createdBets: createdBetsForAccountSelector(state),
    activeBets: openBetsForAccountSelector(state)
  }
}

export default connect(mapStateToProps)(CustomerDashboard)