const DEPOSIT = "5"
const Exchange = artifacts.require('../src/contracts/Exchange.sol')
const Token = artifacts.require('../src/contracts/Token.sol')

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
  
  try {
    console.log('script is running')

    const accounts = await web3.eth.getAccounts()
    const owner = accounts[0]
    const user1 = accounts[1]
    const user2 = accounts[2]

    console.log('owner: ', owner)
    console.log('user1: ', user1)
    console.log('user2: ', user2)

    const userStartValue = 100
    const amountTransfer = 30
    const amountMaker = 10
    const amountTaker = 8

    const token = await Token.deployed(
      "Shakes",
      "HAKE",
      { from: owner }
    )
    console.log('Token fetched')
  
    const exchange = await Exchange.deployed(
      DEPOSIT,
      { from: owner }
    )
    console.log('Exchange fetched')

    token.transfer(user1, userStartValue, { from: owner })
    console.log('Tokens transferred from owner to user1: ', userStartValue)

    token.transfer(user2, userStartValue, { from: owner })
    console.log('Tokens transferred from owner to user2: ', userStartValue)

    await token.approve(exchange.address, amountTransfer, { from: user1 })
    console.log('Exchange approvaed for user1: ', amountTransfer)

    await exchange.depositToken(token.address, amountTransfer, { from: user1 })
    console.log('Token deposited for user1: ', amountTransfer)

    await token.approve(exchange.address, amountTransfer, { from: user2 })
    console.log('Exchange approvaed for user2: ', amountTransfer)

    await exchange.depositToken(token.address, amountTransfer, { from: user2 })
    console.log('Token deposited for user2: ', amountTransfer)

    await exchange.createBet(token.address, user2, amountMaker, amountTaker, { from: user1 })
    console.log('Bet 1 created')

    await exchange.createBet(token.address, user2, amountMaker, amountTaker, { from: user1 })
    console.log('Bet 2 created')

    await exchange.cancelBet('1', { from: user1 })
    console.log('Bet 1 cancelled')

    //result = await exchange.bets('1')
    //console.log("bet 1:", result)

  } catch (error) {
    console.log(error)
  }

  callback()
}