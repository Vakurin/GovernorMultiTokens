import { expect } from "chai";
import {ethers, deployments} from "hardhat";
import {
  ADDRESS_ZERO
} from "../helper-hardhat-config";
import {GovernanceNFT, GovernorContract} from "../typechain-types"
import { reserve } from "../utils/governanceNFT-utils";


describe("0-0-GovernorContract", function () {
  let owner: any;
  let addr1: any;
  let addr2: any;
  let governorContract: GovernorContract;
  let nft: GovernanceNFT;
  let nft2: GovernanceNFT;

  before(async () => {
    await deployments.fixture(["all"]);
    [owner, addr1, addr2] = await ethers.getSigners();
    nft = await ethers.getContract("GovernanceNFT");
    governorContract = await ethers.getContract("GovernorContract");
    await reserve(owner, 1)
    await deployments.fixture(["NFT2"]);
    nft2 = await ethers.getContract("GovernanceNFT");
  })

  describe('Check dao', function () {
    it('Should be version 2.0', async function(){
      const version = await governorContract.version()
      expect(version).to.eq('2.0')
    })
  })

  describe("Check implementation of DAO", function () {
    it('Should be one initital NFT', async function() {
      const numberOfNFT = await governorContract.getTokensLength()
      expect(numberOfNFT).to.eq(1)
    })

    it("[ERROR] Add same address", async function() {
      await expect(
        governorContract.addToken(nft.address)).to.be.revertedWith(
        "This address is already exsist"
      );
    })

    it("Add zero address", async function() {
      await expect(governorContract.addToken(ADDRESS_ZERO)).to.be.revertedWith(
          "Address should non-zero"
      );
      
    })

    it('Should add NFT token', async function() {
      expect(nft).not.to.be.eq(nft2)
      await governorContract.addToken(nft2.address)
      const numberOfNFT = await governorContract.getTokensLength()
      expect(numberOfNFT).to.eq(2)
    })

    it('Should mint NFT', async function(){
      // await nft.
    })
  })
});
