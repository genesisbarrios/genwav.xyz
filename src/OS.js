
import { useState } from "react";
import { Key, ReactChild, ReactFragment, ReactPortal, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css'
import Grid from '@material-ui/core/Grid'
import { Alert, SliderThumb } from "@material-ui/core";
import '@react95/icons/icons.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactModal from 'react-modal';

import { Avatar } from "react95";
import React from "react";
import { Mail, Mail2, CdMusic, cdMusicData, MediaVideo, mediaVideoData, Mic } from '@react95/icons';
import { GlobeSimple, InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo, PatreonLogo  } from "@phosphor-icons/react";
import axios from "axios"; 
import {Card, CardContent, div, Paper} from "@material-ui/core";

const GenWavOS = (props) => {
  const [showModal, toggleShowModal] = React.useState(true);
  const handleOpenModal = () => toggleShowModal(true);
  const handleCloseModal = () => toggleShowModal(false);
  const [email, setEmail] = useState("");
  const [fan, setFan] = useState(false);
  const [producer, setProducer] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagam, setInstagram] = useState("");
  const [artist, setArtist] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    
    //hide elements
    if(document){
    const welcomeBox = document.getElementById("welcomeBox");
    welcomeBox.style.display = "none";
    }

  }, []);

  useEffect(() => {
   
  }, []);

  function handleOpenDialog(){
    //<a href="https://www.beatstars.com/genwav/sound-kits/192047" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}></a>
    if(document){
      const dialog = document.querySelector("dialog")
      dialog.showModal();
    }
  }

  function handleCloseSignUp() {
    if(document){
      const dialog = document.querySelector("dialog")
      dialog.close();
    }
  }

  function handleSubmit() {
    console.log('handle submit request to subscribe')
  
    // Check if data is valid
    if (!email) {
      console.log('No e-mail address provided');
      setAlert('Please set an e-mail address~');
      return;
    }

    // Instagram handle normalization
    let normalizedInstagram = instagam.trim();
    if (normalizedInstagram) {
      // Remove any @ symbol
      normalizedInstagram = normalizedInstagram.replace(/^@/, '');
      // If it's a link, leave it (but strip @ if present)
      if (
        normalizedInstagram.startsWith('http://') ||
        normalizedInstagram.startsWith('https://')
      ) {
        // Already a link, just ensure no @
        normalizedInstagram = normalizedInstagram.replace('@', '');
      } else {
        // Not a link, prepend
        normalizedInstagram = `https://instagram.com/${normalizedInstagram}`;
      }
    }


    const dataToSend = {
      email,
      producer,
      artist,
      fan,
      name, 
      phoneNumber, 
      normalizedInstagram
    };
  
    // Make a POST request using Axios
    axios.post('https://genwav-node-server.vercel.app/addUser', dataToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        console.log('Request successful');
        setMessage("Your e-mail has been saved!")
        setAlert(''); // Resetting alert if necessary
      })
      .catch((error) => {
        setAlert("There was an error.");
        console.error('Error: ', error);
        setMessage(''); // Resetting message if necessary
      });
  }

  return(
    
    <div id="OS" style={{paddingBottom:"5%"}}>
          
      <Grid container spacing={3} style={{maxWidth:"100%", margin: "0 auto"}}> 
        <Grid item sm={12} md={4} order={{ xs: 3, md: 1 }} style={{marginTop:"6%"}}> 
          <Card className="card" style={{width:'90%', marginBottom:"5%"}}>
            <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/mmsys_111.ico" width="25" height="25" className="image" />  Music Videos </div>
            <CardContent>
              <iframe style={{borderRadius:"12px"}} width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLcGBMxEyx5p8Wknn5d3dhCnj4noeArd3Q&controls=1" title="YouTube video player" showControls allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </CardContent>
          </Card>
          <Card className="card" style={{width:'90%', minHeight: '700px', marginBottom:"5%"}}>
            <div>
              <img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/mmsys_105.ico" width="20" height="20"/> Beats</div>
              <CardContent>
                <iframe 
                    src="https://player.beatstars.com/?storeId=140652" 
                    width="100%" 
                    height="650">
                </iframe>
              </CardContent>
            </Card>
          
             <Card className="card" style={{width:'90%', minHeight: '200px', marginBottom:"5%"}}>
                <div className="cardHeader"><img className="image" src="https://dl.dropboxusercontent.com/s/6vust1jdp7z9iav22r8to/WAV-PACK-VOL.-II.jpg?rlkey=jaacek14fg07zr501im1bmr5z&st=vf1ckdxb&dl=0" width="20px" ></img> The Wav Pack Vol. II - Sample Pack</div>
                  <a className="slide" target="_blank" href="https://www.beatstars.com/genwav/sound-kits/236319">
                    <img src="/WavPack.jpg" style={{width:"100%", cursor:"pointer"}} />
                  </a>
              </Card>
              
              {/* <Card className="card" style={{width:'90%', minHeight: '200px'}}>
                  <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/mmsys_120.ico" width="25" height="25" className="image" /> Services</div>
                  <Carousel centerMode={true} dynamicHeight={false} centerSlidePercentage={100} showIndicators={false} infiniteLoop showThumbs={false} className="custom-carousel">
                      <div className="slide" style={{cursor:"pointer"}}>
                        <a href="https://www.beatstars.com/genwav/services" target="_blank">
                          <img src="https://dl.dropboxusercontent.com/s/q0re59rr1p9srdjsqvbne/audioengineering.png?rlkey=jm3gfyv5ipbl4fewzskm0ojzo&st=qzy7kvr2&dl=0" />
                          <button className="legend" style={{textDecoration:"none", cursor:"pointer"}}><GlobeSimple width={25} className="igLogo"></GlobeSimple></button>
                        </a>
                      </div>
                      <div className="slide" style={{cursor:"pointer"}}>
                          <a href="https://enigma-labs.com" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}>
                            <img src="https://dl.dropboxusercontent.com/s/ekvec97o9wgep3ms1s9v6/enigma.png?rlkey=fik21bg0c74ne0fjpdfmhplqe&st=mbevmc54&dl=0" />
                            <button className="legend" style={{textDecoration:"none", cursor:"pointer"}}><GlobeSimple width={25} className="igLogo"></GlobeSimple></button>
                          </a>
                      </div>
                  </Carousel>
              </Card> */}
        </Grid>
       
          <Grid item xs={12} sm={12} md={4} order={{ xs: 1, sm: 1 }} style={{ width: "80%" }}>
                <div id="socials" style={{paddingTop:"10px", display:"flex", justifyContent:"space-between"}}>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="http://instagram.com/gen.wav" style={{textDecoration:"none"}}>
                      <InstagramLogo style={{color: 'purple'}} size={20}></InstagramLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="http://twitter.com/gendotwav" style={{textDecoration:"none"}}>
                      <TwitterLogo style={{color: '#A6CAF0'}} size={20}></TwitterLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="http://tiktok.com/@gen.wav" style={{textDecoration:"none"}}>
                      <TiktokLogo style={{color: 'pink'}} size={20}></TiktokLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="https://soundcloud.com/genwav" style={{textDecoration:"none"}}>
                      <SoundcloudLogo style={{color: 'orange'}} size={20}></SoundcloudLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="https://www.youtube.com/@genwav" style={{textDecoration:"none"}}>
                      <YoutubeLogo style={{color: 'red'}} size={20}></YoutubeLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="https://open.spotify.com/artist/3YihJDU9YETUNDWO6pDuQG?si=VmY6439rRLS5mw8uC0nHYg" style={{textDecoration:"none"}}>
                      <SpotifyLogo style={{color: 'green'}} size={20}></SpotifyLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="https://music.apple.com/us/artist/genesis-barrios/1194186719" style={{textDecoration:"none"}}>
                      <AppleLogo style={{color: 'pink'}} size={20}></AppleLogo>
                    </a>
                  </div>
                  <div style={{display:"inline"}}>
                    <a target="_blank" href="https://discord.com/invite/2MdNjbHnBR" style={{textDecoration:"none"}}>
                      <DiscordLogo style={{color: 'purple'}} size={20}></DiscordLogo>
                    </a>
                  </div>
                   <div style={{display:"inline"}}>
                    <a target="_blank" href="https://patreon.com/genwav?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" style={{textDecoration:"none"}}>
                     <PatreonLogo style={{color: 'white'}} size={20}></PatreonLogo>
                    </a>
                  </div>
                </div>
            
              <Card className="card" style={{width:'90%', minHeight: '200px', marginBottom:"20px", marginTop:'10%'}}>
                <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/vvexe32_1.ico" width="25" height="25" className="inage" /> About</div>
                  <CardContent>
                    <div style={{textAlign:"center"}}> 
                      <Avatar size={125} src='https://dl.dropboxusercontent.com/s/aw5uvuev357azdlo72og2/Screenshot-2024-04-18-at-2.18.45-AM.png?rlkey=waj1wtalo8qvyjddhyf768jw0&dl=0' />
                    </div>
                    <Paper style={{fontSize:"0.8rem"}}> Hi, my name is gen.wav. I'm a Cuban-American Artist, Producer, Multi-Instrumentalist, Audio and Software Engineer. 👨‍💻 A lifelong musician with over 10 years of experience writing, recording, producing and performing music. Featured in Spotify Editorial Playlists, and Colors Studios. Take a look around and the site, you can stream my music, music videos, buy beats, Music NFTS, or just vibe. 🌊</Paper>
                  </CardContent>
              </Card>
          

              <div className="card" style={{width:'90%', minHeight: '200px', margin:"5% 0"}}>
                <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/mailnews_8.ico" width="20px"></img> Sign up to receive beats, loops, and news!</div>
                  <div style={{marginTop:"5%", textAlign:"center"}}>
                    <form>
                      <p>E-mail Address</p>  
                      <input type="text" name="e-mail" style={{display:"inline-block", marginBottom:"20px", width:"50%"}}  
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                      <br></br>
                       <p>Name</p>
                        <input
                          type="text"
                          name="name"
                          style={{
                            display: 'inline-block',
                            marginBottom: '20px',
                            width: '50%',
                          }}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        ></input>
                          <p>Phone Number</p>
                        <input
                          type="text"
                          name="phone-number"
                          style={{
                            display: 'inline-block',
                            marginBottom: '20px',
                            width: '50%',
                          }}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                          }}
                        ></input>
                        <br></br>
                         <p>Instagram Handle</p>
                        <input
                          type="text"
                          name="instagram"
                          style={{
                            display: 'inline-block',
                            marginBottom: '20px',
                            width: '50%',
                          }}
                          onChange={(e) => {
                            setInstagram(e.target.value);
                          }}
                        ></input>
                        <br></br>
                      <div style={{display:'inline'}}>
                        <input
                          style={{borderRadius:"10px", backgroundColor:"#CBD5E1", display:'inline'}}
                          type="checkbox"
                          name="producer"
                          value="0"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProducer(true);
                            } else {
                              setProducer(false);
                            }
                          }}
                        />
                        <p style={{display:'inline',  margin:"0 5px"}}>producer</p>
                    
                        <input
                          style={{borderRadius:"10px", backgroundColor:"#CBD5E1", display:'inline'}}
                          type="checkbox"
                          name="artist"
                          value="0"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setArtist(true);
                            } else {
                              setArtist(false);
                            }
                          }}
                        />
                        <p style={{display:'inline', margin:"0 5px"}}>artist</p>
                        <input
                        style={{borderRadius:"10px", backgroundColor:"#CBD5E1", display:'inline'}}
                        type="checkbox"
                        name="fan"
                        value="0"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFan(true);
                          } else {
                            setFan(false);
                          }
                        }}
                      />
                      <p style={{display:'inline', margin:"0 10px"}}>supporter</p>
                        <br></br>
                        <button onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }} style={{marginTop:"20px", padding:"2px 5px"}} type="submit">
                          Submit
                        </button>
                        {message && <Alert style={{marginTop:"5%", marginBottom:"5%"}} severity="success">{message.toString()}</Alert>}
                        {alert && <Alert style={{marginTop:"5%", marginBottom:"5%"}} severity="error">{alert.toString()}</Alert>}
                      </div>
                    </form>
                  </div>
              </div>

              <Card className="card" style={{width:'90%', minHeight: '200px', marginTop:"5%"}}>
              <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/wangimg_130.ico" width="20px"></img> Gallery</div>
                    <Carousel centerMode={true} dynamicHeight={false} centerSlidePercentage={100} infiniteLoop showThumbs={false} className="custom-carousel">
                     
                <div className="slide">
                      <img height="50%" width="100%" style={{objectFit:"cover"}} src="https://dl.dropboxusercontent.com/s/ur82i72cu1e3cfmyns202/genheadshot2025.jpg?rlkey=xruchuq224eqw28dkwwwj1cwe&st=tlybkvx4&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/DK-SGEMvvA3/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                    </div>
                <div className="slide">
                      <img height="auto" width="100%" src="https://dl.dropboxusercontent.com/s/fpp8gfykbfiv2vogvqdiz/genmars.JPG?rlkey=d1tqphrprhw19qrmgg3j8rdaq&st=5uygb0kg&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                    </div>
                  <div className="slide">
                      <img height="100%" width="auto" src="https://dl.dropboxusercontent.com/s/idl15yq45pyd2hzj0qlm2/llamagemelagen.jpg?rlkey=9a152ov3026qvzpls2hmrpfc3&st=g0kw30zz&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                    </div>
                  <div className="slide">
                      <img height="100%" width="auto" src="https://dl.dropboxusercontent.com/s/2rl4f4uuid8ypslrem79x/guitarllamagemela.JPG?rlkey=svrpo8wmbusjsqdgs8yqva7so&st=a1jkynx4&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                    </div>
                    <div className="slide">
                      <img width="100%" height="auto" src="https://dl.dropboxusercontent.com/s/6qckk96enixe6fr93kw77/marsBWgen.jpg?rlkey=onqhcbeh07lbeh2o77ad4muyw&st=3z3ywwd2&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                    </div>
                    <div className="slide">
                          <img height="100%" width="auto" src="https://dl.dropboxusercontent.com/s/0k0dthq0harqvyhanepad/jan25marsgen.JPG?rlkey=ans55vpr6jze28hokxfjv2iyb&st=id16f2dg&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                      </div>
                    <div className="slide">
                          <img height="100%" width="auto" src="https://dl.dropboxusercontent.com/s/m2id1jav2y7dq5pasryzo/mossySQ.png?rlkey=d9cobb0m2spa3mz7egzyfrqx3&st=rvw8qncu&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                      </div>
                    <div  className="slide">
                          <img width="100%" height="100%" src="https://dl.dropboxusercontent.com/s/htt41nabsx1wdrmklf1s21/problemasSQ.png?rlkey=juxe1w8ououd5z9w6p3lrg07j&st=6jd4w0nn&dl=0" />
                          {/* <button className="legend"><a href="" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button> */}
                      </div>
                    <div  className="slide">
                          <img width="100%" height="100%" src="https://dl.dropboxusercontent.com/s/4iih73rpib46ypyzax393/TEXTINMESQUARE.png?rlkey=axzwz8z7z0icxac6uxuyzwfnx&st=w6sg81be&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/DDx30M1v5Rt/" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                      <div  className="slide">
                          <img width="100%" height="100%" src="https://dl.dropboxusercontent.com/s/dsool4cyr7tppol3ugq4r/lapelisquare.png?rlkey=byre0364geaqmmdonlfa0xzr6&st=1t669pqy&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/DDIVH-2SpHP/" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>

                      <div  className="slide">
                          <img width="100%" height="100%" src="https://dl.dropboxusercontent.com/s/zzcvo588ghbxcst1ll135/dalemamiSQUARE.png?rlkey=2uj66ghmrytm02ysq2pk3ffkx&st=kms084go&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C-nSr1CRfXe/" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>

                    <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/i2ffv7r45i797hyv0bv13/alwayslunes.JPG?rlkey=vp0qa7hnjtsj0o1xc57dbvs2k&st=ca862hzt&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C9QG3JtvK5R/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                    <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/0tfeel2ahyvr6zjv29kq4/mars.JPG?rlkey=pnt9z6vfyadkcdyke6jnkii50&st=bg2a7ped&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C9LBF3pvRGp/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                    <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/8x4vh1zvabntlz08kbp1l/tsunami.JPG?rlkey=s3b1g7fnfx1at7v16l7sumr9c&st=j3vsh08a&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C85Lfzeveok/" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                    <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/v87mnch6gimnh8o6l4u0r/marsReleaseParty.jpg?rlkey=b1nb3ykx40iqlpbe2392718ss&st=uu92c41f&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C7wstS3MS8p/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                    <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/cnowbumt3ecj9e2pa29yu/elcambiopic.png?rlkey=7vo4hcix675fk5wytkqu9hfgu&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C5b22lTvChH/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                     
                      <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/5hhls38wigt1wwgrt3p0m/1.png?rlkey=tjj5wradaf2lrw0pu7id6jatt&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/CyOdrU4xPSa/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                      <div className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/6aroj9lrd83ka8082t8ik/4.png?rlkey=xd4waq4ideo8z8cwbzxi75o0j&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/C1m7-cQvV_J/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                      <div  className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/aa6wibav18t36t47r2j6j/6.png?rlkey=ufxq4j0n8d5ua3fy00ljn7c57&dl=0" />
                          <button className="legend"><a href="https://www.instagram.com/p/CzJuQlgOB_6/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                      <div  className="slide">
                          <img src="https://dl.dropboxusercontent.com/s/g45lofzneu2yk3m3ecvos/7.png?rlkey=qx5wzzp37ba3jbplefm9721js&dl=0" />
                          <button className="legend"><a href="https://instagram.com/p/Cz4CNH3teEa/?img_index=1" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}><InstagramLogo width={25} className="igLogo"></InstagramLogo></a></button>
                      </div>
                  </Carousel>
              </Card>
              
          </Grid>

          <Grid item sm={12} md={4} order={{ xs: 2, md: 3 }} style={{marginTop:"6%"}}>
              <Card className="card" style={{width:'90%', minHeight: '200px', marginBottom:"20px"}}>
              <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/mmsys_116.ico" width="20" height="20" className="inage"/> Stream My Music</div>
                <CardContent>
                {/* <iframe width="100%" height="166" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/genesisbarrios/sets/my-music?si=62d1c9cdb8d54729a394f3c43d5d8d1b"></iframe>
                */}
                  <iframe src="https://open.spotify.com/embed/artist/3YihJDU9YETUNDWO6pDuQG?utm_source=generator" width="100%" height="180" frameorder="0" allow="clipboard-write; encrypted-media; picture-in-picture" loading="lazy"></iframe>
                  <iframe width="100%" height="315" style={{borderRadius:"12px"}} src="https://www.youtube.com/embed/?list=PLcGBMxEyx5p8fc_zHMGJAUxLs94iw_puY&index=5&controls=1" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  <iframe 
                    title="SoundCloud Player"
                    width="100%"
                    height="300"
                    allow="autoplay"
                    style={{marginTop:"5%", borderRadius:"10px"}}
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1657973560&color=%235ab7ce&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                  ></iframe>
                </CardContent>
              </Card>
            <Card className="card" style={{width:'90%', minHeight: '500px'}}>
            <div className="cardHeader"><img src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/cd_music.ico" width="25" height="25" className="inage" /> Digital Collectibles - Music NFTs</div>
              <CardContent>
                <Paper style={{marginBottom:"10px"}}>
                  For those that don't know about Music NFTs, they are digital collectibles. You can collect(or mint) to own a rare, and unique copy of one of my songs. These collectibles will give you access to different features on my website.. It may be free beats, sample packs, or sneak peeks!
                </Paper>
                
                <Grid container spacing={2} style={{textAlign:"center"}}>
                  <Grid item sm={12} md={12}>
                  <iframe src="https://embed.sound.xyz/v1/release/6d9ec0ae-d689-4b11-9e4e-27216a6fcf10?referral=0x5dec3d6810fd96ac03593b862639ff32d7d1c78e&referral_source=embed-sound" style={{borderRadius: "8px"}} width="100%" height="188px"  allow="clipboard-write" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe>
                    <iframe src="https://embed.sound.xyz/v1/release/4cb29261-df3e-4b43-8c37-8af5e9f0f3cf?referral=0x5dec3d6810fd96ac03593b862639ff32d7d1c78e&referral_source=embed-sound" style={{borderRadius: "8px"}} width="100%" height="188px"  allow="clipboard-write" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe>
                  </Grid>
                  {/* <Grid item sm={12} md={6}>
                    <iframe style={{border:"none"}} width="100%" height="250px" src="https://zora.co/collect/zora:0x4dd517d52618a2c5d90699b5fd49e28e4041ddfd/6/frame?padding=20px&mediaPadding=20px&showDetails=false&theme=%7B%22foreground%22%3A%22%23000000%22%2C%22background%22%3A%22%23f3f3f3%22%2C%22accent%22%3A%22%2307ff3b%22%2C%22onAccent%22%3A%22%23000000%22%2C%22border%22%3A%22%23f3f3f3%22%2C%22background2%22%3A%22%23f3f3f3%22%2C%22positive%22%3A%22%231CB687%22%2C%22negative%22%3A%22%23F03232%22%2C%22warning%22%3A%22%23F5A623%22%7D&showMedia=true&showCollectors=false&showMintingUI=true"></iframe>
                    <iframe style={{border:"none"}} width="100%" height="250px" src="https://zora.co/collect/oeth:0xe5a213495a6186bc85b6411c35286a858cb3675f/1/frame?padding=20px&mediaPadding=20px&showDetails=false&theme=%7B%22foreground%22%3A%22%23000000%22%2C%22background%22%3A%22%23f3f3f3%22%2C%22accent%22%3A%22%2307ff3b%22%2C%22onAccent%22%3A%22%23000000%22%2C%22border%22%3A%22%23f3f3f3%22%2C%22background2%22%3A%22%23f3f3f3%22%2C%22positive%22%3A%22%231CB687%22%2C%22negative%22%3A%22%23F03232%22%2C%22warning%22%3A%22%23F5A623%22%7D&showMedia=true&showCollectors=false&showMintingUI=true"></iframe>
                   
                  </Grid>
                  <Grid item sm={12} md={6}>
                      <iframe style={{border:"none"}} id="embed" width="100%" height="250px" src="https://zora.co/editions/eth:0x5bc30e809aed2ff3c3bede9804419488e305b258/1/frame?padding=20px&mediaPadding=20px&showDetails=false&theme=%7B%22foreground%22%3A%22%23000000%22%2C%22background%22%3A%22%23f3f3f3%22%2C%22accent%22%3A%22%2307ff3b%22%2C%22onAccent%22%3A%22%23000000%22%2C%22border%22%3A%22%23f3f3f3%22%2C%22background2%22%3A%22%23f3f3f3%22%2C%22positive%22%3A%22%231CB687%22%2C%22negative%22%3A%22%23F03232%22%2C%22warning%22%3A%22%23F5A623%22%7D&showMedia=true&showCollectors=false&showMintingUI=true"></iframe>
                      <iframe style={{border:"none"}} width="100%" height="250px" src="https://zora.co/collect/oeth:0xb45cd602810c48df0e36c1c292c51b4dd21f8e9d/1/frame?padding=20px&mediaPadding=20px&showDetails=false&theme=%7B%22foreground%22%3A%22%23000000%22%2C%22background%22%3A%22%23f3f3f3%22%2C%22accent%22%3A%22%2307ff3b%22%2C%22onAccent%22%3A%22%23000000%22%2C%22border%22%3A%22%23f3f3f3%22%2C%22background2%22%3A%22%23f3f3f3%22%2C%22positive%22%3A%22%231CB687%22%2C%22negative%22%3A%22%23F03232%22%2C%22warning%22%3A%22%23F5A623%22%7D&showMedia=true&showCollectors=false&showMintingUI=true"></iframe> 
                  </Grid> */}
                </Grid>

                <div style={{width:"100%", textAlign:"center"}}>
                  <Paper style={{marginTop:"10px"}}>
                    <a href="https://beta.catalog.works/gendotwav/soltero" target="_blank" style={{textDecoration:"none", color:"black"}}>Soltero feat. El Igor on Catalog</a>
                  </Paper>
                  <Paper style={{marginTop:"10px"}}>
                    <a href="https://www.ninaprotocol.com/releases/gen-wav-27?ref=genwav" target="_blank" style={{textDecoration:"none", color:"black"}}>27 on Nina Protocol</a>
                  </Paper>
                </div>
                {/* <Frame style={{marginBottom:"10px"}}>
                <a href="https://www.sound.xyz/user/genwav.eth" target="_blank" style={{textDecoration:"none"}}><Button>sound.xyz</Button></a>
                </Frame> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item sm={3}>
            </Grid>
            <Grid item sm={6}></Grid>
            <Grid item sm={3}>
            
          </Grid>
      </Grid>
   </div>
    );
        
};

export default GenWavOS;
