import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Converter from './Converter'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Buy DREW Tokens!</h1>
        <h2>1 WEI = 2 LUV</h2>
        <Converter />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(App)