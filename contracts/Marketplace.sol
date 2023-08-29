// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NftMarketplace is ReentrancyGuard {

    struct Listing {
        address owner;
        uint256 price;
    }

    struct CollectionListing {
        address owner;
        uint256 price;
        uint256 amount;
    }

    // nft=>tokenId=>struct
    mapping(address => mapping(uint256 => Listing)) private listedItems;
    // owner=>nft=>array[tokensId]
    mapping(address => mapping(address => uint256[])) private usersListedNftTokens;
    mapping(address => address[]) private usersNfts;
    mapping(address => uint256) private listersEarned;

    event ListedItem(address indexed nft, uint256 tokenId, address indexed owner, uint256 indexed price, uint256 date);

    modifier isApproved(address _nftAddress, uint256 _tokenId) {
        require(IERC721(_nftAddress).getApproved(_tokenId) != address(this), "token wasn't approved");
        _;
    }

    modifier isOwner(address _nftAddress, uint256 _tokenId) {
        require(IERC721(_nftAddress).ownerOf(_tokenId) == msg.sender, "you are not owner of the nft");
        _;
    }

    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) external isApproved(_nftAddress, _tokenId) isOwner(_nftAddress, _tokenId) {
        require(listedItems[_nftAddress][_tokenId].price == 0, "already listed");
        require(_price > 0, "_price == 0");
        listedItems[_nftAddress][_tokenId] = Listing(msg.sender, _price);
        emit ListedItem(_nftAddress, _tokenId, msg.sender, _price, block.timestamp);
    }

    function cancelListing(address _nftAddress, uint256 _tokenId) external isOwner(_nftAddress, _tokenId) {
        require(listedItems[_nftAddress][_tokenId].price > 0, "wasn't listed");
        delete listedItems[_nftAddress][_tokenId];
    }

    function buyItem(address _nftAddress, uint256 _tokenId) external payable {
        require(listedItems[_nftAddress][_tokenId].price > 0, "wasn't listed");
        Listing memory item = listedItems[_nftAddress][_tokenId];
        require(msg.value == item.price, "not enough funds to buy this nft");
        listersEarned[item.owner] += item.price;
        delete listedItems[_nftAddress][_tokenId];
        IERC721(_nftAddress).safeTransferFrom(item.owner, msg.sender, _tokenId);
    }

    function updateListing(
        address _nftAddress,
        uint256 _tokenId,
        uint256 new_price
    ) external isOwner(_nftAddress, _tokenId) {
        require(listedItems[_nftAddress][_tokenId].price > 0, "wasn't listed");
        require(new_price > 0, " new price = 0");
        listedItems[_nftAddress][_tokenId].price = new_price;
    }

    function withdrawProceeds() external {
        require(listersEarned[msg.sender] > 0, "you have nor proceeds");
        uint256 balance = listersEarned[msg.sender];
        listersEarned[msg.sender] = 0;
        (bool success,) = payable(msg.sender).call{value: balance}("");
        require(success);
    }

    function getListing(address _nftAddress, uint256 _tokenId) external view returns (Listing memory) {
        require(_nftAddress != address(0), "adr 0");
        return listedItems[_nftAddress][_tokenId];
    }
}