// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title Interface for Zora Protocol's Media
 */
interface IWhitelistV1 {
    function initialize(address owner) external;
    function whitelistAddress(address[] memory addresses) external;
    function isWhiteListed(address needle) external view returns (bool);
    function pause() external;
    function unpause() external;
}
