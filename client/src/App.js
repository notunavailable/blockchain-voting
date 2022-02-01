import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {candidates: null, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.setCandidates("Chaz", 0).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCandidateName().call();

    // Update state with the result.
    this.setState({ candidates: response});
  };

  setCandidate1 = async () => {
    const { accounts, contract } = this.state;

    await contract.methods.setCandidateName("Chaz", 0).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCandidateName().call();

    // Update state with the result.
    this.setState({ candidates: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <div>Candidate 1: {this.state.candidates[0]}</div>
        <div>Candidate 2: {this.state.candidates[1]}</div>
        <div>Set candidate 1 to Chaz</div>
        <div styles = {{"cursor": "pointer"}}onClick = {e => {this.setCandidate1()}}>Button</div>
      </div>
    );
  }
}

export default App;
