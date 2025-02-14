
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
//   title: 'Llama Gemela',
//   description: 'Llama Gemela - KHR!S Joao, gen.wav',
//   openGraph: {
//     title: 'Llama Gemela - KHR!S Joao, gen.wav',
//     description: 'Llama Gemela - KHR!S Joao, gen.wav',
//     images: ['llamagemela.jpg'], // Path to your image
//   },
// };

const LLAMAGEMELA = (props) => {
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
    
  }, );


  return(
    <div id="NEW">
      <div class="wrapper">
          <MetaTags>
            <title>Llama Gemela | KHR!S Joao, gen.wav</title>
            <meta id="meta-description" name="description" content="Llama Gemela - KHR!S Joao, gen.wav" />
            <meta id="og-title" property="og:title" content="Llama Gemela - KHR!S Joao, gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/llamagemela.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="https://genwav.xyz/llamagemela.png"
          alt="Llama Gemela" type="png"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px", marginLeft:"5%" }}></img>
      </div>
      <iframe id="NEWVideo" style={{margin:"0 auto"}} width="50%" height="315" src="https://www.youtube.com/embed/Kjq3nJJJjvE?si=dMRHsNsvwp4Rm2zP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", paddingLeft:"5%"}}>
       <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/1mF8IXTr7YLihY2MR2Y9MM?si=ug7giTqoSfGu5klG__R-4w&context=spotify%3Aalbum%3A3C6irYsZLnKycU1PK61igu"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple Music</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/llama-gemela-single/1795557308"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
         

          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://youtu.be/cYjOcN5XzjY"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/llama-gemela?si=56502da010fb4f09b62a1895ebfca4b3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/album/417146877"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
         
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.deezer.com/us/album/711047601"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginBottom:"20px"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.pandora.com/artist/genwav-and-khr-s-joao/llama-gemela/ALf3tzq49PXJht6?%24ios_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A44690528&%24android_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A44690528&~channel=Partner%20Catalog%20Search%20API%20-%20Linkfire&part=lf&corr=429cae4327c9a39dc64163a7214b5416&partnerName=Linkfire&~campaign=Partner%20Customer%20ID%20-%20f6439987-0a48-44b9-a575-26116961f527&sharedId=429cae4327c9a39dc64163a7214b5416&_branch_match_id=1309723444836776967&utm_source=Partner%20Catalog%20Search%20API%20-%20Linkfire&utm_campaign=Partner%20Customer%20ID%20-%20f6439987-0a48-44b9-a575-26116961f527&_branch_referrer=H4sIAAAAAAAAA62PQWvjMBCFf41zUxLLsh0VTAkphSxhCexlb2Esjy3XsqRKSg17yG%2FfSemWvfVSkMSb0Zv3STolHx82Gw%2B2cwHW4P3ajHbaPGZcdBin5PzlGkyj78as2Gf8mdayLOt%2FI8rN1IGQxphIDGgXeGN0ySYdWGQvDhz1jYEZ2IAzGqByf%2BqL9OdVyPPvHzpVK8KNLl46RH%2FnXzwk3Xwg3sQnuAU1xQQD3pGmvc5Z8ZzchDYrnvYnsglRyW3Jd%2FdAmg5u7L4x9KY0WIumOdN%2FLYaMbw%2BQwLiB1C%2BEoDSJ%2FflIJ6N9Imo%2FBlx58jemXykXQiO4VICi4LWSUMhOVSKvCqh5LtqS5Lub0n%2FCjM1nxE3B7GEc7P%2Fwa0xufpfHpw9mX4lCyl3NtiB2TIhWMijrkvEqzytZ5X3J61XUELA7dl%2B%2F5RawxxBGO1za4JaIoTnoQNC%2FCpMt4DsCAAA%3D"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/album/llamagemela"><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid> 
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.amazon.com/albums/B0DWQS8V2X?tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=429cae4327c9a39dc64163a7214b5416&ref=dmm_acq_soc_us_u_lfire_lp_x_429cae4327c9a39dc64163a7214b5416"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid> 
      
      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>Llama Gemela</h4>
        <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S Joao</a>, <a href="https://www.instagram.com/genwav/" target="_blank">gen.wav</a>
        <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
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

export default LLAMAGEMELA;
