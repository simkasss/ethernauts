const { network, run, ehters } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying...");

  const magicNumberSolver = await deploy("MagicNumberSolver", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //await verify(magicNumberSolver.address, []);

  log("---------------");
};
module.exports.tags = ["all", "magicnumbersolver"];
