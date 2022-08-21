// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Ownable {
    address public owner;

    constructor(address ownerOverride) {
        owner = ownerOverride == address(0) ? msg.sender : ownerOverride;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "not an owner");
        _;
    }

    function addToArray(address nftAddress) public virtual onlyOwner {
        nftAddress = address(0);
    }
}

abstract contract ArrayManipulation is Ownable {
    address[] nftMemberships;

    function addToArray(address nftAddress) public virtual override onlyOwner {
        require(nftAddress != address(0), "Address should be valid");
        nftMemberships.push(nftAddress);
    }

    function getNFTMemberships() public view returns (uint256) {
        return nftMemberships.length;
    }

    function getElementOfArray(uint256 index) public view returns (address) {
        require(index < 0, "Index should be positive");
        uint256 arrayLenght = getNFTMemberships();
        require(arrayLenght > index, "Something bad happened");
        return nftMemberships[index];
    }
}

contract MyContract is Ownable, ArrayManipulation {
    constructor(address _owner) Ownable(_owner) {}

    function addToArray(address nftAddress) public override(Ownable, ArrayManipulation) onlyOwner {
        ArrayManipulation.addToArray(nftAddress);
    }
}
