import { useEffect } from "react";
import './styles.css'
import Grid from '@material-ui/core/Grid'
import MetaTags from 'react-meta-tags';
import { trackReleasePageView } from "./MetaPixel";
import { InstagramLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo, TidalLogo, AmazonLogo } from "@phosphor-icons/react";

// Pre-save page for Pensé (out Nov 27, 2026): cover and pre-save sign-up.

// Streaming links, filled in once Pensé is out. Hidden until LINKS_LIVE is true.
const LINKS_LIVE = true;
const LINKS = [
  { name: "Spotify", href: "https://open.spotify.com/track/1HpFUHMp00yDH0FIxXKP6D", icon: <SpotifyLogo className="logoSize" style={{ color: '#1DD15E', marginRight: "5px" }} size={50} />, color: '#1DD15E' },
  { name: "Apple", href: "https://music.apple.com/us/album/pens%C3%A9/6834978135?i=6834978136", icon: <AppleLogo className="logoSize" style={{ color: '#FA4C64', marginRight: "5px" }} size={50} /> },
  { name: "Soundcloud", href: "https://soundcloud.com/genwav/pense", icon: <SoundcloudLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /> },
  { name: "Tidal", href: "https://tidal.com/album/pens%C3%A9/579224851", icon: <TidalLogo className="logoSize" style={{ color: 'white', marginRight: "5px" }} size={50} /> },
  { name: "YouTube", href: "https://www.youtube.com/watch?v=dYx0bxCdg-k", icon: <YoutubeLogo className="logoSize" style={{ color: 'red', marginRight: "5px" }} size={50} /> },
  { name: "Deezer", href: "https://www.deezer.com/us/album/1147249151", icon: <img className="logoSize" style={{ marginRight: "5px", display: "inline-block" }} src="/deezer.png" width={50} alt="Deezer" /> },
  { name: "Pandora", href: "https://www.pandora.com/artist/genwav/pense/ALn764vbJrt3J3K", icon: <img className="logoSize" style={{ marginRight: "5px" }} src="/pandora.png" width={50} alt="Pandora" /> },
  { name: "Amazon", href: "", icon: <AmazonLogo className="logoSize" style={{ color: '#FF7000', marginRight: "5px" }} size={50} /> },
  { name: "Bandcamp", href: "", icon: <img className="logoSize" style={{ marginRight: "5px" }} src="/Bandcamp.png" width={50} alt="Bandcamp" /> },
];
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
      <div className="release-hero release-hero--single">
      <div id="NEWImageDiv" className="release-hero__cover">
        <style>
          {`
            @media (min-width: 769px) {
              #penseCover {
                margin: 2% 0 0.5% !important;
              }
            }
            /* desktop: buttons flush right so the rows span the column and
               line up under the centered title */
            @media (min-width: 969px) {
              .pense-stream-cell {
                display: flex;
                justify-content: flex-end;
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

      {LINKS_LIVE && (
        <Grid className="linksContainer release-hero__links" container spacing={2} style={{width: "25%", margin:"0 auto 2%", paddingLeft:"5%"}}>
          <Grid item xs={12} sm={12}>
            <h2 style={{textAlign:"center", margin:"0 0 16px", fontWeight:"700"}}>Pensé - gen.wav</h2>
            {LINKS.filter((l) => l.href).map((l) => (
              <Grid key={l.name} container spacing={2} className="logo-button-container">
                <Grid item xs={6} sm={6} style={{display:"flex", alignItems: "center"}}>
                  {l.icon}<p style={{ color: l.color, marginRight: "5px", fontWeight:"600"}}>{l.name}</p>
                </Grid>
                <Grid item xs={6} sm={6} className="pense-stream-cell">
                  <a target="_blank" rel="noopener noreferrer" href={l.href}><button className="pre-save-button">Stream</button></a>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      </div>

      <div className="aboutNEW" style={{marginBottom:"3%"}}>
        <h2>Credits</h2>
        <h4>Pensé</h4>
        <p>Produced by <a href="https://www.instagram.com/gen.wav" target="_blank" rel="noopener noreferrer">gen.wav</a> &amp; <a href="https://www.instagram.com/xaviermderio/" target="_blank" rel="noopener noreferrer">Xideral</a></p>
        <p>Cover art by <a href="https://www.instagram.com/dizzy_smarp/" target="_blank" rel="noopener noreferrer">Dizzy Smarp</a></p>
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
