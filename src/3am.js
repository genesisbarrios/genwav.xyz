
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
//   title: 'Hiking Por Mi Mente',
//   description: 'Hiking Por Mi Mente - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//   openGraph: {
//     title: 'Hiking Por Mi Mente - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//     description: 'Hiking Por Mi Mente - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//     images: ['DALE-MAMI-COVER-ARTWORK.jpg'], // Path to your image
//   },
// };

const TEXTINME = (props) => {
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
    // Track when Textin Me page is viewed
    trackReleasePageView('Textin Me');
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
            <title>Textin' Me | KHR!S Joao x gen.wav</title>
            <meta id="meta-description" name="description" content="Textin' Me - KHR!S Joao x gen.wav" />
            <meta id="og-title" property="og:title" content="Textin' Me - KHR!S Joao x gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/LOSIGNOROCOVER.jpg" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="https://genwav.xyz/TEXTINMECOVER.jpg"
          alt="Textin' Me Artwork" type="image"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px" }}></img>
      </div>
      <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/aaNqK5koHJQ?si=H2T8k92JPBmM9Ewy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", paddingLeft:"5%"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/2Zdac5tDQhbJUer8j4MWsf?si=08028ed6bbec4097"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Apple Music</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/textin-me-single/1785307972"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://youtu.be/Zge6XKlx9UI"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/textin-me?si=ca1dcc4324fc48d4a62a953fa97042f7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/track/405791718"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         
          {/* <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://connect.deezer.com/oauth/auth.php?app_id=384124&perms=basic_access%2Cemail%2Cmanage_library%2Cmanage_community%2Coffline_access&redirect_uri=https%3A%2F%2Flnk.to%2F%7E%2Fprerelease%2Fdeezer&state=bFVybD1WZW5pY2UubG5rLnRvJTJGbG9zLWlnbm9ybyZzSWQ9ZmFlOTc2YzAtZWI0Ni00YjNlLWI4YWQtMGJlOTFlYWMxZDcwJnRJZD0wYmU4N2RhNS01NTFjLTRjMGItYTVkZC0xMGE1ZDc5NWYyNGMmdT1odHRwcyUzQSUyRiUyRnZlbmljZS5sbmsudG8lMkZsb3MtaWdub3JvJnZ0PWNlOWMxZmVhOWY4ODUwZWQ1NjhkM2IzNDRlYjE4Yjg3JnZ1PTY3MTY5NTY5ZWJhZjc2LjQzNjc1Mjcy"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> */}
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginBottom:"20px", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.pandora.com/artist/genwav-and-khr-s-joao/textin-me/ALtbdz5p5rmlgvP?%24ios_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A42292863&%24android_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A42292863&~channel=Partner%20Catalog%20Search%20API%20-%20Linkfire&part=lf&corr=c6a3d93431788452e368eb63c2c21669&partnerName=Linkfire&~campaign=Partner%20Customer%20ID%20-%20ab5bda72-b645-485b-b2e5-25a9fc5e6b36&sharedId=c6a3d93431788452e368eb63c2c21669&_branch_match_id=1309723444836776967&utm_source=Partner%20Catalog%20Search%20API%20-%20Linkfire&utm_campaign=Partner%20Customer%20ID%20-%20ab5bda72-b645-485b-b2e5-25a9fc5e6b36&_branch_referrer=H4sIAAAAAAAAA62P0WrjMBBFv8Z5U7KVLNUpmCW0FAKhBPYDwkia2F7bkhgpcdmHfPtOSrfs274sSMNl5s49Ul9Kyk%2BbTYLgI8EaUlpPQxg33ytZe8xjiel0oant78ZK7Sr5ymdZlvWfFRdn7gCVIRcWHYYFroKHYuxJZPEzQuR%2BwfcyBDEj692hWP9LJ03z1F2PK2YNMZ88YrrDTwlK337mX%2BsvqgU35gLdPQIme5kr9VriiKFSL7sD22opt7Ix6h7I2xQH%2Fx9Db66HEHBqj%2FzZgFTJb89QYIodqx8I5HoWu%2BOeq%2BB7YOp5IFwl9rfTeeUiUesMKL9VtXp4bJpaS1SmQWuUk04%2BGLP9cHP6G8zYfkXcHMwJhi78Db%2FkEucPuX%2F5ZILV1sOjFNbUWtSNtsJK1EJq2J6dRmOVWeUeCP3e%2F%2FstN8IzEg2hO1mKS0Zqn3ti6G92uMvqOAIAAA%3D%3D"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.amazon.com/music/player/albums/B0DQFPT5SY"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>Textin' Me</h4>
        <a href="https://www.instagram.com/genwav/" target="_blank">gen.wav</a> x <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a> 
        <p>Produced by gen.wav and KHR!S João</p>
        <p>Mixed and Mastered by gen.wav</p>
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

export default TEXTINME;
