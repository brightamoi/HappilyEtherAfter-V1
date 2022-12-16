// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  const marryMeContract = await ethers.getContractFactory(
    "MarriageCertificate"
  );

  // here we deploy the contract
  const deployedMarryeContract = await marryMeContract.deploy();

  // wait for the contract to deploy
  await deployedMarryeContract.deployed();

  console.log("MarryMe contract address: 👉", deployedMarryeContract);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
