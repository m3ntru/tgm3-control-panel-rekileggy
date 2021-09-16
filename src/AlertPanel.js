import React, { useState } from 'react';
import { Container, Grid, Typography, Button, TextField, Paper, Tooltip } from '@material-ui/core/';
import BT1 from './img/b1.png'
import ImgList from './ImgList';
import Basilisk from './img/basilisktime.png';
import './App.css';

export const AlertPanel = (props) => {
    const [id, setId] = useState("");
    const [text, setText] = useState("");

    const handleClick = name => event => {
        const { client, channel } = props;
        client.say(channel, name);
    };

    const handleRecallClick = name => event => {
        const { client, channel } = props;
        if (id) {
            if (name == "!cheer") {
                if (text) {
                    client.say(channel, name + ' ' + id);
                    client.say(channel, text);
                }
            }
            else if (!text) {
                client.say(channel, name + ' ' + id);
                client.say(channel, "0");
            }
            else {
                client.say(channel, name + ' ' + id);
                client.say(channel, text);
            }
        }
    };


    const handleIdChange = () => event => {
        var msg = event.target.value;
        setId(msg);
    };

    const handleTextChange = () => event => {
        var msg = event.target.value;
        setText(msg);
    };

    return (
        <div className="App">
            <div style={{ padding: '7px 0px' }}>
                <Container style={{ margin: '7px auto', padding: '15px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Container className="grid-container"  >
                                <Typography variant='subtitle2' component='p' className='block-title'>
                                    Alert Test
                                </Typography>
                                <div style={{ display: 'inline-block' }}>
                                    <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!彩學好帥")}>
                                            <div className="jb-button-img" >
                                                <img src={ImgList['cheer']} alt='logo' />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!小狗><")}>
                                            <div className="jb-button-img" >
                                                <img src={ImgList['donate']} alt='logo' />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!戴口罩勤洗手要消毒")}>
                                            <div className="jb-button-img" >
                                                <img src={ImgList['sub1']} alt='logo' />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!尊爵不凡")}>
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
                            <img src={Basilisk} alt='logo' style={{height: "80px"}} />
                                <div>
                                    <Button
                                        variant='contained'
                                        color="primary"
                                        style={{ margin: '10px 10px' }}
                                        onClick={handleClick("!basilisktime on")}
                                    >ON</Button>
                                    <Button
                                        variant='contained'
                                        style={{ margin: '10px 10px' }}
                                        onClick={handleClick("!basilisktime off")}
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
                                    onChange={handleIdChange()}
                                />
                                <TextField component={Paper}
                                    multiline
                                    label="Text"
                                    variant='outlined'
                                    rows={7}
                                    id="outlined-size-normal"
                                    size="small"
                                    style={{ width: '85%', margin: '5px 0px' }}
                                    onChange={handleTextChange()}
                                />
                                <div style={{ padding: '15px 0px' }}>
                                    <Button
                                        variant='contained'
                                        color="primary"
                                        style={{ margin: '0px 10px' }}
                                        onClick={handleRecallClick("!sub")}
                                    >Sub Tier1</Button>
                                    <Button
                                        variant='contained'
                                        color="primary"
                                        style={{ margin: '0px 10px' }}
                                        onClick={handleRecallClick("!subt3")}
                                    >Sub Tier3</Button>
                                    <Button
                                        variant='contained'
                                        color="primary"
                                        style={{ margin: '0px 10px' }}
                                        onClick={handleRecallClick("!cheer")}
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
                                    onClick={handleClick("!reload2.0")}
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
    );
}

export default AlertPanel;