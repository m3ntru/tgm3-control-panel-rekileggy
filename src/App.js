import React, { useEffect, useState } from 'react';
import { Container, Fab, Tooltip } from '@material-ui/core/';
import { createTheme  } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import tmi from 'tmi.js'
import SoundFXPanel from './SoundFXPanel';
import AlertPanel from './AlertPanel';
import StopIcon from '@material-ui/icons/Stop';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './App.css';

const paramsId = new URLSearchParams(window.location.search).get("id");
const paramsToken = new URLSearchParams(window.location.search).get("token");
const channel = "zatd93"
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

const tgm3Theme = createTheme ({
  palette: {
    primary: {
      main: '#888888',
    },
    secondary: {
      main: '#ff0000',
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

  const handleClick = name => event => {
    client.say(channel, name);
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
      <Tooltip title="停止當前音效" placement="left">
        <Fab aria-label="alert" style={{ position: "fixed", right: "16px", bottom: "256px" }} onClick={handleClick("!stop")}>
          <StopIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="我ㄉ最愛(開發中)" placement="left">
        <Fab aria-label="alert" style={{ position: "fixed", right: "16px", bottom: "176px" }} onClick={handleClick("!stop")}>
          <FavoriteIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="音效庫" placement="left">
        <Fab aria-label="alert" style={{ position: "fixed", right: "16px", bottom: "96px" }} onClick={() => setPage(0)}>
          <LibraryMusicIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="通知測試" placement="left">
        <Fab aria-label="soundFX" style={{ position: "fixed", right: "16px", bottom: "16px" }} onClick={() => setPage(1)}>
          <SettingsIcon />
        </Fab>
      </Tooltip>
    </MuiThemeProvider>
  );
}

export default App;
