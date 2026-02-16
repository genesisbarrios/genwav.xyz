
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


const UP = (props) => {
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
    // Track when UP page is viewed
    trackReleasePageView('UP');
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
            <title>UP | gen.wav</title>
            <meta id="meta-description" name="description" content="UP - gen.wav" />
            <meta id="og-title" property="og:title" content="UP - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/UPCoverArt.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img 
          src="/UPCoverArt.png"
          alt="UP" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>

      <iframe id="NEWVideo" width="50%" height="315" src="https://www.youtube.com/embed/73bsecH1N2c?si=UmfGlBOqOxoiMv9S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>       

      <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", marginBottom:"20px"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/album/7cMR5xD6ueMhPItkG7oWwI?go=1" onClick={() => trackStreamingClick('UP', 'Spotify')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>

         <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600", fontSize:"0.8em"}}>Apple</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/1866067348?app=music&at=1l3vpUI&ct=LFV_e889ede732e553ef60d31d05bc5db6e0&itscg=30440&itsct=catchall_p3&lId=214982091&cId=none&sr=3&src=Linkfire&ls=1" onClick={() => trackStreamingClick('UP', 'Apple')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid> 
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.youtube.com/watch?v=ata_s0jy_iI"><button className="pre-save-button" onClick={() => trackStreamingClick('UP', 'YouTube')}>Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="http://www.tidal.com/album/486627712" onClick={() => trackStreamingClick('UP', 'Tidal')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: 'orange', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>SoundCloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/up?si=1ecb75e396c848dba7ea47ac4ed79dca&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" onClick={() => trackStreamingClick('UP', 'SoundCloud')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
            <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/deezer.png" width={50}></img> <p style={{marginRight: "5px", fontWeight:"600"}}>Deezer</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.deezer.com/us/album/889763842" onClick={() => trackStreamingClick('UP', 'Deezer')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center", marginTop:"10px"}}>
             <img className="logoSize" style={{marginRight: "5px", display:"inline-block" }} src="/pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6} style={{ marginTop:"10px"}}>
            <a target="_blank" href="https://pandora.app.link/?$desktop_url=https%3A%2F%2Fwww.pandora.com%2Fartist%2Fgenwav%2Fup%2FAL6t9qZnv53pr66&$ios_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A59008853&$android_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A59008853&~channel=Partner%20Catalog%20Search%20API%20-%20Linkfire&part=lf&corr=e889ede732e553ef60d31d05bc5db6e0&partnerName=Linkfire&~campaign=Partner%20Customer%20ID%20-%20278a2816-dfa9-401b-a3db-c48f009683cb&sharedId=e889ede732e553ef60d31d05bc5db6e0" onClick={() => trackStreamingClick('UP', 'Pandora')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://music.amazon.com/albums/B0GDS9D3G3?tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=4d21a1ece2610bdf3912bcaa475f9915&ref=dmm_acq_soc_us_u_lfire_lp_x_4d21a1ece2610bdf3912bcaa475f9915" onClick={() => trackStreamingClick('UP', 'Amazon Music')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="/Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/track/up" onClick={() => trackStreamingClick('UP', 'Bandcamp')}><button className="pre-save-button">Buy</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src="/UP/UpCarousel1.jpg" alt="UP 1" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel2.png" alt="UP 2" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel3.jpg" alt="UP 3" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel4.jpg" alt="UP 4" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel5.jpg" alt="UP 5" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel6.jpg" alt="UP 6" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel7.jpg" alt="UP 7" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel8.jpg" alt="UP 8" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel9.jpg" alt="UP 9" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/UP/UpCarousel10.jpg" alt="UP 10" className="embla__slide__img" style={{marginRight:"20px"}} />
          </div>
        </div>
      </div>

      <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2240742677&color=%23997a59&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style={{fontSize: 10, color: "#cccccc", lineBreak: "anywhere", wordBreak: "normal", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif", fontWeight: 100}}><a href="https://soundcloud.com/genwav" title="gen.wav" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>gen.wav</a> · <a href="https://soundcloud.com/genwav/up" title="UP" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>UP</a></div>

      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>UP</h4>
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

export default UP;
