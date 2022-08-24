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


describe("GovernorContract", function () {
  let owner: any;
  let addr1: any;
  let addr2: any;
  let governorContract: any;
  let nft: any;

  beforeEach(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();
    const NFTContract = await ethers.getContractFactory("NFT", owner);
    nft = await NFTContract.deploy();
    await nft.deployed();
    const MyContract = await ethers.getContractFactory("GovernoContract", owner);
    governorContract = await MyContract.deploy('MaxDAO', nft.address, 6545, 3);
    await governorContract.deployed();
  })

  describe('Check dao', function () {
    it('Should be version 2.0', async function(){
      const version = await governorContract.version()
      console.log("\n\n", version)
      expect(version).to.eq('2.0')
    })
  })

  

});
