// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PixelNft is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    string private baseURI = "QmVGEQy16PrK9zWBKoKoaz9UDyfc7Wg9pExJ5ZJ133BxAT/";

    constructor() ERC721("PixelNft", "PXN") {}

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) internal {
        _burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        _requireMinted(tokenId);
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat("https://ipfs.io/ipfs/", baseURI, tokenId.toString(), ".json") : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newURI) private onlyOwner {
        baseURI = newURI;
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}