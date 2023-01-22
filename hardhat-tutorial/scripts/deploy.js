const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

const WAIT_BLOCK_CONFIRMATIONS = 6;

async function waitToConfirmations(contract) {
  console.log(`Waiting for ${WAIT_BLOCK_CONFIRMATIONS} confirmations...`);

  await contract.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
}

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  const contractArguments = [
    fakeNftMarketplace.address,
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
  ];

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(...contractArguments, {
    // This assumes your account has at least 1 ETH in it's account
    // Change this value as you want
    value: ethers.utils.parseEther("1"),
  });

  console.log(
    `Contract deployed to ${cryptoDevsDAO.address} on ${network.name}`
  );
  await waitToConfirmations(cryptoDevsDAO);
  await run(`verify:verify`, {
    address: cryptoDevsDAO.address,
    constructorArguments: contractArguments,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
