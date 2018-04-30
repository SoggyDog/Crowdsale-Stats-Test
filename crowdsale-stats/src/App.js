import React, { Component } from 'react';
//import logo from './logo.svg';
//mport './App.css';
import web3 from './web3';
import Crowdsale from './Crowdsale';
import { Progress, Statistic, Segment  } from 'semantic-ui-react'

class App extends Component {
  state = {
    price: '',
    fundingGoal: '',
    balance: '',
    value: '',
    percent: '',
    address:'',
    priceETH:'',
    amountRaised:'',
    amountRaisedETH:'',
    softCap:'',
    softCapPercent:'',
    softCapETH:'',
    whitelist:''
  }
  async componentDidMount() {
    const price = await Crowdsale.methods.price().call();
    const priceETH = await web3.utils.fromWei(price);
    const fundingGoal = await Crowdsale.methods.fundingGoal().call();
    const fundingGoalETH= await web3.utils.fromWei(fundingGoal);
    const amountRaised = await Crowdsale.methods.amountRaised().call();
    const amountRaisedETH = await web3.utils.fromWei(amountRaised);
    const balance = await web3.eth.getBalance(Crowdsale.options.address);
    const percent = await (amountRaised/fundingGoal)*100;
    const softCap = await (fundingGoalETH * .25);
    const softCapPercent = await (amountRaisedETH/softCap)*100
    //const whitelist = await Crowdsale.methods.isAuthorized().call();
 

    this.setState({ price, priceETH, fundingGoal, balance, amountRaisedETH, percent, fundingGoalETH, softCapPercent , softCap });     
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const receiver = 0x71fb5826ae743fb4300db17a40f104df12da0a88


    //this.setState({ message:'Woiting for transaction seccess..."'});

    //web3.sendTransaction({to:receiver, from: accounts[0], value:web3.toWei("0.5", "ether")})

    await Crowdsale.methods.enter().send({
      from: accounts[0],
      to: receiver,
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    //this.setState({ message: 'You have been entered!' });

  };




  render() {
    return (
        <div>
          
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
            <Statistic.Group width='4'>
            <Statistic size ='mini' color='teal'>
            <Statistic.Label>Funding Hard Cap</Statistic.Label>
            <Statistic.Value>{this.state.fundingGoalETH}</Statistic.Value>
            <Statistic.Label>ETH</Statistic.Label>
            </Statistic><br/>

            <Statistic size ='mini' color='orange'>
            <Statistic.Label>Funding Soft Cap</Statistic.Label>
            <Statistic.Value>{this.state.softCap}</Statistic.Value>
            <Statistic.Label>ETH</Statistic.Label>
            </Statistic><br/>

            <Statistic size ='mini' color='blue'>
            <Statistic.Label>Price per token:</Statistic.Label>
            <Statistic.Value>{this.state.priceETH}</Statistic.Value>
            <Statistic.Label>ETH</Statistic.Label>
            </Statistic>

            <Statistic size ='mini' color='red'>
            <Statistic.Label>We have raised:</Statistic.Label>
            <Statistic.Value>{this.state.amountRaisedETH}</Statistic.Value>
            <Statistic.Label>ETH</Statistic.Label>
            </Statistic>
            </Statistic.Group>
            <Progress percent={this.state.percent} color='teal' size = "medium"  progress precision = '0' > Funding Goal Hard Cap </Progress>
            <Progress percent={this.state.softCapPercent} color='orange' size = "medium"  progress precision = '0' >Funding Goal Soft Cap </Progress><br/>

                    <h2>Purchase The Health Coin Tokens</h2>
          <hr />
          <form onSubmit={this.onSubmit}>
            <h4> </h4>
            <div>
              <label>Enter the amount of Ethereum to purchase tokens: </label>
              <input
              value={this.state.value}
              onChange={event=> this.setState({ value: event.target.value })}
            />
            </div>
            <button>Enter</button>
          </form>
          <hr />
         
        </div>  

    );
  }
}

export default App;
