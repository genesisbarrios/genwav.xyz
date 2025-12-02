
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
import { GlobeSimple, InstagramLogo, PatreonLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo, AmazonLogo, TidalLogo  } from "@phosphor-icons/react";
import axios from "axios"; 
import { trackReleasePageView, trackMerchClick, trackStreamingClick } from "./MetaPixel";

const GENESIS = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagram, setInstagram] = useState("");
  const [fan, setFan] = useState(false);
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
    // Track when GENESIS page is viewed
    trackReleasePageView('GENESIS');
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
    <div id="GENESIS">
    <div style={{ textAlign: "center" }}>
      <div id="GenesisImageDiv">
        <img 
          src="https://dl.dropboxusercontent.com/s/h6t8dvgtzzj8f069s0ma4/GENESIS_ANI.gif?rlkey=i1x2657yni0v3dyhhe8fjixvs&st=8dpg1ttt&dl=0"
          alt="GENESIS Album" type="gif"
          style={{ height: "auto", width: "auto", maxWidth: "25%", objectFit: "cover", margin: "2% 0", borderRadius:"15px" }}></img>
      </div>
      <Grid className="linksContainer" container spacing={2} style={{width: "35%", margin:"0 auto", paddingLeft:"2%"}}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
            </Grid>
            <Grid item xs={6} sm={6}>
             <a target="_blank" href="https://open.spotify.com/album/4IffPzjr10k3LgFTtSRuBm?go=1" onClick={() => trackStreamingClick('GENESIS', 'Spotify')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Apple Music</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://music.apple.com/us/album/1747470473?app=music&at=1l3vpUI&ct=LFV_7d58c687eeff1763f79f5c3638b3da52&itscg=30440&itsct=catchall_p3&lId=210713504&cId=none&sr=3&src=Linkfire&ls=1" onClick={() => trackStreamingClick('GENESIS', 'Apple Music')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /><p style={{ marginRight: "5px", fontWeight:"600"}}>YouTube</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.youtube.com/watch?v=YMPVuPspRw0&list=PLcGBMxEyx5p8sfg853csGDXChKZo2ZNNi" onClick={() => trackStreamingClick('GENESIS', 'YouTube')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
            <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://soundcloud.com/genwav/sets/genesis-414993647" onClick={() => trackStreamingClick('GENESIS', 'Soundcloud')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://tidal.com/browse/album/364508052" onClick={() => trackStreamingClick('GENESIS', 'Tidal')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
             <img className="logoSize" style={{marginRight: "5px" }} src="pandora.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Pandora</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.pandora.com/artist/genwav/genesis/ALVK52vZZ46mn7q?%24ios_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A34977410&%24android_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A34977410&~channel=Partner%20Catalog%20Search%20API%20-%20Linkfire&part=lf&corr=7d58c687eeff1763f79f5c3638b3da52&partnerName=Linkfire&~campaign=Partner%20Customer%20ID%20-%201e32aa2b-5540-4eef-8a89-c5baf73558a2&sharedId=7d58c687eeff1763f79f5c3638b3da52&_branch_match_id=1309723444836776967&utm_source=Partner%20Catalog%20Search%20API%20-%20Linkfire&utm_campaign=Partner%20Customer%20ID%20-%201e32aa2b-5540-4eef-8a89-c5baf73558a2&_branch_referrer=H4sIAAAAAAAAA62Py2rDMBBFv8beGOdhWZZTMMU0DYSGEih0kU0YS%2BMHtiVVUuLfr9xHusymMIvLcOccqXVO24flUoMUysACtF4MneyXj0GSCrS9U%2Fp8MUPRzsWAlEGy8zNN0%2BL3hKvRb8C4zjofGpQTXL8D2s76VB7eX2hyPZ3SbJTsI%2FToTtmzQNSz66zBtcUP7preJBXw3jpocMYP1WUMyM6pHmVAtuXB10i6YSxdr2agvzaqE%2F8JZc%2B8BSlxKI7%2BdxJN9AQOBtVEbwiGt1F53EdxdPC2ujMYat8qhjrkypiCCZrzLGeIdb1mGanZpqacZCSviACafLU98xVGLG6I2Qmjhq6Rf9KLdWr0Yb%2F1tjWSBCCpYkrTVZx6fJxDvok5raBmhNIcktC2YFDsxd1XfAJVa1qo%2FwEAAA%3D%3D" onClick={() => trackStreamingClick('GENESIS', 'Pandora')}><button className="pre-save-button">Stream</button></a>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <img className="logoSize" style={{marginRight: "5px" }} src="Bandcamp.png" width={50}></img><p style={{marginRight: "5px", fontWeight:"600"}}>Bandcamp</p>
            </Grid>
            <Grid item xs={6} sm={6}>
              <a target="_blank" href="https://genwav.bandcamp.com/album/genesis" onClick={() => trackMerchClick('GENESIS', 'Bandcamp')}><button className="pre-save-button">Buy / Merch</button></a>
            </Grid>
          </Grid>
           <Grid container spacing={2} className="logo-button-container">
            <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
              <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Amazon</p>
            </Grid>
            <Grid item xs={6} sm={6}>
            <a target="_blank" href="https://www.amazon.com/music/player/albums/B0D4QJWST2" onClick={() => trackStreamingClick('GENESIS', 'Amazon')}><button className="pre-save-button">Stream / Buy</button></a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

     <a target="_blank" style={{color:"white", margin:"0 auto", textAlign:"center", textDecoration:"none"}} href="https://square.link/u/bB1nh5QB" onClick={() => trackMerchClick('SOLYMAR', 'NFC Album')}>
             <style>
            {`
              /* make the two merch h3s smaller on mobile */
              @media (max-width: 768px) {
                .genesis-mini-h3 {
                  font-size: 14px !important;
                  margin-top: 8px !important;
                  margin-bottom: 8px !important;
                }
              }
              @media (max-width: 480px) {
                .genesis-mini-h3 {
                  font-size: 12px !important;
                }
              }
            `}
           </style>
            <h3 className="genesis-mini-h3" style={{marginTop:"2%", marginBottom:"2%"}}>GENESIS MINI CD NFC Keychain</h3>
           <img src="/GENESIS-MINICD-SQUARE.jpg" width="30%" style={{borderRadius:"10px"}}></img>
            <h3 className="genesis-mini-h3" style={{marginTop:"2%"}}>Tap to download of all 13 tracks on the album 🎵</h3>
          </a>


      <h2 style={{paddingTop:"5%"}}>Music Videos</h2>
      <Grid container spacing={3} style={{width:"80%", margin:"0 auto"}}>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/kTtfDnEF7W4?si=81ziews9ko5yMXXl" title="El Cambio - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/3v6ZX_XowU8?si=ACM_I7z7FcTxn20u" title="Cachumbambe - gen.wav, El Igor Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/bPX7_MUQr-0?si=zJLxLxCxsVCqgNr7" title="El Ingeniero - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/3wBxgLcn4-M?si=VxC900P3cLHoeUIt" title="Corazon Frio - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/z3UoOWL7Ltg?si=NDtSnK4IlkpZgotw" title="Gucci - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
           <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/MZSFGwk9UaY?si=2qbljpEJC7dZljBQ" title="Tsunami - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/7Qqv5UzPEEY?si=75FK9aFLH9m_3qeY" title="Ibiza - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
          <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/Ie1KfxLpxeY?si=3Sh00_3EkaWr2zNB" title="I Remember - gen.wav, Claudia Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
           <Grid item xs={12} lg={4}>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/FQyi0U0Hkrg?si=QvFKGQPolR5Bm20C" title="La Peli - gen.wav Official Music Video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </Grid>
      </Grid>
      
          <div className="aboutAlbum" style={{marginTop:"10%", textAlign:"center", width:"60%"}}>
          <style>
            {`
              @media (max-width: 768px) {
                .merch-container {
                  display: flex !important;
                  flex-direction: column !important;
                  align-items: center !important;
                }
                .merch-image {
                  width: 80% !important;
                  margin: 10px 0 !important;
                  margin-right: 0 !important;
                }
              }
            `}
          </style>
          <a target="_blank" style={{color:"white", margin:"0 auto", textDecoration:"none"}} href="https://enigma-labs.printify.me/" onClick={() => trackMerchClick('GENESIS')}>
            <h3 style={{marginTop:"2%", textAlign:"center", marginBottom:"20px"}}>MERCH</h3>
          </a>
          <div className="merch-container">
             <a target="_blank" style={{color:"white", margin:"0 auto"}} href="https://enigma-labs.printify.me/product/13729055/genesis-heads-trucker-caps" onClick={() => trackMerchClick('GENESIS', 'Hat')}>
              <img src="https://images-api.printify.com/mockup/66f9dbf2dd969d5af3041583/84650/56211/genesis-heads-trucker-caps.jpg?camera_label=on-person-2&revision=1727650911010&s=400" alt="GENESIS Merch" className="merch-image" style={{width:"30%", height:"auto", margin:"0 auto", borderRadius:"10px", marginRight:"4px"}}></img>
            </a>
            <a target="_blank" style={{color:"white", margin:"0 auto"}} href="https://enigma-labs.printify.me/product/20536208/genesis-graphic-tee" onClick={() => trackMerchClick('GENESIS', 'Graphic Tee')}>
              <img src="https://images-api.printify.com/mockup/683380ed7860a870dc0c7993/12124/92570/genesis-graphic-tee.jpg?camera_label=front&revision=1748205998233&s=400" alt="GENESIS Merch" className="merch-image" style={{width:"30%", height:"auto", margin:"0 auto", borderRadius:"10px", marginRight:"4px"}}></img>
            </a>
            <a target="_blank" style={{color:"white", margin:"0 auto"}} href="https://enigma-labs.printify.me/product/13556335/genesis-mouse-pad" onClick={() => trackMerchClick('GENESIS',  'Accessories')}>
              <img src="https://images-api.printify.com/mockup/66f3a4df049f17caae0f4911/71665/12298/genesis-mouse-pad.jpg?camera_label=context-1&revision=1727636620526&s=400" alt="GENESIS Merch" className="merch-image" style={{width:"30%", height:"auto", margin:"0 auto", borderRadius:"10px"}}></img>
            </a>
          </div>
          <a target="_blank" style={{color:"white", margin:"0 auto", textDecoration:"none"}} href="https://enigma-labs.printify.me/" onClick={() => trackMerchClick('GENESIS')}>
            <h3 style={{marginTop:"2%", textAlign:"center", marginBottom:"15%"}}>GET YOURS NOW</h3>
          </a>
        <h2>About the Album</h2>
        <p>I had no idea what I was getting myself into when I started this project, but it was so worth the blood, sweat, and tears. What started as an EP with a couple features on it ended up being my debut album and it wouldn’t have been possible without all my friends and colleagues. I'm not an artist that's bound to one genre, that's why this project is packed with different genres, and fusions. Although I stick true to my Cuban roots, I'm sure there's a song for everyone in it. It was created over the past year, while still releasing singles monthly and I would appreciate from the bottom of my heart if you took a listen 🙏🏽🫶🏽🌊</p>
        <br></br>
        <p>GENESIS is about self reflection through relationship, self awareness, transformation, and coming back to yourself and your purpose. ⭐</p>    
        <p> gen.wav (5.30.24)</p>    
        <br></br>
        <h2>Credits</h2>
        <h4>El Ingeniero</h4>
        <p>Produced and Written by <a href="https://www.instagram.com/gen.wav/" target="_blank">gen.wav</a></p>
        <p>Mixed and Mastered by <a href="https://www.instagram.com/mixedbyedwn/?hl=en" target="_blank">Edwin Estacio</a></p>
        <br></br>
        <h4>Ibiza</h4>
        <p>Produced and Written by gen.wav</p>
        <p>Background Vocalist: <a href="https://www.instagram.com/s33kr0/" target="_blank">°S33KR0°</a></p>
        <p>Co-Produced, Mixed, and Mastered by <a href="https://www.instagram.com/cundibeatz/?hl=en" target="_blank">CundiBeatz</a></p>
        <br></br>
        <h4>Bandolera Feat. <a href="https://www.instagram.com/riskrunnaricky" target="_blank">Riskrunnaricky</a></h4>
        <p>Written by gen.wav and Riskrunnaricky</p>
        <p>Produced, Mixed, and Mastered by gen.wav</p>
        <br></br>
        <h4>Cachumbambé Feat. <a href="https://www.instagram.com/igorcentrism" target="_blank">El Igor</a></h4>
        <p>Produced and Written by gen.wav</p>
        <p>Mixed and Mastered by <a href="https://www.instagram.com/nielklopen/?hl=en" target="_blank">Niel Klopen</a></p>
        <br></br>
        <h4>Milán Feat. <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João,</a> <a href="https://www.instagram.com/igorcentrism" target="_blank">El Igor</a></h4>
        <p>Produced and Written by gen.wav</p>
        <p>Co-Produced, Mixed, and Mastered by <a href="https://www.instagram.com/cundibeatz/?hl=en" target="_blank">CundiBeatz</a></p>
        <br></br>
        <h4>Corazón Frío</h4>
        <p>Produced and Written by gen.wav</p>
        <p>Mixed and Mastered by <a href="https://www.instagram.com/adrian.ajv/?hl=en" target="_blank">ADRIAN</a></p>
        <br></br>
        <h4>La Peli</h4>
        <p>Produced and Written by gen.wav</p>
        <p>Mixed and Mastered by <a href="https://www.instagram.com/adrian.ajv/?hl=en" target="_blank">ADRIAN</a></p>
        <br></br>
        <h4>No Me Llames Más Feat. <a href="https://www.instagram.com/igorcentrism" target="_blank">El Igor</a></h4>
        <p>Written by gen.wav and El Igor</p>
        <p>Produced, Mixed, and Mastered by gen.wav</p>
        <br></br>
        <h4>El Cambio</h4>
        <p>Produced and Written by gen.wav</p>
        <p>Mixed and Mastered by gen.wav</p>
        <br></br>
        <h4>Gucci</h4>
        <p>Produced by <a href="https://www.instagram.com/b0neb0yyy/" target="_blank">SAM0</a></p>
        <p>Written, Mixed, and Mastered by gen.wav</p>
        <br></br>
        <h4>I Remember Feat. <a href="https://www.instagram.com/claudiasings/" target="_blank">Claudia</a></h4>
        <p>Written by gen.wav and Claudia</p>
        <p>Produced, Mixed, and Mastered by gen.wav</p>
        <br></br>
        <h4>It's Me Not You Feat. <a href="https://www.instagram.com/grlkrash/" target="_blank">GRLKRASH</a></h4>
        <p>Written by gen.wav and GRLKRASH</p>
        <p>Produced, Mixed, and Mastered by gen.wav</p>
        <br></br>
        <h4>Tsunami (Olvídalo) Feat. <a href="https://www.instagram.com/khrissosick/" target="_blank">KHR!S João</a></h4>
        <p>Written by gen.wav and KHR!S João</p>
        <p>Produced, Mixed, and Mastered by gen.wav</p>
        <br></br>
        <p>Album Art and Animations by <a href="https://www.instagram.com/alectheaverage/" target="_blank">Alec Perez</a></p>
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
                 <div style={{display:"inline"}}>
                    <a target="_blank" href="https://patreon.com/genwav?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" style={{textDecoration:"none"}}>
                      <PatreonLogo style={{color: 'white'}} size={20}></PatreonLogo>
                    </a>
                  </div>
              </div>
            </Grid>
          </Grid>
      </div>
    );
        
};

export default GENESIS;
