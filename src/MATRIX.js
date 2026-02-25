
import { useState } from "react";
import { Key, ReactChild, ReactFragment, ReactPortal, useCallback, useEffect, useMemo, useLayoutEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react';
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
import { trackReleasePageView, trackMerchClick, trackStreamingClick } from "./MetaPixel";


const MATRIX = (props) => {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
   const [email, setEmail] = useState("");
    const [fan, setFan] = useState(true);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
    // Track when MATRIX page is viewed
    trackReleasePageView('MATRIX');
  }, []);

  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    containScroll: 'trimSnaps'
  });

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
        fan,
        name,
        phoneNumber
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
            <title>THE MATRIX | gen.wav</title>
            <meta id="meta-description" name="description" content="THE MATRIX - gen.wav" />
            <meta id="og-title" property="og:title" content="THE MATRIX - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/RENACI.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="/RENACI.png"
          alt="THE MATRIX" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "20%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>

      <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/wROawKc8800" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>       

      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", marginBottom:"20px"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/6Z5gCewbH5CSAcQzxTleCj?si=d003eaba59934ffa" onClick={() => trackStreamingClick('UP', 'Spotify')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/the-matrix-single/1875819115" onClick={() => trackStreamingClick('UP', 'Apple')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.youtube.com/playlist?list=OLAK5uy_l9F1KLiSKqA9Sg_u2Noh-_mCCfDO9khpU"><button className="pre-save-button" onClick={() => trackStreamingClick('UP', 'YouTube')}>Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/qobuz.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Qobuz</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://open.qobuz.com/album/se4sp753q358e" onClick={() => trackStreamingClick('MATRIX', 'Qobuz')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/album/497377122/u" onClick={() => trackStreamingClick('UP', 'Tidal')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: 'orange', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>SoundCloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/the-matrix?si=5aeddcf97a5a47a4ab547b1872684240&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" onClick={() => trackStreamingClick('UP', 'SoundCloud')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.deezer.com/us/album/914784031" onClick={() => trackStreamingClick('MATRIX', 'Deezer')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6} style={{ marginTop:"10px"}}>
            <a target="_blank" href="https://www.pandora.com/artist/genwav/the-matrix/ALk7pJgcjtJwPdP" onClick={() => trackStreamingClick('MATRIX', 'Pandora')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.amazon.com/albums/B0GMG25XLM?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_ADs0m3IuCUeCPPwkxKwDPa1EN&trackAsin=B0GMFW4MJR" onClick={() => trackStreamingClick('MATRIX', 'Amazon Music')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="/Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/track/the-matrix" onClick={() => trackStreamingClick('MATRIX', 'Bandcamp')}><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

        <div className="aboutNEW" style={{margin:"0 auto", marginBottom:"50px"}}>
        <h3>THE MATRIX</h3>
        <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
        <br></br>
      </div>

      <iframe width="90%" height="300" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2262768005&color=%2300f3ff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style={{fontSize: 10, color: '#cccccc', lineBreak: 'anywhere', wordBreak: 'normal', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif', fontWeight: 100}}><a href="https://soundcloud.com/genwav" title="gen.wav" target="_blank" style={{color: '#cccccc', textDecoration: 'none'}}>gen.wav</a> · <a href="https://soundcloud.com/genwav/the-matrix" title="THE MATRIX" target="_blank" style={{color: '#cccccc', textDecoration: 'none'}}>THE MATRIX</a></div>
     
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
        Sign up to stay in touch!
      </div>
      <div style={{ marginTop: '5%', textAlign: 'center' }}>
        <form>
          <p>E-mail</p>
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
          <div style={{ display: 'inline' }}>
            <input
              style={{
                borderRadius: '10px',
                backgroundColor: '#CBD5E1',
                display: 'none',
              }}
              type="checkbox"
              name="fan"
              value={{fan}}
              checked={true}
              onChange={(e) => {
                if (e.target.checked) {
                  setFan(true);
                } else {
                  setFan(false);
                }
              }}
            />
            <br></br>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              style={{ marginTop: '0px', marginBottom:"10px", padding: '2px 5px' }}
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

export default MATRIX;
