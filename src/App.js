import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import tmi from 'tmi.js'
import './App.css';

const paramsId = new URLSearchParams(window.location.search).get("id");
const paramsToken = new URLSearchParams(window.location.search).get("token");

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: (paramsId) ? paramsId : 'justinfan123456',
    password: (paramsToken) ? paramsToken : ''
  },
  channels: ['zatd93']
});

class App extends Component {
  tmiInit = () => {
    client.connect().then((data) => {
    }).catch((err) => {
      console.log(err)
    });

    client.on("message", (target, context, msg, self) => {
      
    });
  };

  handleClick = (name) => {
    client.say("zatd93", "!LP");
  };

  componentDidMount() {
    this.tmiInit();
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Button 
          variant='contained'
          onClick={this.handleClick}
        >LP Count</Button>
        </header>
      </div>
    );
  }
}

export default App;
