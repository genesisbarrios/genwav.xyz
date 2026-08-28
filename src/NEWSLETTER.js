import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { InstagramLogo, PatreonLogo, TwitterLogo, TiktokLogo, SoundcloudLogo, DiscordLogo, SpotifyLogo, AppleLogo, YoutubeLogo } from "@phosphor-icons/react";

const NEWSLETTER = () => {
  useEffect(() => {
    document.title = "gen.wav | Newsletter";
  }, []);

  return (
    <div id="NEWSLETTER" style={{ paddingBottom: "5%", paddingTop: "3%", textAlign: "center", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <Grid container spacing={3} style={{ padding: "0px" }}>
        <Grid item xs={12}>
          <h1>NEWSLETTER</h1>
          <p style={{ marginBottom: "3%" }}>Sign up to get updates on new releases, shows, and drops straight to your inbox.</p>

          <div
            className="card"
            style={{ width: "460px", maxWidth: "90%", minHeight: "200px", margin: "0 auto" }}
          >
            <style>
              {`
                @media (max-width: 768px) {
                  #NEWSLETTER .card {
                    width: 80% !important;
                  }
                }
              `}
            </style>
            <div className="cardHeader">
              <iframe
                title="gen.wav newsletter signup"
                src="https://influanto.com/embed/newsletter/genwav"
                width="100%"
                height="520"
                frameBorder="0"
                style={{ border: "none", maxWidth: "100%" }}
              ></iframe>
            </div>
          </div>

          <Grid className="linksContainer" container spacing={3} style={{ maxWidth: "35%", margin: "1.5% auto 0", paddingBottom: "2%" }}>
            <Grid item xs={12} sm={12}>
              <div id="socials" style={{ paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="http://instagram.com/gen.wav" style={{ textDecoration: "none" }}>
                    <InstagramLogo style={{ color: 'purple' }} size={20}></InstagramLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="http://twitter.com/gendotwav" style={{ textDecoration: "none" }}>
                    <TwitterLogo style={{ color: '#A6CAF0' }} size={20}></TwitterLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="http://tiktok.com/gen.wav" style={{ textDecoration: "none" }}>
                    <TiktokLogo style={{ color: 'pink' }} size={20}></TiktokLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="https://soundcloud.com/genwav" style={{ textDecoration: "none" }}>
                    <SoundcloudLogo style={{ color: 'orange' }} size={20}></SoundcloudLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="https://www.youtube.com/@genwav" style={{ textDecoration: "none" }}>
                    <YoutubeLogo style={{ color: 'red' }} size={20}></YoutubeLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="https://open.spotify.com/artist/3YihJDU9YETUNDWO6pDuQG?si=VmY6439rRLS5mw8uC0nHYg" style={{ textDecoration: "none" }}>
                    <SpotifyLogo style={{ color: 'green' }} size={20}></SpotifyLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="https://music.apple.com/us/artist/genesis-barrios/1194186719" style={{ textDecoration: "none" }}>
                    <AppleLogo style={{ color: 'pink' }} size={20}></AppleLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="https://discord.com/invite/2MdNjbHnBR" style={{ textDecoration: "none" }}>
                    <DiscordLogo style={{ color: 'purple' }} size={20}></DiscordLogo>
                  </a>
                </div>
                <div style={{ display: "inline" }}>
                  <a target="_blank" href="https://patreon.com/genwav?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" style={{ textDecoration: "none" }}>
                    <PatreonLogo style={{ color: 'white' }} size={20}></PatreonLogo>
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NEWSLETTER;
