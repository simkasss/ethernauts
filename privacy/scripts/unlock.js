const { ethers } = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-goerli.g.alchemy.com/v2/NW7PWVbJEDvetNwwfXGraE71PLMqeBrw"
    )

    let signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./contracts_Privacy_sol_Privacy.abi", "utf8")
    const bin = fs.readFileSync("./contracts_Privacy_sol_Privacy.bin", "utf8")

    const privacy = new ethers.Contract(
        "0x0c0e3118076067BF41f354b1178fDE380D2335e7",
        abi,
        signer
    )
    console.log("...")
    const transactionResponse = await privacy.locked()
    const flattening = await privacy.ID().then((v) => v.toString())

    console.log("Unlocked")
    console.log(transactionResponse)
    console.log(flattening)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
