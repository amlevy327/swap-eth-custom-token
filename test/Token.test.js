const { expectEvent } = require('@openzeppelin/test-helpers');

const Token = artifacts.require('../contracts/Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer, user1]) => {
  let token
  let allEvents

  const EVM_REVERT = 'VM Exception while processing transaction: revert'
  const ADDRESS_0x0 = '0x0000000000000000000000000000000000000000'
  
  const tokenName = "AndrewCoin"
  const tokenSymbol = "DREW"
  const exchangeRate = 10

  beforeEach(async ()=> {
    token = await Token.new(tokenName, tokenSymbol, exchangeRate, { from: deployer })
    allEvents = await token.getPastEvents("allEvents", {fromBlock: 0, toBlock: "latest"})
  })

  describe('Constructor', () => {
    describe('Contract', () => {
      it('deploys successfully', async () => {
        const address = await token.address

        address.should.not.equal(0x0, 'address does not equal 0x0')
        address.should.not.equal('', 'address does not equal ""')
        address.should.not.equal(null, 'address does not equal null')
        address.should.not.equal(undefined, 'address does not equal undefined')
      })
    })

    describe('Ownable', () => {
      it('transfers ownership to deployer', async () => {
        let contractOwner = await token.owner()
        contractOwner.toString().should.equal(deployer.toString(), 'contract owner is correct')
      })

      it('emits OwnershipTransferred event', async () => {
        let event = await allEvents[0]
        let previousOwner = event.args.previousOwner
        let newOwner = event.args.newOwner

        previousOwner.toString().should.equal(ADDRESS_0x0.toString())
        newOwner.toString().should.equal(deployer.toString())
      })
    })

    describe('ERC20', () => {
      it('tracks token name', async () => {
        let name = await token.name()
        name.toString().should.equal(tokenName.toString(), 'token name is correct')
      })

      it('tracks token symbol', async () => {
        let symbol = await token.symbol()
        symbol.toString().should.equal(tokenSymbol.toString(), 'token symbol is correct')
      })
    })

    describe('Exchange rate', () => {
      it('tracks exchange rate', async () => {
        let rate = await token.exchangeRate()
        rate.toString().should.equal(exchangeRate.toString(), 'exchange rate is correct')
      })

      it('emits ExchangeRateUpdated event', async () => {
        let event = await allEvents[1]
        let rate = event.args.updatedExchangeRate

        rate.toString().should.equal(exchangeRate.toString())
      })
    })
  })

  describe('Exchange rate functionality', () => {
    let result
    const newExchangeRate = 22

    describe('Success', () => {
      beforeEach(async ()=> {
        result = await token.updateExchangeRate(newExchangeRate, { from: deployer })
      })

      it('tracks updated exchange rate', async () => {
        let rate = await token.exchangeRate()
        rate.toString().should.equal(newExchangeRate.toString(), 'updated exchange rate is correct')
      })

      it('emits a ExchangeRateUpdated event', async () => {
        expectEvent(result, 'ExchangeRateUpdated', { updatedExchangeRate: newExchangeRate.toString() })
      })
    })

    describe('Failure', () => {
      it('reverts if updateExchangeRate is called by non contract owner', async () => {
        await token.updateExchangeRate(newExchangeRate, { from: user1 }).should.be.rejectedWith(EVM_REVERT)
      })
    })
  })
})