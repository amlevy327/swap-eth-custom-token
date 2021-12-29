// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is Ownable, ERC20 {

  uint256 public exchangeRate; // token per wei

  event ExchangeRateUpdated(uint256 updatedExchangeRate);
  event Purchase(uint256 numberTokens, uint256 exchangeRate);

  constructor (string memory _name, string memory _symbol, uint256 _exchangeRate) ERC20(_name, _symbol) {
    exchangeRate = _exchangeRate;
    emit ExchangeRateUpdated(_exchangeRate);
  }

  function updateExchangeRate(uint256 _exchangeRate) public onlyOwner {
    exchangeRate = _exchangeRate;
    emit ExchangeRateUpdated(_exchangeRate);
  }
  
  function purchaseTokens() public payable {
    require(msg.value >= 1, 'must purchase at least one token');
    _mint(msg.sender, msg.value * exchangeRate);
    emit Purchase(msg.value * exchangeRate, exchangeRate);
  }
}