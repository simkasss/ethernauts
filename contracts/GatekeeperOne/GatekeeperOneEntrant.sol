// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./GatekeeperOne.sol";

contract GatekeeperOneEntrant {
    GatekeeperOne public gate1;
    uint public gasLimit = 29373; //to pass gateTwo
    bytes8 txOriginConverted = 0x000000000000AAFE;
    uint32 txOriginInUint = 43774;

    uint16 conversion1;
    uint64 conversion2;
    uint32 conversion3;
    uint64 conBytes8toUint64;
    uint16 con64to16;

    constructor() {
        gate1 = GatekeeperOne(0x14b14591B8F6aB871ab78dA6Fea6cc695D8E34A6);
    }

    function gasLeft() public view returns (uint) {
        return gasleft();
    }

    function findTheKey(
        bytes8 _gateKey,
        uint64 something
    ) public returns (uint64) {
        //gateThree require3:
        conversion1 = uint16(uint160(tx.origin)); // answer is 43774 // AAFE in HEX
        // that means uint32(uint64(_gateKey)) = 43774
        // and uint16(uint64(_gateKey)) = 43774
        // but uint64(_gateKey) is not 43774

        // gateThree require2:
        // the number in uint64 is bigger than uint32 max value (4,294,967,295)
        con64to16 = uint16(something);
        conBytes8toUint64 = uint64(_gateKey);
        conversion2 = uint64(txOriginConverted);
        conversion3 = uint32(conversion2);
        return conBytes8toUint64;
    }

    function tryToEnter(bytes8 _key) public {
        gate1.enter(_key); // gateTwo: calling function gasLimit should be 29373 to pass gatetwo
    }
}
