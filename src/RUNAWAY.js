import { useEffect } from "react";
import './styles.css'
import Grid from '@material-ui/core/Grid'
import MetaTags from 'react-meta-tags';
import { trackReleasePageView } from "./MetaPixel";
import { InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";

const RUNAWAY = () => {

  useEffect(() => {
    //hide elements
    if(document){
      const welcomeBox = document.getElementById("welcomeBox");
      if (welcomeBox) welcomeBox.style.display = "none";
    }
  }, []);

  useEffect(() => {
    // Track when Run Away page is viewed
    trackReleasePageView('Run Away');
  }, []);

  return(
    <div id="NEW">
      <div class="wrapper">
          <MetaTags>
            <title>Run Away | gen.wav</title>
            <meta id="meta-description" name="description" content="Pre-save Run Away by gen.wav" />
            <meta id="og-title" property="og:title" content="Run Away - gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/og/RUNAWAY.jpg" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
        <img
          src="/RUNAWAY/runawayart.jpg"
          alt="Run Away by gen.wav cover art" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>

      <h3 style={{margin:"0 0 10px", fontWeight:"600"}}>Run Away - gen.wav</h3>

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
        <div className="cardHeader">
          <iframe src="https://influanto.com/embed/newsletter/gen.wav" width="100%" height="440" style={{border:"none", maxWidth:"100%"}} title="Pre-save Run Away"></iframe>
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
              </div>
            </Grid>
          </Grid>
      </div>
    );

};

export default RUNAWAY;
