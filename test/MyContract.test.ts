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


describe("MyContract", function () {
  let owner: any;
  let myContract: any;
  
  beforeEach(async function() {
    [owner] = await ethers.getSigners();
    const MyContract = await ethers.getContractFactory("MyContract", owner);
    myContract = await MyContract.deploy(owner.address);
    await myContract.deployed();

  })

  describe("Array manipulation", function () {
    it("Add address to variable", async function () {
      const arrayTx = await myContract.addToArray(owner.address)
      expect(arrayTx.from).to.eq(owner.address);
    });

    it("Start number of elements", async function () {
      const length = await myContract.getNFTMemberships();
      expect(length).to.eq(0)
    })

    it("After manipulation", async function () {
      const length = await myContract.getNFTMemberships();
      expect(length).to.eq(0)
      const arrayTx = await myContract.addToArray(owner.address)
      expect(arrayTx.from).to.eq(owner.address);
      const lengthAfter = await myContract.getNFTMemberships();
      expect(lengthAfter).to.eq(1)
    })

    it("[Error] Add zero address into array", async function() {
      await expectRevert(
        myContract.addToArray(constants.ZERO_ADDRESS),
        "Address should be valid"
      )
    })
  });

  

 
});
