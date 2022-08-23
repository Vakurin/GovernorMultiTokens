import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');


describe("GovernorMultipleTokensVote", function () {
  let owner: any;
  let addr1: any;
  let addr2: any;
  let myContract: any;
  let nft: any;

  beforeEach(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();
  

  })

});
