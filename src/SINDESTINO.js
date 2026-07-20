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
import {Card, CardContent, div, Paper} from "@material-ui/core";
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
import MetaTags from 'react-meta-tags';
import { Avatar } from "react95";
import React from "react";
import { Mail, Mail2, CdMusic, cdMusicData, MediaVideo, mediaVideoData, Mic } from '@react95/icons';
import { GlobeSimple, InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo, AmazonLogo, TidalLogo  } from "@phosphor-icons/react";
import axios from "axios"; 
import { trackReleasePageView, trackStreamingClick, trackMerchClick } from "./MetaPixel";

// export const metadata { 
//   title: 'CURIOSO',
//   description: 'CURIOSO - KHR!S Joao, gen.wav',
//   openGraph: {
//     title: 'CURIOSO - KHR!S Joao, gen.wav',
//     description: 'CURIOSO - KHR!S Joao, gen.wav',
//     images: ['llamagemela.jpg'], // Path to your image
//   },
// };

const SINDESTINO = (props) => {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fan, setFan] = useState(false);
  const [producer, setProducer] = useState(false);
  const [artist, setArtist] = useState(false);

  useEffect(() => {
    
    //hide elements
    if(document){
      const welcomeBox = document.getElementById("welcomeBox");
      welcomeBox.style.display = "none";
    }
  }, []);

  useEffect(() => {
    // Track when SIN DESTINO page is viewed
    trackReleasePageView('SIN DESTINO');
  }, []);

  function handleSubmit() {
    console.log('handle submit request to subscribe')
  
    // Check if data is valid
    if (!email) {
      console.log('No e-mail address provided');
      setAlert('Please set an e-mail address~');
      return;
    }

    const dataToSend = {
      email,
      producer,
      artist,
      fan
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
    <div id="NEW">
      <div class="wrapper">
          <MetaTags>
            <title>SIN DESTINO | KHR!S Joao, gen.wav</title>
            <meta id="meta-description" name="description" content="Sin Destino - KHR!S Joao, gen.wav" />
            <meta id="og-title" property="og:title" content="Sin Destino - KHR!S Joao, gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/sindestinoart.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img
          src="https://genwav.xyz/sindestinoart.png"
          alt="Sin Destino" type="png"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>
      <iframe id="NEWVideo" style={{margin:"0 auto"}} width="50%" height="315" src="https://www.youtube.com/embed/b8hyh6OtdIk?si=SynW1jtbtkRrzmIQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto"}}>
       <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/1EQITbrikMP5LKZwyoq82W" onClick={() => trackStreamingClick('SIN DESTINO', 'Spotify')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/sin-destino/1734504080" onClick={() => trackStreamingClick('SIN DESTINO', 'Apple Music')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>


          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.youtube.com/watch?v=k8dis7WeE0I" onClick={() => trackStreamingClick('SIN DESTINO', 'YouTube')} ><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/sin-destino-khrs-joao-genwav" onClick={() => trackStreamingClick('SIN DESTINO', 'Soundcloud')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.tidal.com/track/350079328" onClick={() => trackStreamingClick('SIN DESTINO', 'Tidal')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.deezer.com/track/269094306" onClick={() => trackStreamingClick('SIN DESTINO', 'Deezer')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://pandora.app.link/?$desktop_url=https%3A%2F%2Fwww.pandora.com%2Fartist%2Fkhr-s-joao-and-genwav%2Fsin-destino-khrs-joao-genwav%2Fsin-destino%2FTRJthj2Kht92qKq" onClick={() => trackStreamingClick('SIN DESTINO', 'Pandora')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.amazon.com/albums/B0CX726Q4X" onClick={() => trackStreamingClick('SIN DESTINO', 'Amazon')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

        </Grid>
      </Grid> 

      <div
            className="card"
            style={{
              width: '40%',
              minHeight: '200px',
              margin: '0 auto',
              marginTop: '2%',
            }}
          >
            <style>
              {`
                @media (max-width: 768px) {
                  .card {
                    width: 80% !important;
                  }
                }
              `}
            </style>
           <div className="cardHeader">
            <iframe src="https://influanto.com/embed/newsletter/genwav" width="100%" height="440" style={{border:"none", maxWidth:"100%"}} title="Newsletter signup"></iframe>
        </div>
        </div> 
    </div>
      <div className="aboutNEW" style={{marginTop:"10px", textAlign:"center", width:"60%"}}>
            <style>
              {`
                @media (max-width: 768px) {
                  .merch-container {
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                  }
                  .merch-image {
                    width: 80% !important;
                    margin: 10px 0 !important;
                    margin-right: 0 !important;
                  }
                }
              `}
            </style>
      
        <h2 style={{marginTop:"20px"}}>Credits</h2>
        <h4>Sin Destino</h4>
        <p>Written by <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S Joao</a>, <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
        <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
        <p>Artwork by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
        <br></br>
      </div>


      <Grid className="linksContainer" container spacing={3} style={{maxWidth: "35%", margin:"0 auto", paddingTop:"2%", paddingBottom:"5%"}}>
        <Grid item xs={12} sm={12}>
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
                  <a target="_blank" href="http://tiktok.com/gen.wav" style={{textDecoration:"none"}}>
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
              </div>
            </Grid>
          </Grid>
      </div>
    );
        
};

export default SINDESTINO;
