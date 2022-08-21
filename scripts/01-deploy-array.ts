import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy(owner.address);

  await myContract.deployed();

  console.log(`deployed address ${myContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});