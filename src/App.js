import React, { useEffect, useState } from 'react';
import { Container, Fab } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import tmi from 'tmi.js'
import SoundFXPanel from './SoundFXPanel';
import AlertPanel from './AlertPanel';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import NotificationsIcon from '@material-ui/icons/Notifications';
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

const App = () => {
  const [page, setPage] = useState(0);
  const tmiInit = () => {
    client.connect().then((data) => {
    }).catch((err) => {
      console.log(err)
    });
    // client.on("message", (target, context, msg, self) => {
    // });
  };

  useEffect(() => {
    tmiInit();
  }, []);

  return (
    <MuiThemeProvider theme={tgm3Theme}>
      {(page) ?
        <AlertPanel client={client} channel={channel} />
        :
        <SoundFXPanel client={client} channel={channel} />
      }
      <Fab aria-label="alert" style={{ position: "fixed", right: "16px", bottom: "96px" }} onClick={() => setPage(0)}>
        <VolumeUpIcon />
      </Fab>
      <Fab aria-label="soundFX" style={{ position: "fixed", right: "16px", bottom: "16px" }} onClick={() => setPage(1)}>
        <NotificationsIcon />
      </Fab>
    </MuiThemeProvider>
  );
}

export default App;
