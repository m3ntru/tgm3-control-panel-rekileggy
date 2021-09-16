import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Tooltip, Radio, RadioGroup, FormControlLabel } from '@material-ui/core/';
import soundJson from './sound.json'
import BT1 from './img/b1.png'
import ImgList from './ImgList';
import './App.css';

export const SoundFXPanel = (props) => {

    const [multiValue, setmultiValue] = useState({});

    const handleChange = (event) => {
        setmultiValue(temp => {
            temp[event.target.name] = event.target.value;
            return { ...temp };
        });
    };

    const handleClick = name => event => {
        const { client, channel } = props;
        client.say(channel, name);
        console.log(name);
    };

    return (
        <div className="App">
            <div style={{ padding: '7px 0px' }}>
                <Container style={{ margin: '7px auto', padding: '15px' }}>
                    <Grid container spacing={2}>
                        {soundJson.map((data, index) => (
                            (data.multi) ?
                                <Grid item xs={12}>
                                    <Container className="grid-container"  >
                                        <Typography variant='subtitle2' component='p' className='block-title'>
                                            {data.name}
                                        </Typography>
                                        <RadioGroup row aria-label="gender" name={data.tag} defaultValue={"0"} onChange={handleChange}>
                                            {data.list.map((data, index) => (
                                                <FormControlLabel value={index.toString()} control={<Radio />} label={data.name} className='block-title' />
                                            ))}
                                        </RadioGroup>
                                        <div style={{ display: 'inline-block' }}>
                                            {
                                                data.list[(multiValue[data.tag]) ? (multiValue[data.tag]) : 0].list.map((data, index) => (
                                                    <Tooltip title={data.name} placement="bottom">
                                                        <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                            <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!sound " + data.command)}>
                                                                <div className="jb-button-img" >
                                                                    <img src={ImgList[data.command]} alt='logo' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tooltip>
                                                ))}
                                        </div>
                                    </Container>
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <Container className="grid-container"  >
                                        <Typography variant='subtitle2' component='p' className='block-title'>
                                            {data.name}
                                        </Typography>
                                        <div style={{ display: 'inline-block' }}>
                                            {data.list.map((data, index) => (
                                                <Tooltip title={data.name} placement="bottom">
                                                    <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                                        <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!sound " + data.command)}>
                                                            <div className="jb-button-img" >
                                                                <img src={ImgList[data.command]} alt='logo' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    </Container>
                                </Grid>
                        ))}
                    </Grid>
                </Container>
                <img src={BT1} alt='logo' style={{ display: 'none' }} />
            </div>
        </div>
    );
}

export default SoundFXPanel;