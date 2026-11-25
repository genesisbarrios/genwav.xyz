
import { useState, useEffect } from "react";
import './styles.css'
import Grid from '@material-ui/core/Grid'
import '@react95/icons/icons.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MetaTags from 'react-meta-tags';
import { trackReleasePageView, trackMerchClick, trackStreamingClick } from "./MetaPixel";
import { GlobeSimple, InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, GithubLogo, AmazonLogo, TidalLogo  } from "@phosphor-icons/react";
import axios from "axios";

const CACHUMBAMBE = (props) => {
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
    // Track when the Cachumbambé page is viewed
    trackReleasePageView('CACHUMBAMBE');
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
            <title>Cachumbambé | El Igor, gen.wav</title>
            <meta id="meta-description" name="description" content="Cachumbambé - El Igor & gen.wav" />
            <meta id="og-title" property="og:title" content="Cachumbambé - El Igor & gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/GENESIS/CachumbambeAni.gif" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div className="release-hero release-hero--credits">
      <div id="NEWImageDiv" className="release-hero__cover" style={{padding:"1% 0"}}>
        <img
          src="/GENESIS/CachumbambeAni.gif"
          alt="Cachumbambé by El Igor & gen.wav cover art" type="gif"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "1% 0", borderRadius:"15px"}}></img>
      </div>

       <iframe id="NEWVideo" width="50%" height="515" src="https://www.youtube.com/embed/3v6ZX_XowU8" title="Cachumbambé - gen.wav, El Igor Official Music Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>       

      <div className="linksContainer release-hero__links" style={{width: "25%", margin:"20px auto"}}>
        <div className="logo-button-container logo-row">
          <div className="logo-label"><SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "8px" }} size={50} /><p style={{ color: '#1DD15E', fontWeight:"600", margin:0}}>Spotify</p></div>
          <a target="_blank" href="https://open.spotify.com/track/5JsQzm1IBlJqg8w0JXFiPj" onClick={() => trackStreamingClick('Cachumbambé', 'Spotify')}><button className="pre-save-button">Stream</button></a>
        </div>
        <div className="logo-button-container logo-row">
          <div className="logo-label"><AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>Apple</p></div>
          <a target="_blank" href="https://music.apple.com/us/album/cachumbamb%C3%A9-single/1738371445" onClick={() => trackStreamingClick('Cachumbambé', 'Apple')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><TidalLogo className="logoSize" style={{ color: 'white', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>Tidal</p></div>
          <a target="_blank" href="https://tidal.com/track/353992544" onClick={() => trackStreamingClick('Cachumbambé', 'Tidal')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><SoundcloudLogo className="logoSize" style={{ color: 'orange', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>SoundCloud</p></div>
          <a target="_blank" href="https://soundcloud.com/genwav/cachumbambe" onClick={() => trackStreamingClick('Cachumbambé', 'SoundCloud')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>YouTube</p></div>
          <a target="_blank" href="https://www.youtube.com/watch?v=zYqgufPhyQ0" onClick={() => trackStreamingClick('Cachumbambé', 'YouTube')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><img className="logoSize" style={{marginRight: "8px", display:"inline-block" }} src="/deezer.png" width={50}></img><p style={{fontWeight:"600", margin:0}}>Deezer</p></div>
          <a target="_blank" href="https://www.deezer.com/us/album/565916991" onClick={() => trackStreamingClick('Cachumbambé', 'Deezer')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><img className="logoSize" style={{marginRight: "8px", display:"inline-block" }} src="/pandora.png" width={50}></img><p style={{fontWeight:"600", margin:0}}>Pandora</p></div>
          <a target="_blank" href="https://www.pandora.com/TR:125020688" onClick={() => trackStreamingClick('Cachumbambé', 'Pandora')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>Amazon</p></div>
          <a target="_blank" href="https://music.amazon.com/albums/B0CZ95W4C5" onClick={() => trackStreamingClick('Cachumbambé', 'Amazon Music')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container logo-row">
          <div className="logo-label"><img className="logoSize" style={{marginRight: "8px", display:"inline-block" }} src="/Bandcamp.png" width={50}></img><p style={{fontWeight:"600", margin:0}}>Bandcamp</p></div>
          <a target="_blank" href="https://genwav.bandcamp.com/track/cachumbamb" onClick={() => trackStreamingClick('Cachumbambé', 'Bandcamp')}><button className="pre-save-button">Buy</button></a>
        </div>
      </div>
      <div className="aboutNEW release-hero__credits">
        <h2>Credits</h2>
        <h4>Cachumbambé</h4>
        <p><a href="https://www.instagram.com/igorcentrism" target="_blank">El Igor</a> &amp; <a href="https://www.instagram.com/gen.wav" target="_blank">gen.wav</a></p>
        <p>Also on gen.wav's debut album <a href="/GENESIS">GENESIS</a></p>
        <br></br>
      </div>
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
        <iframe src="https://influanto.com/embed/newsletter/gen.wav" width="100%" height="440" style={{border:"none", maxWidth:"100%"}} title="Newsletter signup"></iframe>
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
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 16px 5%" }}>
        <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/genwav/cachumbambe&color=%237c9cac&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere",wordBreak: "normal",overflow: "hidden",whiteSpace: "nowrap",textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",fontWeight: 100}}><a href="https://soundcloud.com/genwav" title="gen.wav" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>gen.wav</a> · <a href="https://soundcloud.com/genwav/cachumbambe" title="Cachumbambé" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>Cachumbambé</a></div>
      </div>
      </div>
    );

};

export default CACHUMBAMBE;
