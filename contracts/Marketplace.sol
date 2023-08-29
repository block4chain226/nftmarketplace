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

    uint256 public PROTOCOL_FEE = 1000 wei;

    event ListedItem(address indexed nft, uint256 tokenId, address indexed owner, uint256 indexed price, uint256 date);

    modifier isApproved(address _nftAddress, uint256 _tokenId) {
        require(IERC721(_nftAddress).getApproved(_tokenId) != address(this), "token wasn't approved");
        _;
    }

    modifier isOwner(address _nftAddress, uint256 _tokenId) {
        require(IERC721(_nftAddress).ownerOf(_tokenId) == msg.sender, "you are not owner of the nft");
        _;
    }

    modifier getFee() {
        require(msg.value >= PROTOCOL_FEE, "you should pay fee");
        _;
    }

    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) external payable isApproved(_nftAddress, _tokenId) isOwner(_nftAddress, _tokenId) getFee {
        require(listedItems[_nftAddress][_tokenId].price == 0, "already listed");
        require(_price > 0, "_price == 0");
        listedItems[_nftAddress][_tokenId] = Listing(msg.sender, _price);
        IERC721(_nftAddress).safeTransferFrom(msg.sender, address(this), _tokenId);
        emit ListedItem(_nftAddress, _tokenId, msg.sender, _price, block.timestamp);
    }

    function batchListing(
        address _nftAddress,
        uint256[] calldata _tokenIds,
        uint256[] calldata _prices) external payable getFee {
        require(_nftAddress != address(0), "nft doesn't exist");
        require(_tokenIds.length > 0, "tokenIds must not be empty");
        require(_tokenIds.length == _prices.length, "arrays length are not equal");
        for (uint256 i; i < _tokenIds.length; ++i) {
            require(IERC721(_nftAddress).ownerOf(_tokenIds[i]) == msg.sender, "you are not owner of the nft");
            require(listedItems[_nftAddress][_tokenIds[i]].price == 0, "already listed");
            require(_prices[i] > 0, "price must be more than 0");
            listedItems[_nftAddress][_tokenIds[i]] = Listing(msg.sender, _prices[i]);
            IERC721(_nftAddress).safeTransferFrom(msg.sender, address(this), _tokenIds[i]);
            emit ListedItem(_nftAddress, _tokenIds[i], msg.sender, _prices[i], block.timestamp);
        }
    }

    function cancelListing(address _nftAddress, uint256 _tokenId) external isOwner(_nftAddress, _tokenId) {
        require(listedItems[_nftAddress][_tokenId].price > 0, "wasn't listed");
        delete listedItems[_nftAddress][_tokenId];
    }

    function buyItem(address _nftAddress, uint256 _tokenId) external payable getFee {
        require(listedItems[_nftAddress][_tokenId].price > 0, "wasn't listed");
        Listing memory item = listedItems[_nftAddress][_tokenId];
        require(msg.value == item.price + PROTOCOL_FEE, "not enough funds to buy this nft");
        listersEarned[item.owner] += item.price;
        delete listedItems[_nftAddress][_tokenId];
        IERC721(_nftAddress).safeTransferFrom(address(this), msg.sender, _tokenId);
    }

    function updateListing(
        address _nftAddress,
        uint256 _tokenId,
        uint256 new_price
    ) external {
        require(listedItems[_nftAddress][_tokenId].price > 0, "wasn't listed");
        require(new_price > 0, "new price = 0");
        Listing storage listing = listedItems[_nftAddress][_tokenId];
        require(listing.owner == msg.sender, "you are not owner of the nft");
        listedItems[_nftAddress][_tokenId].price = new_price;
    }

    function withdrawProceeds() external payable getFee {
        require(listersEarned[msg.sender] > 0, "you have no proceeds");
        uint256 balance = listersEarned[msg.sender];
        require(balance > 0, "user have no proceeds");
        require(address(this).balance >= balance, "marketplace has no enough funds");
        listersEarned[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success);
    }

    function getListing(address _nftAddress, uint256 _tokenId) external view returns (Listing memory) {
        require(_nftAddress != address(0), "adr 0");
        return listedItems[_nftAddress][_tokenId];
    }

    function getUserProceeds(address _account) external view returns (uint256) {
        require(_account != address(0), "adr 0");
        return listersEarned[_account];
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}