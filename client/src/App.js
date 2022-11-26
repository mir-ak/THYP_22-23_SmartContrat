import "./App.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import MusiciansManager from "./contracts/MusiciansManager.json";
import "bootstrap/dist/css/bootstrap.css";

import { Form, Label, Input, Button } from "reactstrap";

const getWeb3 = () => {
  return new Web3("http://localhost:8545");
};

const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const network = MusiciansManager.networks[networkId];
  return new web3.eth.Contract(
    MusiciansManager.abi,
    network && network.address
  );
};

function App() {
  const [chanson, setChansons] = useState("");
  const [musicien, setMusicien] = useState("");
  //const [musiciansManager, SetmusiciansManager] = useState(undefined);

  async function fetchData() {
    try {
      const web3 = getWeb3();
      const contract = await getContracts(web3);
      const accounts = await web3.eth.getAccounts();
      const addmusic = await contract.methods
        .addMusician(accounts[0], musicien)
        .send({ from: accounts[0] });
      const addchanson = await contract.methods
        .addTrack(accounts[0], chanson, 500000)
        .send({ from: accounts[0] });
      console.log(addchanson, addmusic);
      const musiciansManager = await contract.methods
        .getTracks(accounts[0])
        .call();
      console.log(musiciansManager);
    } catch (e) {
      console.log(e);
    }
    setChansons("");
    setMusicien("");
  }

  const onchangeMusician = (e) => {
    setMusicien(e.target.value);
  };

  const onchangeChanson = (e) => {
    setChansons(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <div className="mb-3">
            <Label>Titre de Musicien</Label>
            <Input
              type="text"
              id="musicien"
              value={musicien}
              onChange={(e) => onchangeMusician(e)}
            />
          </div>

          <div className="mb-3">
            <Label>itre de la Chanson</Label>
            <Input
              type="text"
              id="chanson"
              value={chanson}
              onChange={(e) => onchangeChanson(e)}
            />
          </div>

          <Button
            type="submit"
            className="btn btn-primary"
            onClick={() => fetchData()}>
            transaction
          </Button>
        </Form>
      </header>
    </div>
  );
}

export default App;
