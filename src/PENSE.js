import { useEffect } from "react";
import './styles.css'
import Grid from '@material-ui/core/Grid'
import MetaTags from 'react-meta-tags';
import { trackReleasePageView, trackStreamingClick } from "./MetaPixel";
import { InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";

// Pre-save page for Pensé (out Nov 27, 2026): cover, pre-save sign-up, and
// Apple Music pre-add.
const PENSE = () => {

  useEffect(() => {
    //hide elements
    if(document){
      const welcomeBox = document.getElementById("welcomeBox");
      if (welcomeBox) welcomeBox.style.display = "none";
    }
  }, []);

  useEffect(() => {
    // Track when the Pensé page is viewed
    trackReleasePageView('PENSE');
  }, []);

  return(
    <div id="NEW">
      <div class="wrapper">
          <MetaTags>
            <title>Pensé | gen.wav</title>
            <meta id="meta-description" name="description" content="Pre-save Pensé by gen.wav, out November 27" />
            <meta id="og-title" property="og:title" content="Pensé - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/og/PENSE.jpg" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <style>
          {`
            @media (min-width: 769px) {
              #penseCover {
                margin: 2% 0 0.5% !important;
              }
              #pensePresave {
                margin: 0 0 0.75% !important;
              }
            }
          `}
        </style>
        <img
          id="penseCover"
          src="/pense.jpg"
          alt="Pensé by gen.wav cover art"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>

      <p id="pensePresave" style={{margin:"0 0 2%", fontWeight:"400", fontSize:"1em"}}>
        Out November 27 · Sign up to pre-save
      </p>

      <div className="linksContainer" style={{width: "25%", margin:"0 auto 2%"}}>
        <div className="logo-button-container logo-row">
          <div className="logo-label"><AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "8px" }} size={50} /><p style={{fontWeight:"600", margin:0}}>Apple</p></div>
          <a target="_blank" rel="noopener noreferrer" href="https://music.apple.com/us/album/pens%C3%A9-single/6834978135" onClick={() => trackStreamingClick('Pensé', 'Apple')}><button className="pre-save-button">Pre-add</button></a>
        </div>
      </div>

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
        <div className="cardHeader">
          <iframe src="https://influanto.com/embed/newsletter/gen.wav" width="100%" height="440" style={{border:"none", maxWidth:"100%"}} title="Pre-save Pensé"></iframe>
        </div>
      </div>
    </div>

      <Grid className="linksContainer" container spacing={3} style={{maxWidth: "35%", margin:"0 auto", paddingTop:"2%", paddingBottom:"5%"}}>
        <Grid item xs={12} sm={12}>
          <div id="socials" style={{paddingTop:"10px", display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="http://instagram.com/gen.wav" style={{textDecoration:"none"}}>
                    <InstagramLogo style={{color: 'purple'}} size={20}></InstagramLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="http://twitter.com/gendotwav" style={{textDecoration:"none"}}>
                    <TwitterLogo style={{color: '#A6CAF0'}} size={20}></TwitterLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="http://tiktok.com/gen.wav" style={{textDecoration:"none"}}>
                    <TiktokLogo style={{color: 'pink'}} size={20}></TiktokLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="https://soundcloud.com/genwav" style={{textDecoration:"none"}}>
                    <SoundcloudLogo style={{color: 'orange'}} size={20}></SoundcloudLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@genwav" style={{textDecoration:"none"}}>
                    <YoutubeLogo style={{color: 'red'}} size={20}></YoutubeLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/artist/3YihJDU9YETUNDWO6pDuQG?si=VmY6439rRLS5mw8uC0nHYg" style={{textDecoration:"none"}}>
                    <SpotifyLogo style={{color: 'green'}} size={20}></SpotifyLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="https://music.apple.com/us/artist/genesis-barrios/1194186719" style={{textDecoration:"none"}}>
                    <AppleLogo style={{color: 'pink'}} size={20}></AppleLogo>
                  </a>
                </div>
                <div style={{display:"inline"}}>
                  <a target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/2MdNjbHnBR" style={{textDecoration:"none"}}>
                    <DiscordLogo style={{color: 'purple'}} size={20}></DiscordLogo>
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
      </div>
    );

};

export default PENSE;
