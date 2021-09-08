import React, { Component } from 'react';
import { Container, Grid, Button, TextField, Paper, Typography } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import tmi from 'tmi.js'
import soundJson from './sound.json'
import BT1 from './img/b1.png'
import ImgList from './ImgList';
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
      main: '#888888',
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Container className="grid-container"  >
                    <Typography variant='subtitle2' component='p' className='block-title'>
                      Sound FX
                    </Typography>
                    <div style={{ display: 'inline-block' }}>
                      {soundJson.list.map((data, index) => (
                        // <Button
                        //   variant='contained'
                        //   color="primary"
                        //   style={{ margin: '10px 10px' }}
                        //   onClick={this.handleClick("!sound " + data.command)}
                        // >{data.name}</Button>
                        <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                          <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={this.handleClick("!sound " + data.command)}>
                            {/* {data.name} */}
                            <div className="jb-button-img" >
                              <img src={ImgList[data.command]} alt='logo' />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={9}>
                  <Container className="grid-container"  >
                    <Typography variant='subtitle2' component='p' className='block-title'>
                      Alert Test
                    </Typography>
                    <div style={{ display: 'inline-block' }}>
                    {/* <Button
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
                      >Tier3</Button> */}
                      <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={this.handleClick("!彩學好帥")}>
                          <div className="jb-button-img" >
                            <img src={ImgList['cheer']} alt='logo' />
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={this.handleClick("!小狗><")}>
                          <div className="jb-button-img" >
                            <img src={ImgList['donate']} alt='logo' />
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={this.handleClick("!戴口罩勤洗手要消毒")}>
                          <div className="jb-button-img" >
                            <img src={ImgList['sub1']} alt='logo' />
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={this.handleClick("!尊爵不凡")}>
                          <div className="jb-button-img" >
                            <img src={ImgList['sub3']} alt='logo' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={3}>
                  <Container className="grid-container"  >
                    <Typography variant='subtitle2' component='p' className='block-title'>
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
                  <Container className="grid-container" >
                    <Typography variant='subtitle2' component='p' className='block-title'>
                      Recall
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
                  <Container className="grid-container"  >
                    <div className="jb-button">
                      <div className="jb-button-img" >
                        <img src='https://static-cdn.jtvnw.net/emoticons/v2/78084/default/dark/4.0' alt='logo' />
                      </div>
                    </div>
                  </Container>
                </Grid>
                <Grid item xs={4}>
                  <Container className="grid-container"  >
                    <Button
                      variant='contained'
                      color="secondary"
                      style={{ margin: '10px 10px' }}
                      onClick={this.handleClick("!reload2.0")}
                    >ALERTBOX Reload</Button>
                  </Container>
                </Grid>
                <Grid item xs={4}>
                  <Container className="grid-container"  >
                    <div className="jb-button">
                      <div className="jb-button-img" >
                        <img src='https://static-cdn.jtvnw.net/emoticons/v2/78084/default/dark/4.0' alt='logo' />
                      </div>
                    </div>
                  </Container>
                </Grid>
              </Grid>
            </Container>
            <img src={BT1} alt='logo' style={{ display: 'none' }} />            
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
