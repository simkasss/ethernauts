const { network, run, ehters } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainID = network.config.chainId;

  log("Deploying...");

  const preservationAttacker = await deploy("PreservationAttacker", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  await verify(preservationAttacker.address, []);

  log("---------------");
};
module.exports.tags = ["all", "preservationattacker"];
