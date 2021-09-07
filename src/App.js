import React, { Component } from 'react';
import { Container, Grid, Button, TextField, Paper, Typography } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import tmi from 'tmi.js'
import soundJson from './sound.json'
import './App.css';

const paramsId = new URLSearchParams(window.location.search).get("id");
const paramsToken = new URLSearchParams(window.location.search).get("token");
const channel = "zatd39"
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
  channels: [channel]
});

const tgm3Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: 'Noto Sans TC,sans-serif',
  },
});

class App extends Component {
  state = {
    id: "",
    text: "",
  }
  tmiInit = () => {
    client.connect().then((data) => {
    }).catch((err) => {
      console.log(err)
    });

    client.on("message", (target, context, msg, self) => {

    });
  };

  handleClick = name => event => {
    client.say(channel, name);
  };

  handleRecallClick = name => event => {
    if (this.state.id) {
      if (name == "!cheer") {
        if (this.state.text) {
          client.say(channel, name + ' ' + this.state.id);
          client.say(channel, this.state.text);
        }
      }
      else if (!this.state.text) {
        client.say(channel, name + ' ' + this.state.id);
        client.say(channel, "0");
      }
      else {
        client.say(channel, name + ' ' + this.state.id);
        client.say(channel, this.state.text);
      }
    }
  };

  handleIdChange = () => event => {
    var msg = event.target.value;
    this.setState({
      id: msg,
    });
  };

  handleTextChange = () => event => {
    var msg = event.target.value;
    this.setState({
      text: msg,
    });
  };

  componentDidMount() {
    this.tmiInit();
  }

  render() {
    return (
      <MuiThemeProvider theme={tgm3Theme}>
        <div className="App">
          <div style={{ padding: '7px 0px' }}>
            <Container style={{ margin: '7px auto', padding: '15px' }}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant='subtitle2' component='p' style={{ color: '#008076' }}>
                      音效區
                    </Typography>
                    <div>
                    {soundJson.list.map((data, index) => (
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!sound " + data.command)}
                      >{data.name}</Button>
                    ))}
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={8}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant='subtitle2' component='p' style={{ color: '#008076' }}>
                      通知測試
                    </Typography>
                    <div>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!彩學好帥")}
                      >Bit</Button>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!小狗><")}
                      >Donate</Button>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!戴口罩勤洗手要消毒")}
                      >Tier1</Button>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!尊爵不凡")}
                      >Tier3</Button>
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={4}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant='subtitle2' component='p' style={{ color: '#008076' }}>
                      Basilisk Time
                    </Typography>
                    <div>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!basilisktime on")}
                      >ON</Button>
                      <Button
                        variant='contained'
                        style={{ margin: '10px 10px' }}
                        onClick={this.handleClick("!basilisktime off")}
                      >OFF</Button>
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={12}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px' }} >
                    <Typography variant='subtitle2' component='p' style={{ color: '#008076' }}>
                      手動 Recall
                    </Typography>
                    <TextField component={Paper}
                      label="Twitch id"
                      variant='outlined'
                      id="outlined-size-normal"
                      size="small"
                      style={{ width: '85%', margin: '10px 0px' }}
                      onChange={this.handleIdChange()}
                    />
                    <TextField component={Paper}
                      multiline
                      label="Text"
                      variant='outlined'
                      rows={7}
                      id="outlined-size-normal"
                      size="small"
                      style={{ width: '85%', margin: '5px 0px' }}
                      onChange={this.handleTextChange()}
                    />
                    <div style={{ padding: '15px 0px' }}>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '0px 10px' }}
                        onClick={this.handleRecallClick("!sub")}
                      >Sub Tier1</Button>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '0px 10px' }}
                        onClick={this.handleRecallClick("!subt3")}
                      >Sub Tier3</Button>
                      <Button
                        variant='contained'
                        color="primary"
                        style={{ margin: '0px 10px' }}
                        onClick={this.handleRecallClick("!cheer")}
                      >Cheer</Button>
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={4}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <img src='https://cdn.discordapp.com/emojis/809889506089893888.png?v=1' alt='logo' />
                  </Container>
                </Grid>
                <Grid item xs={4}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <Button
                      variant='contained'
                      color="secondary"
                      style={{ margin: '10px 10px' }}
                      onClick={this.handleClick("!reload2.0")}
                    >ALERTBOX Reload</Button>
                  </Container>
                </Grid>
                <Grid item xs={4}>
                  <Container style={{ backgroundColor: '#e0f2f1', padding: '15px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <img src='https://cdn.discordapp.com/emojis/809889506089893888.png?v=1' alt='logo' />
                  </Container>
                </Grid>
              </Grid>
            </Container>

          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
