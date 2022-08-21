// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ArrayExample {
    address[] nftMemberships;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function addToArray(address nftAddress) public {
        nftMemberships.push(nftAddress);
    }

    function getNFTMemberships() public view returns (uint256) {
        return nftMemberships.length;
    }

    function getElementOfArray(uint256 index) public view returns (address) {
        uint256 arrayLenght = getNFTMemberships();
        require(arrayLenght > index, "Something bad happened");
        return nftMemberships[index];
    }
}
