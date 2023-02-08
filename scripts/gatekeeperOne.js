const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
  );

  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_GatekeeperOne_GatekeeperOne_sol_GatekeeperOne.abi",
    "utf8"
  );
  const bin = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_GatekeeperOne_GatekeeperOne_sol_GatekeeperOne.bin",
    "utf8"
  );

  const gatekeeperOne = new ethers.Contract(
    "0x14b14591B8F6aB871ab78dA6Fea6cc695D8E34A6",
    abi,
    signer
  );
  console.log("...");
  // start to interact with a contract
  const entrant = await gatekeeperOne.entrant();
  console.log(entrant);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
