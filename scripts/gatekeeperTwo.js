const { ethers } = require("ethers");
const { hre } = require("hardhat");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
  );

  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_GatekeeperTwo_GatekeeperTwo_sol_GatekeeperTwo.abi",
    "utf8"
  );

  const gatekeeperTwo = new ethers.Contract(
    "0xF628740B94Ee2CF188e277404F8dfE7dc7c01ceB",
    abi,
    signer
  );
  console.log("...");
  // start to interact with a contract
  const entrant = await gatekeeperTwo.entrant();
  console.log(entrant);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
