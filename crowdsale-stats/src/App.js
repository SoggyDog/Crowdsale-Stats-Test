import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import Crowdsale from './Crowdsale';


class App extends Component {
  state = {
    price: '',
    fundingGoal: '',
    balance: '',
    value: '',
    percent: '',
    address:''
  }
  async componentDidMount() {
    const price = await Crowdsale.methods.price().call();
    const fundingGoal = await Crowdsale.methods.fundingGoal().call();
    const balance = await web3.eth.getBalance(Crowdsale.options.address);
    const percent = await (balance/fundingGoal)*100;

    this.setState({ price, fundingGoal, balance, percent});
   }


  render() {
    return (
      <div>
        <h2>Crowdfund Stats</h2>
        <p> Our current funding goal is: {web3.utils.fromWei(this.state.fundingGoal, "ether")} Ethereum</p>
        <p>Token are currently {web3.utils.fromWei(this.state.price, "ether")} Ethereum per token.</p>
        <p> We have raised {web3.utils.fromWei(this.state.balance, "ether")} Ethereum so far!</p>
        We have reached {this.state.percent}% of our goal!

        <hr />

      </div>

    );
  }
}

export default App;
