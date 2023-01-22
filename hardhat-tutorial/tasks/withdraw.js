const { task } = require("hardhat/config");

task("withdraw", "Withdraw funds from DAO smartcontract")
  .addParam("contract", "DAO contract address")
  .setAction(async ({ contract }, { ethers }) => {
    const CryptoDevsDAO = await ethers.getContractAt("CryptoDevsDAO", contract);
    await CryptoDevsDAO.withdrawEther();
  });
