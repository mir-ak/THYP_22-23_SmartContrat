// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.8;

contract MusiciansManager {
 
  event musicianCreated(string _artistName);
  event trackAddeed(string _artistName,string _title);
  event getTheTracks(Track[] _tracks);

  struct Track{
    string _title;
    uint _duration;
  }

  struct Musician {
    string _artistName;
    Track[] _tracks;
  }

  mapping(address => Musician) Musicians;

  address owner ;
  constructor (){
    owner = msg.sender; 
  }

  modifier onlyOwner(){
    require(msg.sender == owner, "Not the owner");
    _;
  }

  function addMusician(address _musicianAddress, string memory _artistName) external onlyOwner {
    require(bytes(Musicians[_musicianAddress]._artistName).length == 0 , "Ce musicien a deja cree");
    Musicians[_musicianAddress]._artistName = _artistName;
    emit musicianCreated(_artistName);  
  }

  function addTrack(address _musicianAddress , string memory _title, uint _duration) external onlyOwner {
    require(bytes(Musicians[_musicianAddress]._artistName).length > 0 , "Ce musicien n'existe pas");
    Track memory thistrack = Track(_title ,_duration);
    Musicians[_musicianAddress]._tracks.push(thistrack);
    emit  trackAddeed(Musicians[_musicianAddress]._artistName, _title);
  }

  function getTracks(address _musicianAddress) external {
    emit getTheTracks(Musicians[_musicianAddress]._tracks);
  }

}
