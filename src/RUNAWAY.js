import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import './styles.css'
import Grid from '@material-ui/core/Grid'
import MetaTags from 'react-meta-tags';
import { trackReleasePageView } from "./MetaPixel";
import { InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, TidalLogo } from "@phosphor-icons/react";

// The video and stream links go live Nov 5, 2026 at 12:00 PM Eastern; hidden until then
const VIDEO_LIVE_AT = new Date("2026-11-05T12:00:00-05:00").getTime();

const RUNAWAY = () => {
  const [showVideo, setShowVideo] = useState(() => Date.now() >= VIDEO_LIVE_AT);

  useEffect(() => {
    // Reveal it on its own if the page is open when it goes live
    if (showVideo) return;
    const t = setTimeout(() => setShowVideo(true), Math.min(VIDEO_LIVE_AT - Date.now(), 2147483647));
    return () => clearTimeout(t);
  }, [showVideo]);

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

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });

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
        <style>
          {`
            @media (min-width: 769px) {
              #runawayCover {
                margin: 2% 0 0.5% !important;
              }
              #runawayPresave {
                margin: 0 0 0.75% !important;
              }
            }
          `}
        </style>
        <img
          id="runawayCover"
          src="/RUNAWAY/runawayart.jpg"
          alt="Run Away by gen.wav cover art" type="img"
          style={{ height: "auto", width: "auto", maxWidth: "15%", objectFit: "cover", margin: "2% 0", borderRadius:"15px"}}></img>
      </div>
      {showVideo && (
        <iframe id="NEWVideo" style={{margin:"0 auto"}} width="50%" height="315" src="https://www.youtube.com/embed/xBFecfOcsjw" title="Run Away - gen.wav" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      )}
      {showVideo && (
        <Grid className="linksContainer" container spacing={2} style={{width: "25%", margin:"0 auto", paddingLeft:"5%"}}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2} className="logo-button-container">
              <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
                <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} /><p style={{ color: '#1DD15E', marginRight: "5px", fontWeight:"600"}}>Spotify</p>
              </Grid>
              <Grid item xs={6} sm={6}>
                <a target="_blank" href="https://open.spotify.com/track/0VuRfWYPoRGUVXswBzJGpf"><button className="pre-save-button">Stream</button></a>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="logo-button-container">
              <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
                <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Apple Music</p>
              </Grid>
              <Grid item xs={6} sm={6}>
                <a target="_blank" href="https://music.apple.com/us/album/run-away-single/6826551457"><button className="pre-save-button">Stream</button></a>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="logo-button-container">
              <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
                <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Soundcloud</p>
              </Grid>
              <Grid item xs={6} sm={6}>
                <a target="_blank" href="https://soundcloud.com/genwav/run-away"><button className="pre-save-button">Stream</button></a>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="logo-button-container">
              <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
                <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /><p style={{marginRight: "5px", fontWeight:"600"}}>Tidal</p>
              </Grid>
              <Grid item xs={6} sm={6}>
                <a target="_blank" href="https://tidal.com/track/572786406/u"><button className="pre-save-button">Stream</button></a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <p id="runawayPresave" style={{margin:"0 0 2%", fontWeight:"400", fontSize:"1em"}}>
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

      <div className="embla" ref={emblaRef} style={{marginTop:"5%"}}>
        <div className="embla__container">
           <div className="embla__slide">
            <img src="/RUNAWAY/DSC09101-web.jpg" alt="Run Away 4" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC08724-web.jpg" alt="Run Away 1" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC08863-web.jpg" alt="Run Away 2" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC09033-web.jpg" alt="Run Away 3" className="embla__slide__img" />
          </div>
         
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC09346-web.jpg" alt="Run Away 5" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC09535-web.jpg" alt="Run Away 6" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC09587-web.jpg" alt="Run Away 7" className="embla__slide__img" />
          </div>
          <div className="embla__slide">
            <img src="/RUNAWAY/DSC09717-web.jpg" alt="Run Away 8" className="embla__slide__img" />
          </div>
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
