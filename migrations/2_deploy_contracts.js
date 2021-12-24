const Token = artifacts.require('../contracts/Token.sol')
const Exchange = artifacts.require('../contracts/Exchange.sol')

let DEPOSIT = "5"

module.exports = async function(deployer) {

  const accounts = await web3.eth.getAccounts()
  const owner = accounts[0]

  await deployer.deploy(Token,
    "Shakes",
    "HAKE",
    { from: owner }
  )

  await deployer.deploy(Exchange,
    DEPOSIT,
    { from: owner }
  )
};
