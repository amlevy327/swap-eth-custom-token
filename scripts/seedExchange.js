const DEPOSIT = "5"
const ADDRESS_0x0 = '0x0000000000000000000000000000000000000000'

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
    const user3 = accounts[3]

    console.log('owner: ', owner)
    console.log('user1: ', user1)
    console.log('user2: ', user2)
    console.log('user3: ', user3)

    const userStartValue = 100
    const amountTransfer = 30
    const amountMaker1 = 10
    const amountTaker1 = 8
    const name1 = "Bears +3.5"
    const amountMaker2 = 5
    const amountTaker2 = 7
    const name2 = "Closest to pin hole 3"
    const amountMaker3 = 2
    const amountTaker3 = 2
    const name3 = "No points in second quarter"

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

    token.transfer(user3, userStartValue, { from: owner })
    console.log('Tokens transferred from owner to user3: ', userStartValue)

    await token.approve(exchange.address, amountTransfer, { from: user1 })
    console.log('Exchange approvaed for user1: ', amountTransfer)

    await exchange.depositToken(token.address, amountTransfer, { from: user1 })
    console.log('Token deposited for user1: ', amountTransfer)

    await token.approve(exchange.address, amountTransfer, { from: user2 })
    console.log('Exchange approvaed for user2: ', amountTransfer)

    await exchange.depositToken(token.address, amountTransfer, { from: user2 })
    console.log('Token deposited for user2: ', amountTransfer)

    await token.approve(exchange.address, amountTransfer, { from: user3 })
    console.log('Exchange approvaed for user3: ', amountTransfer)

    await exchange.depositToken(token.address, amountTransfer, { from: user3 })
    console.log('Token deposited for user3: ', amountTransfer)

    await exchange.createBet(token.address, user2, amountMaker1, amountTaker1, name1, { from: user1 })
    console.log('Bet 1 created by user1 with taker user2')

    await exchange.createBet(token.address, user1, amountMaker2, amountTaker2, name2, { from: user2 })
    console.log('Bet 2 created by user2 with taker user1')

    await exchange.createBet(token.address, ADDRESS_0x0, amountMaker3, amountTaker3, name3, { from: user3 })
    console.log('Bet 3 created by user3 with taker 0x0')

    //await exchange.cancelBet('1', { from: user1 })
    //console.log('Bet 1 cancelled')

    //result = await exchange.bets('1')
    //console.log("bet 1:", result)

    result = await exchange.acceptBet('1', { from: user2 })
    console.log('Bet 1 accepted by user2')

  } catch (error) {
    console.log(error)
  }

  callback()
}