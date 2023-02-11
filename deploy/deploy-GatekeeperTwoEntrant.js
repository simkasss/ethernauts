const { network, run, ehters } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying...");

  const gatekeeperTwoEntrant = await deploy("GatekeeperTwoEntrant", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
    gasLimit: 12450000,
  });

  await verify(gatekeeperTwoEntrant.address, []);

  log("---------------");
};
module.exports.tags = ["all", "gatekeepertwo"];
