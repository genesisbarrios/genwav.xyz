
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
import { trackReleasePageView } from "./MetaPixel";

// export const metadata { 
//   title: 'DALE MAMI',
//   description: 'DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//   openGraph: {
//     title: 'DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//     description: 'DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//     images: ['DALE-MAMI-COVER-ARTWORK.jpg'], // Path to your image
//   },
// };

const DALEMAMI = (props) => {
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
    // Track when DALE MAMI page is viewed
    trackReleasePageView('DALE MAMI');
  }, []);

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

 
  const pdfUrl = 'https://www.dropbox.com/scl/fi/fqwizf2o29pknnfhkxwgz/ELECTRONIC-PRESS-KIT-2.pdf?rlkey=ytaf41lgcv6fte2cgxypn78u6&dl=0';
  
  return(
    <div id="NEW">
      <div class="wrapper">
          <MetaTags>
            <title>DALE MAMI | KHR!S Joao, gen.wav, Nick Garcia, El Igor</title>
            <meta id="meta-description" name="description" content="DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor" />
            <meta id="og-title" property="og:title" content="DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/DALE-MAMI-COVER-ARTWORK.jpg" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="https://dl.dropboxusercontent.com/s/5f62vzertqlizupyest37/DALE-MAMI-COVER-ARTWORK.jpg?rlkey=45wrmjerbuz3rhnkrjycvu7yj&st=nc8nj56b&dl=0"
          alt="DALE MAMI" type="gif"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px" }}></img>
      </div>
      <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/PWxMpte_2cA?si=bGEQXi1rJ_S7PNKP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", paddingLeft:"5%"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/album/0QhyOSP1p4CaWVpnKmdyse?go=1"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Apple Music</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/dale-mami/1758636150?i=1758636151"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://youtu.be/UMcWMLx1fM4?si=t9i_F0lanewgmYtm"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          {/* <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/sets/genesis-414993647"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> */}
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/album/376586855"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.deezer.com/us/album/618670361"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginBottom:"20px"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.pandora.com/artist/khr-s-joao-genwav-and-el-igor/dale-mami/ALKrwg49td5fhcZ"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          {/* <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/album/genesis"><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid> */}
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.amazon.com/music/player/albums/B0D9TYKP7C"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>DALE MAMI</h4>
        <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S Joao</a>, <a href="https://www.instagram.com/genwav/" target="_blank">gen.wav</a>, <a href="https://www.instagram.com/nickgarcia305/" target="_blank">Nick Garcia</a>, <a href="https://www.instagram.com/igorcentrism/" target="_blank">El Igor</a>
        <p>Produced by <a href="https://www.instagram.com/dluxe_the_producer" target="_blank">dluxe_the_producer</a></p>
        <p>Mixed and Mastered by <a href="https://www.instagram.com/mixedbyedwn/?hl=en" target="_blank">Edwin Estacio</a></p>
        <br></br>
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

export default DALEMAMI;
