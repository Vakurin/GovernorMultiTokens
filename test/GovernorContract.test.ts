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
import {NFT, GovernoContract} from "../typechain-types"

describe("GovernorContract", function () {
  let owner: any;
  let addr1: any;
  let addr2: any;
  let governorContract: GovernoContract;
  let nft: NFT;
  let nft2: NFT;

  beforeEach(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();
    const _NFTContract = await ethers.getContractFactory("NFT", owner);
    nft = await _NFTContract.deploy();
    await nft.deployed();
    const _NFTContract2 = await ethers.getContractFactory("NFT", addr1);
    nft2 = await _NFTContract2.deploy();
    await nft2.deployed();
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

  describe("Check implementation of DAO", function () {
    it('Should be one initital NFT', async function() {
      const numberOfNFT = await governorContract.getTokensLength()
      expect(numberOfNFT).to.eq(1)
    })

    it("[ERROR] Add same address", async function() {
      await expectRevert(
        governorContract.addToken(nft.address),
        "This address is already exsist"
      )
    })

    it("Add zero address", async function() {
      await expectRevert(
        governorContract.addToken(constants.ZERO_ADDRESS),
        "Address should non-zero"
      )
    })

    it('Should add NFT token', async function() {
      await governorContract.addToken(nft2.address)
      const numberOfNFT = await governorContract.getTokensLength()
      expect(numberOfNFT).to.eq(2)
    })
  })
});
