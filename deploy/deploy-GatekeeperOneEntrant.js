const { network, run, ehters } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainID = network.config.chainId;

  log("Deploying...");

  const gatekeeperOneEntrant = await deploy("GatekeeperOneEntrant", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
    // blockGasLimit: 1000000, // WHY IS THIS NOT WORKING?
  });

  log("---------------");
};
module.exports.tags = ["all", "gatekeeperone"];
