import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, TextField, Paper, Tooltip, Switch, FormControl, Select, MenuItem } from '@material-ui/core/';
import BT1 from './img/b1.png'
import ImgList from './ImgList';
import BasiliskImg from './img/basilisktime.png';
import GiftImg from './img/gift.png';
import './App.css';

export const AlertPanel = (props) => {
    const [id, setId] = useState("");
    const [text, setText] = useState("");
    const [reload, setReload] = useState(true);
    const [basilisk, setBasilisk] = useState(false);
    const [giftboost, setGiftboost] = useState(false);
    const [source, setSource] = useState(false);
    const [lang, setLang] = useState("ch");
    const [recall, setRecall] = useState(false);
    const ln = ["ch", "en", "tw", "jp", "fr", "ko"];
    const { client, channel } = props;
    useEffect(() => {
        getSetting();
    }, []);
    
    const getSetting = async () => {
        await fetch('https://m3ntru-api.vercel.app/api/alert/tetristhegrandmaster3')
        .then(response=>{
          return response.json();
        })
        .then(data=>{
          setBasilisk(data.basilisk);
          setGiftboost(data.gift);
          setLang(data.lang);
          setSource(data.source);
        })
        .catch(error => console.error(error))
    };

    const setSetting = async (key, value) => {
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        let settingBody = {"twitch": "tetristhegrandmaster3"};
        settingBody[key] = value;
        await fetch('https://m3ntru-api.vercel.app/api/alert/',{method: "POST", headers, body: JSON.stringify(settingBody)})
        .then(response=>{
          return response.json();
        })
        .then(data=>{
          console.log(data);
        })
        .catch(error => console.error(error))
    };
    
    const handleCommonClick = name => event => {
        client.say(channel, name);
    };

    // const handleClick = name => event => {
    //     const { client, channel } = props;
    //     client.say(channel, name);
    // };

    const handleRecallClick = name => event => {
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

    const handleSwitchChange = (value) => event => {
        const status = (event.target.checked)? "on" : "off";
        switch(value)
        {
            case "basilisk":
                setBasilisk(event.target.checked);
                client.say(channel, "!basilisktime " + status);
                setSetting("basilisk", event.target.checked);
                break;
            case "giftboost":
                setGiftboost(event.target.checked);
                client.say(channel, "!giftboost " + status);
                setSetting("gift", event.target.checked);
                break;
            case "reload":
                setReload(!event.target.checked);
                break;
            default:
                break;
        }
    };

    const handleLangChange = () => event =>  {
        setLang(event.target.value);
        client.say(channel, "!lang " + event.target.value);
        setSetting("lang", event.target.value);
    } 

    const handleSourceChange = () => event =>  {
        const result = (event.target.value == "Chat")
        const status = (result)? "on" : "off";
        setSource(result);
        client.say(channel, "!source " + status);
        setSetting("source", result);
    } 

    return (
        <div className="App">
            <div style={{ padding: '7px 0px' }}>
                <Container style={{ margin: '7px auto', padding: '15px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Container className="grid-container"  >
                                        <Typography variant='subtitle2' component='p' className='block-title'>
                                            Alert Test
                                        </Typography>
                                        <div style={{ display: 'inline-block' }}>
                                            <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleCommonClick("!彩學好帥")}>
                                                    <div className="jb-button-img" >
                                                        <img src={ImgList['cheer']} alt='logo' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleCommonClick("!小狗><")}>
                                                    <div className="jb-button-img" >
                                                        <img src={ImgList['donate']} alt='logo' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleCommonClick("!戴口罩勤洗手要消毒")}>
                                                    <div className="jb-button-img" >
                                                        <img src={ImgList['sub1']} alt='logo' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleCommonClick("!尊爵不凡")}>
                                                    <div className="jb-button-img" >
                                                        <img src={ImgList['sub3']} alt='logo' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleCommonClick("!戴口罩勤洗手要消毒 g")}>
                                                    <div className="jb-button-img" >
                                                        <img src={ImgList['subg1']} alt='logo' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleCommonClick("!尊爵不凡 g")}>
                                                    <div className="jb-button-img" >
                                                        <img src={ImgList['subg3']} alt='logo' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Container>
                                </Grid> 
                                <Grid item xs={12}>
                                <Container className="grid-container" >
                                    <Typography variant='subtitle2' component='p' className='block-title'>
                                        Recall
                                    </Typography>
                                    <Typography variant='subtitle2' component='p' className='block-title'>
                                        General <Switch checked={recall} onChange={()=>{setRecall(!recall)}}/> Elevated
                                    </Typography>
                                    {(recall)?
                                    <div style={{width: '100%'}}>
                                    </div>
                                    :
                                    <div style={{width: '100%'}}>
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
                                    </div>
                                    }
                                    </Container>
                                </Grid>   
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Container className="grid-container"  >
                                        <Grid container spacing={2} className="label-switch" style={{margin: 'auto'}}>
                                            <Grid style={{margin: 'auto'}} item xs={6}>
                                                <img title="Basilisk" src={BasiliskImg} alt='logo' style={{height: "40px"}} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Switch checked={basilisk} onChange={handleSwitchChange('basilisk')}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className="label-switch" style={{margin: 'auto'}}>
                                            <Grid style={{margin: 'auto'}} item xs={6}>
                                                <img title="Gift Boost" src={GiftImg} alt='logo' style={{height: "40px"}} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Switch checked={giftboost} onChange={handleSwitchChange('giftboost')}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className="label-switch" style={{margin: 'auto'}}>
                                            <Grid style={{margin: 'auto'}} item xs={6}>
                                                🌎
                                            </Grid>
                                            <Grid item xs={6}>
                                            <FormControl>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    style={{backgroundColor: "#999999", padding: "1px 8px"}}
                                                    value={lang}
                                                    onChange={handleLangChange()}
                                                >
                                                    {ln.map((data, index) => (
                                                        <MenuItem key={data} value={data}>{data}</MenuItem>
                                                    ))}
                                                    <MenuItem key={"random"} value={"random"}>{"random"}</MenuItem>
                                                </Select>
                                            </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className="label-switch" style={{margin: 'auto'}}>
                                            <Grid style={{margin: 'auto'}} className="block-title" item xs={6}>
                                                source
                                            </Grid>
                                            <Grid item xs={6}>
                                            <FormControl>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    style={{backgroundColor: "#999999", padding: "1px 8px"}}
                                                    value={(source)?"Chat":"Streamlabs"}
                                                    onChange={handleSourceChange()}
                                                >
                                                    <MenuItem key={false} value={"Streamlabs"}>SL</MenuItem>
                                                    <MenuItem key={true} value={"Chat"}>Chat</MenuItem>
                                                </Select>
                                            </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </Grid>
                                <Grid item xs={12}>
                                    <Container className="grid-container"  >
                                        <Switch
                                            color="default"
                                            onChange={handleSwitchChange('reload')}
                                        />
                                        <Button
                                            disabled={reload}
                                            variant='contained'
                                            color="secondary"
                                            style={{ margin: '10px 10px' }}
                                            onClick={handleCommonClick("!reload2.0")}
                                        >ALERTBOX Reload</Button>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <img src={BT1} alt='logo' style={{ display: 'none' }} />
            </div>
        </div>
    );
}

export default AlertPanel;