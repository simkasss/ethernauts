const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
  );

  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_MagicNumber_MagicNumber_sol_MagicNum.abi",
    "utf8"
  );

  const magicNumber = new ethers.Contract(
    "0x75b6470De76Dd219Cd17CbcfC7534C8120a88D52",
    abi,
    signer
  );
  console.log("...");
  // start to interact with a contract
  const solverSetter = await magicNumber.setSolver(
    "0x14F32d3a0cc134a7E56F1cDc888de95bc1Fc927c"
  );
  console.log("Solved");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
