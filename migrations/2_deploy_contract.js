const Token = artifacts.require('../contracts/Token.sol')

let tokenName = "LuvToken"
let tokenSymbol = "LUV"
let exchangeRate = "4000" // tokens per ETH

module.exports = async function(deployer) {

  const accounts = await web3.eth.getAccounts()
  const owner = accounts[0]

  await deployer.deploy(Token,
    tokenName,
    tokenSymbol,
    exchangeRate,
    { from: owner }
  )
};
