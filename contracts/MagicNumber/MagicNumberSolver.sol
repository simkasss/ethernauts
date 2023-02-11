// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// https://www.youtube.com/watch?v=0qQUhsPafJc

// Runtime code (stores and returns a number)
// Creation code (deploys the smart contract and the runtime code)
// Factory contract

/*
RUNTIME CODE:
mstore(p,v) - store v at memory from p to p+32
Store number(for example 42) to memory

PUSH1 0x2a      - v (42)
PUSH1 0         - p (0)
MSTORE

return(p,s) - end execution and return data from memory from p to p + s
Return 32 bytes from memory (from 0 to 32)

PUSH1 0x20      - s (32)
PUSH1 0         - p (0)
RETURN

translation in bytecode - 602a60005260216000f3
This is our run time bytecode

CREATION CODE:

Store run time code to memory from 0 to 32 bytes
PUSH10 602a60005260216000f3         (22 zeros are added in the beggining so it would be 32 byte)
PUSH1 0
MSTORE

Return 10 bytes (runtime code) from memory starting at offset 22

PUSH1 0x0a          (return 10 bytes)
PUSH1 0x16          (return from 22 bytes)
RETURN

translation in bytecode (of runtime code and creation code) - 69602a60005260216000f3600052600a6016f3

*/

// FACTORY CONTRACT:

contract MagicNumberSolver {
    event Log(address addr);
    address public theAddr;

    function deploy() external {
        bytes memory bytecode = hex"69602a60005260206000f3600052600a6016f3";
        address addr;
        assembly {
            // create(value, offset, size)
            addr := create(0, add(bytecode, 0x20), 0x13)
        }
        require(addr != address(0));
        theAddr = addr;

        emit Log(addr);
    }
}
