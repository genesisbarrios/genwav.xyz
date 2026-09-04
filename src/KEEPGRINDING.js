
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
import { trackReleasePageView, trackMerchClick, trackStreamingClick } from "./MetaPixel";
import { Avatar } from "react95";
import React from "react";
import { Mail, Mail2, CdMusic, cdMusicData, MediaVideo, mediaVideoData, Mic } from '@react95/icons';
import { GlobeSimple, InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo, AmazonLogo, TidalLogo  } from "@phosphor-icons/react";
import axios from "axios";

const KEEPGRINDING = (props) => {
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
    // Track when KEEP GRINDING page is viewed
    trackReleasePageView('KEEP GRINDING');
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
            <title>KEEP GRINDING | gen.wav</title>
            <meta id="meta-description" name="description" content="KEEP GRINDING - gen.wav" />
            <meta id="og-title" property="og:title" content="KEEP GRINDING - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/KEEPGRINDING/keepgrindingart.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv" style={{padding:"1% 0"}}>
        <img
          src="/KEEPGRINDING/keepgrindingart.png"
          alt="KEEP GRINDING" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "1% 0", borderRadius:"15px"}}></img>
      </div>

      <h4 style={{margin:"0 0 10px"}}>KEEP GRINDING - gen.wav</h4>

      <p style={{margin:"0 0 2%", fontWeight:"400", fontSize:"1em"}}>
        Sign up to pre-save
      </p>

      <div
        className="card"
        style={{
          width: '40%',
          minHeight: '200px',
          margin: '0 auto',
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
            <iframe src="https://influanto.com/embed/newsletter/gen.wav" width="100%" height="440" style={{border:"none", maxWidth:"100%"}} title="Newsletter signup"></iframe>
      </div>

      <div className="embla" ref={emblaRef} style={{marginTop:"5%"}}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01210.jpg" alt="KEEP GRINDING 1" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01222.jpg" alt="KEEP GRINDING 2" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01225.jpg" alt="KEEP GRINDING 3" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01229.jpg" alt="KEEP GRINDING 4" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01235.jpg" alt="KEEP GRINDING 5" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01255.jpg" alt="KEEP GRINDING 6" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01287.jpg" alt="KEEP GRINDING 7" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01290.jpg" alt="KEEP GRINDING 8" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01312.jpg" alt="KEEP GRINDING 9" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01332.jpg" alt="KEEP GRINDING 10" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01338.jpg" alt="KEEP GRINDING 11" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01340.jpg" alt="KEEP GRINDING 12" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01352.jpg" alt="KEEP GRINDING 13" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01353.jpg" alt="KEEP GRINDING 14" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01377.jpg" alt="KEEP GRINDING 15" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01446.jpg" alt="KEEP GRINDING 16" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01449.jpg" alt="KEEP GRINDING 17" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01452.jpg" alt="KEEP GRINDING 18" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01454.jpg" alt="KEEP GRINDING 19" className="embla__slide__img" style={{marginRight:"20px"}} />
          </div>
        </div>
      </div>

      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>KEEP GRINDING</h4>
        <p>Produced, Mixed and Mastered by <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
         <p>Visuals by <a href="https://www.instagram.com/khrisjoao" target="_blank">KHR!S João</a> & <a href="https://www.instagram.com/_enigmalabs" target="_blank">Enigma Labs</a> </p>
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

export default KEEPGRINDING;
