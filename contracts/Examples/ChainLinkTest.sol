// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.8;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// contract NFTMintPrice {
//     uint256 public minimumUsd = 50 * 1e18; // 1 * 10 ** 17 
//     AggregatorV3Interface internal priceFeed;
//     /**
//      * Network: Goerli
//      * Aggregator: ETH/USD
//      * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
//      */
//     constructor() {
//         priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
//     }

//     /**
//      * Returns the latest price
//      */
//     function getPrice() public view returns (uint256) {
//         (,
//         int256 price,
//         ,
//         ,
//         ) = priceFeed.latestRoundData(); //3000.00000000
//         return uint256(price * 1e10); // 1**10 == 10000000000
//     }

//     function getConversion(uint256 ethAmount) public view returns (uint256){
//         uint256 ethPrice = getPrice();
//         uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
//         return ethAmountInUsd;
//     }
// }
