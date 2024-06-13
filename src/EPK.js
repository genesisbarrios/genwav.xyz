
import { useState } from "react";
import { Key, ReactChild, ReactFragment, ReactPortal, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css'
import Grid from '@material-ui/core/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faWallet } from '@fortawesome/free-solid-svg-icons'
import { MenuList, MenuListItem, Separator, styleReset, Window, WindowHeader, WindowContent, Frame, Button } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Alert, SliderThumb } from "@material-ui/core";
import '@react95/icons/icons.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
/* Pick a theme of your choice */
import brick from 'react95/dist/themes/brick';
import blue from 'react95/dist/themes/blue';
import original from 'react95/dist/themes/original';
import millenium from 'react95/dist/themes/millenium';
import vaporTeal from 'react95/dist/themes/vaporTeal';
import modernDark from 'react95/dist/themes/modernDark';
import azureOrange from 'react95/dist/themes/azureOrange';
import denim from 'react95/dist/themes/denim';
import coldGray from 'react95/dist/themes/coldGray';
import matrix from 'react95/dist/themes/matrix';
import rainyDay from 'react95/dist/themes/rainyDay';
import aiee from 'react95/dist/themes/aiee';
import slate from 'react95/dist/themes/slate';
import shelbiTeal from 'react95/dist/themes/shelbiTeal';

import { Avatar } from "react95";
import React from "react";
import { Mail, Mail2, CdMusic, cdMusicData, MediaVideo, mediaVideoData, Mic } from '@react95/icons';
import { GlobeSimple, InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo  } from "@phosphor-icons/react";
import axios from "axios"; 

const EPK = (props) => {
  const [email, setEmail] = useState("");
  const [fan, setFan] = useState(false);
  const [producer, setProducer] = useState(false);
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
    
    //hide elements
    if(email){
    console.log(email);
    }
    if(producer){
      console.log(producer)
    }
    if(artist){
      console.log(artist)
    }
  }, );

  function handleOpenDialog(){
    //<a href="https://www.beatstars.com/genwav/sound-kits/179946" target="_blank" style={{textDecoration:"none", cursor:"pointer"}}></a>
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
    const dataToSend = {
      email: email,
      subject: producer,
      body: artist
    };
  
    // Make a POST request using Axios
    axios.post('https://localhost:3001/sendEmail', dataToSend)
      .then((response) => {
        // Handle the response if needed
        console.log('Request successful', response.data);
        setMessage('Your e-mail has been saved!')
        window.open("https://www.beatstars.com/genwav/sound-kits/179946", "_blank")
      })
      .catch((error) => {
        // Handle errors
        console.error('Error: ', error);
        window.alert(error);
        setAlert('Error: ', error)
      });

    setAlert('There was an error.');

  }
 
  const pdfUrl = 'https://www.dropbox.com/scl/fi/fqwizf2o29pknnfhkxwgz/ELECTRONIC-PRESS-KIT-2.pdf?rlkey=ytaf41lgcv6fte2cgxypn78u6&dl=0';
  
  return(
    
    <div id="EPK" style={{paddingBottom:"5%"}}>
          
      <Grid container spacing={3} style={{padding: "0px"}}> 
        <Grid item sm={12} md={4} lg={3}> 
          <div style={{height: "100vh", position: "sticky", top: 0}}>
          <img 
            src="https://dl.dropboxusercontent.com/s/lgduzrail9tglaoo4orpg/IMG_5547.jpg?rlkey=mk5oacojh1yr23ij8s7vcyflt&dl=0"
            alt="image"
            style={{height: "100%", width: "100%", objectFit: "cover"}}
          />  
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={6}> 
         <div style={{height:"100%", width: "100%"}}>
          <h1>gen.wav</h1>
          <p style={{marginBottom:"2%"}}>Miami based Independent Artist, and Producer - Latin, Hip Hop, R&B, Alternative</p>
          
          <h1>ABOUT</h1>
          <p style={{marginBottom:"2%"}}>gen.wav is a Cuban-American Singer, Multi-Instrumentalist, and Producer based in Miami, Florida. Experimenting with many Latin, Urban and electronic genres, while sticking true to his Latin roots in Miami, and writing in both Spanish and English. He’s heavily influenced by R&B, Hip Hop, Jazz, and House. gen is traditionally a classical musician receiving 10 years of classical training piano, cello, violin, voice, and music theory. He is also a self-taught guitarist, and bassist and has now been producing and writing original music for over a decade.</p>
          <p style={{marginBottom:"2%"}}>gen.wav es un cantante, multi-instrumentista y productor cubano-estadounidense que vive en Miami, Florida. Experimenta con muchos géneros latinos, urbanos y electrónicos, manteniéndose fiel a sus raíces latinas en Miami y escribiendo tanto en español como en inglés. Está fuertemente influenciado por el R&B, el Hip Hop, Salsa, Bachata, Reggaeton, Jazz y House. gen es tradicionalmente un músico clásico con más de 10 años de formación clásica en piano, violonchelo y voz, y lleva más de una década produciendo y escribiendo música original.</p>
          
          <h1>ACCOMPLISHMENTS</h1>
          <p style={{marginBottom:"2%"}}>Featured on Spotify's Editorial Playlist New Music Friday Latin</p>
          <p style={{marginBottom:"2%"}}>Featured on Spotify's Editorial Playlist Spotify Novedades Viernes Latinoamerica</p>
          <p style={{marginBottom:"2%"}}>1 Million Streams on Soundcloud</p>
          <p style={{marginBottom:"2%"}}>Debut Album Drops on May 30th</p>

          <h1>BOOKINGS & PRESS INQUIRIES</h1>
          <p style={{marginBottom:"5%"}}><a style={{color:"white", textDecoration:"none"}} href="beatsbygenwav@gmail.com">beatsbygenwav@gmail.com</a></p>

          <a
              href={pdfUrl}
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Required for security reasons when using target="_blank"
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid white',
                borderRadius: '5px',
                padding: '10px 20px',
                margin: '5% auto',
                textDecoration: 'none' // Removes underline from anchor element
              }}
            >
              DOWNLOAD ELECTRONIC PRESS KIT
            </a>

          <h1 style={{marginTop:"5%"}}>MUSIC</h1>
          <iframe src="https://open.spotify.com/embed/artist/3YihJDU9YETUNDWO6pDuQG?utm_source=generator" width="100%" height="180" frameBorder="0" allow="clipboard-write; encrypted-media; picture-in-picture" loading="lazy"></iframe>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/YMPVuPspRw0?si=NQKAEC2FagrBXcxW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <iframe
            title="SoundCloud Player"
            width="100%"
            height="300"
            allow="autoplay"
            style={{marginTop:"5%", borderRadius:"10px"}}
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1657973560&color=%235ab7ce&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
            <h1 style={{marginTop:"5%"}}>LINKS</h1>
           <div id="socials" style={{paddingTop:"10px", display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="http://instagram.com/gen.wav" style={{textDecoration:"none"}}>
                    <InstagramLogo style={{color: 'purple'}} size={25}></InstagramLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="http://twitter.com/gendotwav" style={{textDecoration:"none"}}>
                    <TwitterLogo style={{color: '#A6CAF0'}} size={25}></TwitterLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="http://tiktok.com/gen.wav" style={{textDecoration:"none"}}>
                    <TiktokLogo style={{color: 'pink'}} size={25}></TiktokLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="https://soundcloud.com/genwav" style={{textDecoration:"none"}}>
                    <SoundcloudLogo style={{color: 'orange'}} size={25}></SoundcloudLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="https://www.youtube.com/@genwav" style={{textDecoration:"none"}}>
                    <YoutubeLogo style={{color: 'red'}} size={25}></YoutubeLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="https://open.spotify.com/artist/3YihJDU9YETUNDWO6pDuQG?si=VmY6439rRLS5mw8uC0nHYg" style={{textDecoration:"none"}}>
                    <SpotifyLogo style={{color: 'green'}} size={25}></SpotifyLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="https://music.apple.com/us/artist/genesis-barrios/1194186719" style={{textDecoration:"none"}}>
                    <AppleLogo style={{color: 'pink'}} size={25}></AppleLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" href="https://discord.com/invite/2MdNjbHnBR" style={{textDecoration:"none"}}>
                    <DiscordLogo style={{color: 'purple'}} size={25}></DiscordLogo>
                  </a>
                </div>
              </div>
         </div>
        </Grid>
        <Grid item sm={12} md={3} lg={3}> 
        <div style={{height:"100%", width: "100%", paddingTop:"0", marginTop:"0", textAlign:"center"}}>
          <div style={{width:"100%", margin:"0 auto"}}>
            <h1 style={{marginBottom:"3%"}}>PRESS</h1>
             <h5 style={{marginBottom:"2%"}}><a href="https://voyagemia.com/interview/rising-stars-meet-genesis-barrios-of-little-havana" target="_blank" style={{color:"white", textDecoration:"none"}}>Voyage MIA Rising Stars Article</a></h5>
             
             <h5><a href="https://colorsxstudios.com/music" target="_blank" style={{color:"white", textDecoration:"none"}}>Colors Studios Feature</a></h5>
            <img src="https://dl.dropboxusercontent.com/s/cq6fa0uol5j3dn9l4qgnu/08FC3DBC-7BA3-438C-B168-6E0907F878A1.JPG?rlkey=4gacge9tz394c0jqw67luovfd&dl=0"style={{width:"80%", height:"auto", marginTop:'20px', marginBottom:"20px"}}></img>
            <img src="https://dl.dropboxusercontent.com/s/https://dl.dropboxusercontent.com/s/6aroj9lrd83ka8082t8ik/4.png?rlkey=xd4waq4ideo8z8cwbzxi75o0j&dl=0" style={{width:"80%", height:"auto", marginBottom:"20px"}}></img>
            <img src="https://dl.dropboxusercontent.com/s/xmwxcg78osj2g5dt9nh1y/IMG_5553.JPG?rlkey=cu8pt6p0ragl0jhfymyrqyzjz&dl=0" style={{width:"80%", height:"auto", marginBottom:"20px"}}></img>
            <img src="https://dl.dropboxusercontent.com/s/mzqs9rf3ckebhm0b526pu/IMG_1760.png?rlkey=tj5dtxs77rttf1mrg7xd4slhe&dl=0" style={{width:"80%", height:"auto"}}></img>
          </div>
          </div>
        </Grid>
          
         
      </Grid>
   </div>
    );
        
};

export default EPK;
