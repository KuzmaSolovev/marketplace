// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import {IMarket} from "./IMarket.sol";

/**
 * @title Interface for Zora Protocol's Media
 */
interface IMedia {
    struct Egg {
        uint16 _supply;
    }
    struct EIP712Signature {
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    struct MediaData {
        // A valid URI of the metadata associated with this token
        string metadataURI;

        // The name of the media
        string name;
    }

    /**
     * @notice Return the metadata URI for a piece of media given the token URI
     */
    function tokenMetadataURI(uint256 tokenId)
        external
        view
        returns (string memory);

    /**
     * @notice Mint new media for msg.sender.
     */
    function mint(MediaData calldata data, IMarket.BidShares calldata bidShares)
        external;

    /**
     * @notice Transfer the token with the given ID to a given address.
     * Save the previous owner before the transfer, in case there is a sell-on fee.
     * @dev This can only be called by the auction contract specified at deployment
     */
    function auctionTransfer(uint256 tokenId, address recipient) external;

    /**
     * @notice Set the ask on a piece of media
     */
    function setAsk(uint256 tokenId, IMarket.Ask calldata ask) external;

    /**
     * @notice Remove the ask on a piece of media
     */
    function removeAsk(uint256 tokenId) external;

    /**
     * @notice Set the bid on a piece of media
     */
    function setBid(uint256 tokenId, IMarket.Bid calldata bid) external;

    /**
     * @notice Remove the bid on a piece of media
     */
    function removeBid(uint256 tokenId) external;

    function acceptBid(uint256 tokenId, IMarket.Bid calldata bid) external;

    /**
     * @notice Revoke approval for a piece of media
     */
    function revokeApproval(uint256 tokenId) external;


    function getTokenOwnedSize(address addr) external returns(uint256);
    
    function getTokenByAddress(address addr, uint ownedTokenIdx) external returns(uint256);

    function getOwner(uint256 tokenId) external returns (address);

    event Return(uint256);
}
