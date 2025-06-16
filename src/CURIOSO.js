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

// export const metadata { 
//   title: 'CURIOSO',
//   description: 'CURIOSO - KHR!S Joao, gen.wav',
//   openGraph: {
//     title: 'CURIOSO - KHR!S Joao, gen.wav',
//     description: 'CURIOSO - KHR!S Joao, gen.wav',
//     images: ['llamagemela.jpg'], // Path to your image
//   },
// };

const CURIOSO = (props) => {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [email, setEmail] = useState("");
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
    
  }, );

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
            <title>CURIOSO | KHR!S Joao, gen.wav</title>
            <meta id="meta-description" name="description" content="CURIOSO - gen.wav, KHR!S Joao" />
            <meta id="og-title" property="og:title" content="CURIOSO - gen.wav, KHR!S Joao" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/CURIOSO.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="https://genwav.xyz/CURIOSO.jpg"
          alt="CURIOSO" type="png"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>
      <iframe id="NEWVideo" style={{margin:"0 auto"}} width="50%" height="315" src="https://www.youtube.com/embed/-CgFsRCFVBQ?si=YPKW2rNpYjwHAM6t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto"}}>
       <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/4asV8S8lwFgnqW1YiAn9zq?si=0eb0dda7b5bf44a9"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/song/curioso/1812760855"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
         

          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://youtu.be/LSvpDv6h1wI"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/curioso?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" ><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/track/434311465"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://dzr.page.link/uy9vMovczjtrPbCFA"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://pandora.app.link/wE22DKydYTb"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/track/curioso"><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid> 
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://amazon.com/music/player/albums/B0F7P3TM6J?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_KhtNk3lkg3y0Uc0MpifEZ0boX"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid> 


     
      <div className="aboutNEW">
         <a target="_blank" style={{color:"white", margin:"0 auto"}} href="https://enigma-labs.printify.me/">
          <h3 style={{marginTop:"2%", marginBottom:"2%", textAlign:"center"}}>👕 GET YOURS NOW!! 👕</h3>
           <img src="https://images-api.printify.com/mockup/684234a27a2844ab2c06b711/12148/92661/curioso-unisex-heavy-cotton-tee.jpg?camera_label=person-4&revision=1749171740730" alt="CURIOSO Merch" style={{width:"30%", height:"auto", margin:"0 auto"}}></img>
            <img src="CURIOSOBOTTLEOPENER.jpg" alt="CURIOSO Merch" style={{width:"30%", height:"auto", margin:"0 auto"}}></img>
           <img src="CURIOSOTANK.jpg" alt="CURIOSO Merch" style={{width:"30%", height:"auto", margin:"0 auto"}}></img>
           <h3 style={{marginTop:"2%", textAlign:"center"}}>👕 BUY MERCH!! 👕</h3>
         </a>
      
        <h2 style={{marginTop:"20%"}}>Credits</h2>
        <h4>Curioso</h4>
        <p>Written by <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S Joao</a>, <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
        <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
        <p>Artwork by <a href="https://www.instagram.com/moartmoproblemz" target="_blank">Mo Art</a></p>
        <br></br>
      </div>

      <div
        className="card"
        style={{
          width: '40%',
          minHeight: '200px',
          margin: '0 auto',
          marginTop: '3%',
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
          <img
            src="https://raw.githubusercontent.com/React95/React95/40e774b5e208822d206d9f6bc202ec1d7c3b0680/packages/icons/src/icons/mailnews_8.ico"
            width="20px"
          ></img>{' '}
          Sign up to receive beats, loops, and news!
        </div>
        <div style={{ marginTop: '5%', textAlign: 'center' }}>
          <form>
            <p>Enter Your E-mail Address</p>
            <input
              type="text"
              name="e-mail"
              style={{
                display: 'inline-block',
                marginBottom: '20px',
                width: '50%',
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <br></br>
            <div style={{ display: 'inline' }}>
              <input
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#CBD5E1',
                  display: 'inline',
                }}
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
              <p style={{ display: 'inline', margin: '0 5px' }}>producer</p>
              <input
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#CBD5E1',
                  display: 'inline',
                }}
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
              <p style={{ display: 'inline', margin: '0 5px' }}>artist</p>
              <input
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#CBD5E1',
                  display: 'inline',
                }}
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
              <p style={{ display: 'inline', margin: '0 10px' }}>supporter</p>
              <br></br>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                style={{ marginTop: '20px', padding: '2px 5px' }}
                type="submit"
              >
                Submit
              </button>
              {message && (
                <Alert
                  style={{ marginTop: '5%', marginBottom: '5%' }}
                  severity="success"
                >
                  {message.toString()}
                </Alert>
              )}
              {alert && (
                <Alert
                  style={{ marginTop: '5%', marginBottom: '5%' }}
                  severity="error"
                >
                  {alert.toString()}
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
      
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

export default CURIOSO;
