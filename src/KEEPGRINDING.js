
import { useState, useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import './styles.css'
import Grid from '@material-ui/core/Grid'
import '@react95/icons/icons.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MetaTags from 'react-meta-tags';
import { trackReleasePageView, trackMerchClick, trackStreamingClick } from "./MetaPixel";
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
            <title>KEEP GRINDIN (SYRE) | gen.wav</title>
            <meta id="meta-description" name="description" content="KEEP GRINDIN (SYRE) - EP - gen.wav" />
            <meta id="og-title" property="og:title" content="KEEP GRINDIN (SYRE) - EP - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/KEEPGRINDING/keepgrindingart.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv" style={{padding:"1% 0"}}>
        <img
          src="/KEEPGRINDING/keepgrindingart.png"
          alt="KEEP GRINDIN" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "1% 0", borderRadius:"15px"}}></img>
      </div>

      <h4 style={{margin:"0 0 10px"}}>KEEP GRINDIN (SYRE) | gen.wav</h4>

      <div className="linksContainer" style={{width: "25%", margin:"0 auto", marginBottom:"20px"}}>
        <div className="logo-button-container">
          <div className="logo-label"><SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "8px" }} size={50} /><p style={{ color: '#1DD15E', fontWeight:"600", margin:0}}>Spotify</p></div>
          <a target="_blank" href="https://open.spotify.com/album/5BRFGMIjFhjR77ku4EAkos" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'Spotify')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container">
          <div className="logo-label"><AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", fontSize:"0.8em", margin:0}}>Apple</p></div>
          <a target="_blank" href="https://music.apple.com/us/album/keep-grindin-syre-ep/6808668965" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'Apple')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container">
          <div className="logo-label"><TidalLogo className="logoSize" style={{ color: 'white', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>Tidal</p></div>
          <a target="_blank" href="https://tidal.com/album/558467339" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'Tidal')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container">
          <div className="logo-label"><SoundcloudLogo className="logoSize" style={{ color: 'orange', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>SoundCloud</p></div>
          <a target="_blank" href="https://soundcloud.com/genwav/sets/keep-grindin-syre" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'SoundCloud')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container">
          <div className="logo-label"><img className="logoSize" style={{marginRight: "8px", display:"inline-block" }} src="/deezer.png" width={50}></img><p style={{fontWeight:"600", margin:0}}>Deezer</p></div>
          <a target="_blank" href="https://www.deezer.com/us/album/1070969142" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'Deezer')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container">
          <div className="logo-label"><img className="logoSize" style={{marginRight: "8px", display:"inline-block" }} src="/qobuz.png" width={50}></img><p style={{fontWeight:"600", margin:0}}>Qobuz</p></div>
          <a target="_blank" href="https://www.qobuz.com/us-en/album/keep-grindin-syre-genwav/vhgazw75l8u4v" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'Qobuz')}><button className="pre-save-button">Stream</button></a>
        </div>

        <div className="logo-button-container">
          <div className="logo-label"><AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>Amazon</p></div>
          <a target="_blank" href="https://www.amazon.com/music/player/albums/B0HHSD8W62" onClick={() => trackStreamingClick('KEEP GRINDIN (SYRE)', 'Amazon Music')}><button className="pre-save-button">Stream</button></a>
        </div>
      </div>

      <div className="embla" ref={emblaRef} style={{marginTop:"5%"}}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01210.jpg" alt="KEEP GRINDING 1" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/KEEPGRINDING/DSC01225.jpg" alt="KEEP GRINDING 3" className="embla__slide__img" />
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

      <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/genwav/sets/keep-grindin-syre&color=%237c9cac&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style={{fontSize: "10px", color: "#cccccc",lineBreak: "anywhere",wordBreak: "normal",overflow: "hidden",whiteSpace: "nowrap",textOverflow: "ellipsis", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",fontWeight: 100}}><a href="https://soundcloud.com/genwav" title="gen.wav" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>gen.wav</a> · <a href="https://soundcloud.com/genwav/sets/keep-grindin-syre" title="KEEP GRINDIN (SYRE)" target="_blank" style={{color: "#cccccc", textDecoration: "none"}}>KEEP GRINDIN (SYRE)</a></div>

      <div className="aboutNEW">
        <h2>Credits</h2>
        <h4>KEEP GRINDIN (SYRE)</h4>
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
      </div>
    );

};

export default KEEPGRINDING;
