
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

const NEW = (props) => {
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
    // Track when LOS IGNORO page is viewed
    trackReleasePageView('LOS IGNORO');
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
            <title>Los Ignoro | KHR!S Joao x gen.wav</title>
            <meta id="meta-description" name="description" content="Los Ignoro - KHR!S Joao x gen.wav" />
            <meta id="og-title" property="og:title" content="Los Ignoro - KHR!S Joao x gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/LOSIGNOROCOVER.jpg" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="https://genwav.xyz/LOSIGNOROCOVER.jpg"
          alt="Los Ignoro Artwork" type="image"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px" }}></img>
      </div>
      <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/wd8PSlmjOFk?si=NKoKiHWJ8BlcCFhk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", paddingLeft:"5%"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/album/0tYdO8T98gQQorusQs98eX?go=1"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Apple Music</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/los-ignoro-single/1774130821?at=1l3vpUI&ct=LFV_23843f014d653a354d05cd84947a7b70&itsct=catchall_p3&itscg=30440&ls=1"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.youtube.com/watch?v=yHeAn_iziDQ&feature=youtu.be"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/los-ignoro?si=dd7994b0233944ffb69e68b860353be6&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/album/393535526"><button className="pre-save-button">Stream</button></a>
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
            <a target="_blank" href="https://www.pandora.com/artist/genwav-and-khr-s-joao/los-ignoro/ALcnj5pZwcv5fdm?%24ios_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A40334290&%24android_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A40334290&~channel=Partner%20Catalog%20Search%20API%20-%20Linkfire&part=lf&corr=23843f014d653a354d05cd84947a7b70&partnerName=Linkfire&~campaign=Partner%20Customer%20ID%20-%20a663e3e0-6490-4cdd-ba02-c5abdfd6d921&sharedId=23843f014d653a354d05cd84947a7b70&_branch_match_id=1246765915340556405&utm_source=Partner%20Catalog%20Search%20API%20-%20Linkfire&utm_campaign=Partner%20Customer%20ID%20-%20a663e3e0-6490-4cdd-ba02-c5abdfd6d921&_branch_referrer=H4sIAAAAAAAAA62QT0vEMBDFP033lt3YpF1XKLIowsIigjcvyzSZ%2FrFtEibZ7W0%2Fu1NR8eZFSMLL5M37JelSCvFuswngrCdYQwjrsXfD5j7LtcU4JB9OZxqrbjFmap%2FlTzzmeV5%2Ftxg%2FcQUo9TGxaNHNcBF8KIaORBTvHjzXRx9F3zpPy2Z%2FNO69CG%2BzuRSNnVYM6308WcSw0E8BUld9AS76B1uDGWKCFhfgWJ%2BnTD0lP6DL1OP%2ByDYtldL5Ti6B3E2%2Bt%2F8YejUdOIdj9cKvdUhZLh8gwehbVq8IZDoW%2B5cDr4LnkalNT7gK7K%2FGZmU8UZWrW60aeaNtWShQhbayMPZW7%2FQWtvVWfro5%2FRkmrH4irgamAPyBv%2BHnmPz0KQ%2BPX0woS4UKpSj1TgptrBU1yFyYAmrb2NLu8ptV7IDQHuzfd7kSNkjUu%2FZUk58jUvXQEUM%2FAKDA%2F9w5AgAA"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.amazon.com/albums/B0DK4L3J74?tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=23843f014d653a354d05cd84947a7b70&ref=dmm_acq_soc_us_u_lfire_lp_x_23843f014d653a354d05cd84947a7b70"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>Los Ignoro</h4>
        <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> x <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a> 
        <p>Produced, Mixed, and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
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

export default NEW;
