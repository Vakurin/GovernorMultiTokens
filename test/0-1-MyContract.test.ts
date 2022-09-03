import { expect } from "chai";
import { ethers } from "hardhat";
import {
  ADDRESS_ZERO
} from "../helper-hardhat-config";

describe("0-1-MyContract", function () {
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
      await expect(myContract.addToArray(ADDRESS_ZERO)).to
      .be.revertedWith("Address should be valid")
        
    })
  });

  

 
});
