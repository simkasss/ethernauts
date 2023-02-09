const { getNamedAccounts, ethers, hre } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const magicNumberSolver = await ethers.getContract(
    "MagicNumberSolver",
    deployer
  );
  console.log("...");
  const deployment = await magicNumberSolver.deploy();
  await deployment.wait(1);
  const theAddress = await magicNumberSolver.theAddr();
  console.log(theAddress);
  console.log("Solved");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
