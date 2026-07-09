
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

const WORLD = (props) => {
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
            <title>The World is a Stage | gen.wav</title>
            <meta id="meta-description" name="description" content="The World is a Stage - gen.wav" />
            <meta id="og-title" property="og:title" content="The World is a Stage - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/RENACI.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="/RENACI.png"
          alt="The World is a Stage" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "20%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>

      {/* <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/wROawKc8800" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>        */}

      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", marginBottom:"20px"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/6fmoPx3BMqpTSA4hr7FPXG?si=940914cec11541a9" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Spotify')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/the-world-is-a-stage-single/6784109776" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Apple')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.youtube.com/watch?v=-zcGpvBBh-o&list=OLAK5uy_m1KLKdBeAOHY-nrcESoTq2kuub5GI4LZE"><button className="pre-save-button" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'YouTube')}>Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/album/536668595" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Tidal')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/qobuz.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Qobuz</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.qobuz.com/us-en/interpreter/genwav/19980266" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Qobuz')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: 'orange', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>SoundCloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/the-world-is-a-stage?si=6699cf9dc2434060a22b3edc3ebbf6a" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'SoundCloud')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.deezer.com/us/album/1013934501" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Deezer')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6} style={{ marginTop:"10px"}}>
            <a target="_blank" href="https://www.pandora.com/artist/genwav-and-khr-s-joao/the-world-is-a-stage/the-world-is-a-stage/TRbJ96lkdgJtz44" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Pandora')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.amazon.com/music/player/albums/B0H6LSGWK8" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Amazon Music')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           {/* <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="/Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/track/the-matrix" onClick={() => trackStreamingClick('WORLD IS A STAGE', 'Bandcamp')}><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>

       <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide">
              <img src="/WORLD/WORLD1.JPG" alt="WORLD 1" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD2.JPG" alt="WORLD 2" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD3.JPG" alt="WORLD 3" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD4.JPG" alt="WORLD 4" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD5.JPG" alt="WORLD 5" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD6.JPG" alt="WORLD 6" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD7.JPG" alt="WORLD 7" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD8.JPG" alt="WORLD 8" className="embla__slide__img" />
            </div>
            <div className="embla__slide">
              <img src="/WORLD/WORLD9.JPG" alt="WORLD 9" className="embla__slide__img" />
            </div>
          </div>
        </div>


      <iframe width="90%" height="300" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2346215357&color=%2300f3ff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
            
      <div className="aboutNEW" style={{margin:"0 auto", marginBottom:"50px"}}>
        <h3>The World is a Stage</h3>
        <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
        <br></br>
      </div>

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
         <iframe src="https://influanto.com/embed/newsletter/genwav" width="100%" height="440" style={{border:"none", maxWidth:"100%"}} title="Newsletter signup"></iframe>
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

export default WORLD;
