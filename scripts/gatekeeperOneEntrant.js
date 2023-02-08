const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const gatekeeperOneEntrant = await ethers.getContract(
    "GatekeeperOneEntrant",
    deployer
  );
  console.log("...");
  const gasLeft = await gatekeeperOneEntrant
    .gasLeft()
    .then((v) => v.toString());
  //const transactionResponse = await gatekeeperOneEntrant.tryToEnter("");
  //await transactionResponse.wait(1);
  console.log(gasLeft);
  console.log("...");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
