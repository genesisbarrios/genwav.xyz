
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
import {Card, CardMedia, CardActionArea, CardContent, Typography, div, Paper} from "@material-ui/core";
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

// export const metadata { 
//   title: 'DALE MAMI',
//   description: 'DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//   openGraph: {
//     title: 'DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//     description: 'DALE MAMI - KHR!S Joao, gen.wav, Nick Garcia, El Igor',
//     images: ['DALE-MAMI-COVER-ARTWORK.jpg'], // Path to your image
//   },
// };

const RELEASES = (props) => {
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
    
  }, );

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
    <div id="NEW">
      <div class="wrapper">
          <MetaTags>
            <title>Music by gen.wav</title>
            <meta id="meta-description" name="description" content="Music by gen.wav" />
            <meta id="og-title" property="og:title" content="Music by gen.wav" />
            <meta id="og-image" property="og:image" content="https://genwav.xyz/logo.png" />
          </MetaTags>
        </div>
    <div style={{ textAlign: "center" }}>
      <div id="NEWImageDiv">
       <h3>RELEASES</h3>
      </div>

      <Grid className="linksContainer" container spacing={3} style={{maxWidth: "35%", margin:"0 auto", paddingTop:"2%", paddingBottom:"1%"}}>
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
    
      <Grid className="linksContainer" container spacing={3} style={{maxWidth: "35%", margin:"0 auto", paddingTop:"2%", paddingBottom:"5%"}}>
        <Grid item xs={12} sm={12}>
          <div style={{ display: "inline" }}>
            {/* Add your next card here */}

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/27">
                <CardMedia
                  component="img"
                  alt="27 Artwork"
                  height="250"
                  image="https://genwav.xyz/27art.png"
                  title="27"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  27 - gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            
            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/ORIGINAL">
                <CardMedia
                  component="img"
                  alt="Original Artwork"
                  height="250"
                  image="https://genwav.xyz/ORIGINAL.jpeg"
                  title="ORIGINAL"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  ORIGINAL - Kiento. O, gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>


             <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/SOLYMAR">
                <CardMedia
                  component="img"
                  alt="SOLYMAR ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/SOLYMAR.jpg"
                  title="SOLYMAR"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  SolyMar - gen.wav, KHR!S Joao
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

             <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/CURIOSO">
                <CardMedia
                  component="img"
                  alt="CURIOSO ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/CURIOSO.jpg"
                  title="CURIOSO"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  CURIOSO - gen.wav, KHR!S Joao
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/TRIPPIN">
                <CardMedia
                  component="img"
                  alt="TRIPPIN ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/TRIPPIN.JPG"
                  title="TRIPPIN"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  TRIPPIN - SRI, gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/GAFAS">
                <CardMedia
                  component="img"
                  alt="GAFAS ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/GAFAS.png"
                  title="GAFAS"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  GAFAS - KHR!S Joao, gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/oneday">
                <CardMedia
                  component="img"
                  alt="Pay Off One Day ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/ONEDAY.png"
                  title="Pay Off One Day"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  Pay Off One Day - KHR!S Joao, gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/LLAMAGEMELA">
                <CardMedia
                  component="img"
                  alt="LLAMA GEMELA ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/llamagemela.png"
                  title="LLAMA GEMELA"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  Llama Gemela - KHR!S Joao, gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/PROBLEMAS">
                <CardMedia
                  component="img"
                  alt="PROBLEMAS ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/PROBLEMAS.png"
                  title="PROBLEMAS"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  Problemas - Jo Merino, KHR!S Joao, gen.wav, Dani Mako
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/3am">
                <CardMedia
                  component="img"
                  alt="TEXTIN ME ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/TEXTINMECOVER.jpg"
                  title="TEXTIN ME"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    Textin' Me - gen.wav x KHR!S João
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/LOSIGNORO">
                <CardMedia
                  component="img"
                  alt="LOS IGNORO ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/LOSIGNOROCOVER.jpg"
                  title="LOS IGNORO"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    Los Ignoro - gen.wav x KHR!S João
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/HIKING">
                <CardMedia
                  component="img"
                  alt="HIKING ALBUM ART"
                  height="250"
                  image="https://dl.dropboxusercontent.com/s/5mk5qbo4su7b69y3m3wyg/HIKING.png?rlkey=60ohqe8ivpuvzro66xrlfyc6u&st=yhv64yog&dl=0"
                  title="HIKING"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    Hiking Por Mi Mente - Kiento. O x gen.wav 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/DALEMAMI">
                <CardMedia
                  component="img"
                  alt="DALE MAMI ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/DALE-MAMI-COVER-ARTWORK.jpg"
                  title="DALE MAMI"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    DALE MAMI - KHR!S João, gen.wav, Nick Garcia, El Igor
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://ffm.to/rko8r4l">
                <CardMedia
                  component="img"
                  alt="After All ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/AFTERALLART.png"
                  title="After All"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    After All - GrimeGrrrl, gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://genwav.xyz/GENESIS">
                <CardMedia
                  component="img"
                  alt="GENESIS ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/GEN_COVER_2500.png"
                  title="GENESIS"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    GENESIS - gen.wav's Debut Album featuring various Artists
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://ffm.to/sindestino">
                <CardMedia
                  component="img"
                  alt="Sin Destino ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/sindestinoart.png"
                  title="Sin Destino"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    Sin Destino - KHR!S João x gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://ffm.to/ynet">
                <CardMedia
                  component="img"
                  alt="Ya no estoy triste :) ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/YNETCOVER.png"
                  title="Ya no estoy triste :)"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                  Ya no estoy triste :) - Alex Paul x gen.wav
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={{marginBottom:"2%"}}>
              <CardActionArea href="https://Venice.lnk.to/todavia">
                <CardMedia
                  component="img"
                  alt="TODAVIA ALBUM ART"
                  height="250"
                  image="https://genwav.xyz/TODAVIAART.jpg"
                  title="TODAVIA"
                />
                <CardContent style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Typography variant="h6" component="h6">
                    TODAVIA - gen.wav x Kiento. O
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </div>
        </Grid>
      </Grid>
    </div>

      
      </div>
    );
        
};

export default RELEASES;
