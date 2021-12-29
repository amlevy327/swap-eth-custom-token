const Token = artifacts.require('../contracts/Token.sol')

let exchangeRate = "4000"

module.exports = async function(deployer) {

  const accounts = await web3.eth.getAccounts()
  const owner = accounts[0]

  await deployer.deploy(Token,
    "LuvToken",
    "LUV",
    exchangeRate,
    { from: owner }
  )
};
