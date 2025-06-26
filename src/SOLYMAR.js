
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
import { MetaTags } from "react-meta-tags";
import shelbiTeal from 'react95/dist/themes/shelbiTeal';

import { Avatar } from "react95";
import React from "react";
import { Mail, Mail2, CdMusic, cdMusicData, MediaVideo, mediaVideoData, Mic } from '@react95/icons';
import { GlobeSimple, InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo, AmazonLogo, TidalLogo  } from "@phosphor-icons/react";
import axios from "axios"; 

const SOLYMAR = (props) => {
  const [email, setEmail] = useState("");
  const [fan, setFan] = useState(true);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    <div id="GENESIS">
      <MetaTags>
        <title>SolyMar | gen.wav, KHR!S Joao</title>
        <meta id="meta-description" name="description" content="SolyMar - gen.wav, KHR!S Joao" />
        <meta id="og-title" property="og:title" content="SolyMar - gen.wav, KHR!S Joao" />
        <meta id="og-image" property="og:image" content="https://genwav.xyz/SOLYMAR.jpg" />
      </MetaTags>
    <div style={{ textAlign: "center" }}>
      <div id="GenesisImageDiv">
        <img 
          src="SOLYMAR.jpg"
          alt="SOLYMAR Album" type="gif"
          style={{ height: "auto", width: "auto", maxWidth: "25%", objectFit: "cover", margin: "2% 0", borderRadius:"15px" }}></img>
      </div>
      <Grid className="linksContainer" container spacing={2} style={{width: "35%", margin:"0 auto", paddingLeft:"3%"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/track/6iCftNGKr00g8nsIhOwxe5?si=1e17831f96da4745"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/solymar/1820587247"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.youtube.com/watch?v=933mrl_VLyE&list=PLcGBMxEyx5p9cfbXNscaNm6tjNaOoWGBP"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
            <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/sets/solymar-3?si=455c02308de54148a00be23130555718&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/album/442067668"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginBottom:"20px"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://pandora.app.link/GMQOTsZnvUb"><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.amazon.com/music/player/albums/B0FD7FD95M"><button className="pre-save-button">Stream / Buy</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/album/solymar"><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <h2 style={{paddingTop:"5%"}}>Music Videos</h2>
      <Grid container spacing={3} style={{width:"80%", margin:"0 auto"}}>

         <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/Pk-2SpFbovQ" title="PELIGROSA - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
        
           <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/Pzr6FyAJifI" title="FLOW - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>

          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/UOlfFB1MlTc" title="GAFAS - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
             <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/Kp8oN9V8mR8" title="TOTO - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/PWxMpte_2cA?si=PXCjluqseYJIXKyz" title="DALE MAMI - gen.wav, KHR!S João, El Igor, Nick Garcia Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/ez3wv1RwE2M" title="Cosas Oscuras- gen.wav, KHR!S João, Southside MAB Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
            
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/cHsVyi_DYsg" title="Bodhi Interlude 432 Hz - gen.wav, KHR!S João, Luz, Alan Watts Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/Kjq3nJJJjvE?si=AsUx4RWp4PmVnFR4" title="Llama Gemela - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/-CgFsRCFVBQ?si=GmYim1uTlNdvds98" title="Curioso - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/8td_ueaxld0?si=h6Ez9DRXtUWzK5x7" title="Pay Off One Day - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
             <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/HNegsdvMERs" title="Outside My Door - gen.wav, KHR!S João Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
         
      </Grid>
      
      <div className="aboutAlbum">
      <div style={{ textAlign: "center" }}>
        <img src="GENKHRIS.jpg" width="80%" />
      </div>
        <h2>About the Album</h2>
        <p>SolyMar is a collaborative album by gen.wav and KHR!S João that explores the cycles of life, partying and solitude, love and heartbreak, death and rebirth— not as contradictions, but as forces in balance. The Leo brings the fearless drive to create, to lead, to burn bright. The Cancer carries the intuitive wisdom, the emotional undercurrent, the quiet that nurtures the fire. In a time of disconnection, SolyMar is a reminder: duality is not division. It is the path to wholeness.</p>
        <br></br>
        <p>SolyMar isn't just a name—it's a symbol. Sol (Sun) and Mar (Sea): two opposing elements that meet on the horizon, forever reflecting each other. Through sound, Solymar invites listeners to do the same—to see their own inner contrasts not as conflict, but as the raw material for growth and self-discovery.</p>
        <br></br>
        <p>Solymar's sound is equal parts celebration and a mirror—reflecting the vibrant energy of Miami's nightlife while revealing the emotional undercurrents that often move beneath the surface., Drawing from reggaetón, alt-Latin, hip-hop, and electronic textures, their music pulses with movement while holding space for reflection. The party tracks pulse with heat and freedom—nights soaked in rhythm, sweat, lust, and escape. But underneath the fun is a deeper current: a quiet recognition that indulgence, when unchecked, can pull us out of alignment. Their love songs explore that same tension—how the things we crave can sometimes lead us astray. Yet the goal is never to reject the pleasure, but to understand it. Solymar's sound is about embracing both the light and the shadow—dancing through temptation, feeling everything fully, and finding harmony somewhere in between.
        </p>    
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
           
            <h2>Credits</h2>
            <h4>PELIGROSA</h4>
            <p>Produced and Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p> Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4>FLOW</h4>
            <p>Featuring <a href="https://www.instagram.com/itsdanimako/" target="_blank">Dani Mako</a></p>
            <p>Produced and Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Mixed, and Mastered by <a href="https://www.instagram.com/mixedbyedwn" target="_blank">Edwin Estacio</a></p>
            <br></br>
            <h4><a style={{textDecoration:"none"}} href="https://genwav.xyz/GAFAS" target="_blank">GAFAS</a></h4>
            <p>Produced and Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4>TOTO</h4>
            <p>Written by <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a> & <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4><a style={{textDecoration:"none"}} href="https://genwav.xyz/DALEMAMI" target="_blank">DALE MAMI</a></h4>
            <p><a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S Joao</a>, <a href="https://www.instagram.com/genwav/" target="_blank">gen.wav</a>, <a href="https://www.instagram.com/nickgarcia305/" target="_blank">Nick Garcia</a>, <a href="https://www.instagram.com/igorcentrism/" target="_blank">El Igor</a></p>
            <p>Produced by <a href="https://www.instagram.com/dluxe_the_producer" target="_blank">dluxe_the_producer</a></p>
            <p>Mixed and Mastered by <a href="https://www.instagram.com/mixedbyedwn/?hl=en" target="_blank">Edwin Estacio</a></p>
            <br></br>
            <h4>Cosas Oscuras</h4>
            <p>Featuring <a href="https://www.instagram.com/southsidemab/" target="_blank">Southside MAB</a></p>
            <p>Produced and Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4>Bodhi Interlude 432 Hz</h4>
            <p>Featuring <a href="https://www.instagram.com/alanwattsorg/" target="_blank">Alan Watts</a></p>
            <p>Produced by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a>, <a href="https://www.instagram.com/prodbyluz/" target="_blank">Prod by Luz</a>, <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4>Sin Rencor</h4>
            <p>Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4><a style={{textDecoration:"none"}} href="https://genwav.xyz/LlamaGemela" target="_blank">Llama Gemela</a></h4>
            <p>Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a>, <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a>, Nicolas Cervera, Manuel Pagan</p>
            <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4>RD</h4>
            <p>Featuring <a href="https://www.instagram.com/yun.gdzy/" target="_blank">Yung Dzy</a></p>
            <p>Produced and Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4><a style={{textDecoration:"none"}} href="https://genwav.xyz/CURIOSO" target="_blank">Curioso</a></h4>
            <p>Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4><a style={{textDecoration:"none"}} href="https://genwav.xyz/oneday" target="_blank">Pay Off One Day</a></h4>
            <p>Produced by <a href="https://www.instagram.com/0nly1flexy/" target="_blank">flexible</a></p>
            <p>Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Co-Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <h4>Outside My Door</h4>
            <p>Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a> & <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></p>
            <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
            <br></br>
            <p>Album Art by <a href="https://www.instagram.com/agotok__/" target="_blank">Moreno Villa</a></p>

            <br></br>

          <a target="_blank" style={{color:"white", margin:"0 auto", textAlign:"center", textDecoration:"none"}} href="https://enigma-labs.printify.me/">
            <h3 style={{marginTop:"2%", marginBottom:"2%"}}>MERCH</h3>
            <img src="SOLYMARSHIRT.jpg" alt="CURIOSO Merch" style={{width:"50%", height:"auto", margin:"0 auto"}}></img>
            <img src="SOLYMARKEYRING1.jpeg" alt="CURIOSO Merch" style={{width:"50%", height:"auto", margin:"0 auto"}}></img>
            <img src="SOLYMARKEYRING2.jpeg" alt="CURIOSO Merch" style={{width:"50%", height:"auto", margin:"0 auto"}}></img>
            <img src="SOLYMARBLACKTEE.jpg" alt="CURIOSO Merch" style={{width:"50%", height:"auto", margin:"0 auto"}}></img>
            <h3 style={{marginTop:"2%"}}>GET YOURS NOW</h3>
          </a>

            <img></img>
          </Grid>
           <Grid item xs={12} lg={6}>
              <div style={{ textAlign: "center" }}>
                <img src="GENSOLYMAR.jpg" width="70%" />
                <img src="CHRISSOLYMAR.jpg" width="70%" />
                <img src="GENKHRIS2.jpg" width="70%" />
              </div>
           </Grid>
        </Grid>
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
              style={{ marginTop: '0px', padding: '2px 5px' }}
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

export default SOLYMAR;
