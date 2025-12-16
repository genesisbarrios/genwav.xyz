
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
import { trackReleasePageView, trackMerchClick, trackStreamingClick } from "./MetaPixel";


const TURO = (props) => {
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
    // Track when TURO page is viewed
    trackReleasePageView('TURO');
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
            <title>TURO | gen.wav</title>
            <meta id="meta-description" name="description" content="TURO - gen.wav" />
            <meta id="og-title" property="og:title" content="TURO - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/TuroArt.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="TuroArt.png"
          alt="TURO" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>

      <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/r9IH7G8MlcA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>       

      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", marginBottom:"20px"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://accounts.spotify.com/authorize?response_type=code&client_id=5a14783d79444ee9babd9176b256979e&scope=user-follow-modify+user-library-modify+playlist-modify-public+playlist-modify-private+user-read-email+user-read-private&redirect_uri=https%3A%2F%2Flnk.to%2F~%2Fprerelease%2Fspotify&state=bFVybD12ZW5pY2UubG5rLnRvJTJGdHVybyZzSWQ9ZjBlYjk2NTUtYjFkZS00OWE2LWI4OGQtN2ZlNGFlMTFhYTU1JnRJZD01Mjk3ZGUzZi1mZmNhLTRlNDEtYjJkYy1jNWRlODNlMWZlYmYmdT1odHRwcyUzQSUyRiUyRnZlbmljZS5sbmsudG8lMkZ0dXJvJnZ0PTlkNGI1MzgwZmNhNGVhMTBjMjhmYjY0MWRjMGM5M2UxJnZ1PTY5M2I1Y2YxMGQwYmM3Ljg4NDM5MTU3JnJmPWRpcmVjdA%3D%3D" onClick={() => trackStreamingClick('TURO', 'Spotify')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

         {/* <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/22-single/1849840037" onClick={() => trackStreamingClick('TURO', 'Apple')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>  */}
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://youtu.be/d76s1UUpe90"><button className="pre-save-button" onClick={() => trackStreamingClick('TURO', 'YouTube')}>Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://login.tidal.com/authorize?client_id=sgHF2jeIMrbuvJ9l&response_type=code&redirect_uri=https%3A%2F%2Flnk.to%2F~%2Fprerelease%2Ftidal&lang=en&restrictSignup=true&geo=US&campaignId=default&scope=r_usr&state=bFVybD12ZW5pY2UubG5rLnRvJTJGdHVybyZzSWQ9Y2M4ZWJhMTYtYzMzMC00OGVjLWJlYTItMmY3YTk4Y2JkMWMxJnRJZD01Mjk3ZGUzZi1mZmNhLTRlNDEtYjJkYy1jNWRlODNlMWZlYmYmdT1odHRwcyUzQSUyRiUyRnZlbmljZS5sbmsudG8lMkZ0dXJvJnZ0PTlkNGI1MzgwZmNhNGVhMTBjMjhmYjY0MWRjMGM5M2UxJnZ1PTY5M2I1Y2YxMGQwYmM3Ljg4NDM5MTU3JnJmPWRpcmVjdA%3D%3D" onClick={() => trackStreamingClick('TURO', 'Tidal')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: 'orange', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>SoundCloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/turo?si=cc1bc73dcde74f1ba5b77b9871523126&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" onClick={() => trackStreamingClick('TURO', 'SoundCloud')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://connect.deezer.com/oauth/auth.php?app_id=384124&perms=basic_access%2Cemail%2Cmanage_library%2Cmanage_community%2Coffline_access&redirect_uri=https%3A%2F%2Flnk.to%2F~%2Fprerelease%2Fdeezer&state=bFVybD12ZW5pY2UubG5rLnRvJTJGdHVybyZzSWQ9ZmFlOTc2YzAtZWI0Ni00YjNlLWI4YWQtMGJlOTFlYWMxZDcwJnRJZD01Mjk3ZGUzZi1mZmNhLTRlNDEtYjJkYy1jNWRlODNlMWZlYmYmdT1odHRwcyUzQSUyRiUyRnZlbmljZS5sbmsudG8lMkZ0dXJvJnZ0PTlkNGI1MzgwZmNhNGVhMTBjMjhmYjY0MWRjMGM5M2UxJnZ1PTY5M2I1Y2YxMGQwYmM3Ljg4NDM5MTU3JnJmPWRpcmVjdA%3D%3D" onClick={() => trackStreamingClick('TURO', 'Deezer')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           {/* <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6} style={{ marginTop:"10px"}}>
            <a target="_blank" href="https://www.pandora.com/artist/genwav-and-cuee/22/22/TR7qbwfnZ5pfmrk?part=ug-desktop&corr=160031720547034956" onClick={() => trackStreamingClick('TURO', 'Pandora')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> */}
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.amazon.com/ap/oa?response_type=code&client_id=amzn1.application-oa2-client.b1b26a26335a46e79c2ff62d19ed6ace&scope=profile&redirect_uri=https%3A%2F%2Flnk.to%2F~%2Fprerelease%2Famazon&state=bFVybD12ZW5pY2UubG5rLnRvJTJGdHVybyZzSWQ9NTMxNzQ3YzEtZDI3NS00Yzc3LThhMzItYmM5MjZhYTcxNTI0JnRJZD01Mjk3ZGUzZi1mZmNhLTRlNDEtYjJkYy1jNWRlODNlMWZlYmYmdT1odHRwcyUzQSUyRiUyRnZlbmljZS5sbmsudG8lMkZ0dXJvJnZ0PTlkNGI1MzgwZmNhNGVhMTBjMjhmYjY0MWRjMGM5M2UxJnZ1PTY5M2I1Y2YxMGQwYmM3Ljg4NDM5MTU3JnJmPWRpcmVjdA%3D%3D&tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=9d4b5380fca4ea10c28fb641dc0c93e1&ref=dmm_acq_soc_us_u_lfire_lp_x_9d4b5380fca4ea10c28fb641dc0c93e1" onClick={() => trackStreamingClick('TURO', 'Amazon Music')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/track/turo" onClick={() => trackStreamingClick('TURO', 'Bandcamp')}><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>TURO</h4>
        <p>Written, Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
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

export default TURO;
