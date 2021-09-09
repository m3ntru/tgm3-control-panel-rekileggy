import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core/';
import soundJson from './sound.json'
import BT1 from './img/b1.png'
import ImgList from './ImgList';
import './App.css';

export const SoundFXPanel = (props) => {

    const handleClick = name => event => {
        const { client, channel } = props;
        client.say(channel, name);
    };

    return (    
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
                                    {soundJson.yugiohList.map((data, index) => (
                                        <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                            <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!sound " + data.command)}>
                                                <div className="jb-button-img" >
                                                    <img src={ImgList[data.command]} alt='logo' />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    {soundJson.metalSlugList.map((data, index) => (
                                        <div style={{ display: 'inline-block', justifyContent: 'center', margin: '5px 5px' }}>
                                            <div className="jb-button" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleClick("!sound " + data.command)}>
                                                <div className="jb-button-img" >
                                                    <img src={ImgList[data.command]} alt='logo' />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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

export default SoundFXPanel;