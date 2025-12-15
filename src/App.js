// App.js
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ExperienceWrapper from "./ExperienceWrapper";
import GenWavOS from "./OS";
import EPK from "./EPK";
import GENESIS from "./GENESIS";
import DALEMAMI from "./DALEMAMI";
import HIKING from "./HIKING";
import Header from "./Header"; // Import Header component
import LOSIGNORO from "./LOSIGNORO";
import RELEASES from './RELEASES';
import TEXTINME from './3am';
import PROBLEMAS from './PROBLEMAS';
import LLAMAGEMELA from './LLAMAGEMELA';
import ONEDAY from './oneday';
import GAFAS from './GAFAS';
import TRIPPIN from './TRIPPIN';
import Footer from "./Footer"; // Import Header component
import CURIOSO from './CURIOSO';
import SOLYMAR from './SOLYMAR';
import ORIGINAL from './ORIGINAL';
import Twentyseven from './TwentySeven';
import TwentyTwo from './TwentyTwo';
import TURO from './TURO';
import MetaPixel from './MetaPixel';
import EmailTemplate from './EmailTemplate'; // Import the EmailTemplate component
const META_PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID; 

const App = () => {
  const GenWavOSComponent = () => {
    return (
      <GenWavOS />
    );
  };

  const EPKComponent = () => {
    return (
      <EPK />
    );
  };

  const GENESISComponent = () => {
    return (
      <GENESIS />
    );
  };

  const DALEMAMIComponent = () => {
    return (
      <DALEMAMI />
    );
  };

  const HIKINGComponent = () => {
    return (
      <HIKING />
    );
  };

  const LOSIGNOROComponent = () => {
    return (
      <LOSIGNORO />
    );
  };

  const RELEASESComponent = () => {
    return (
      <RELEASES />
    );
  };

  const TEXTINMEComponent = () => {
    return (
      <TEXTINME />
    );
  };

  const PROBLEMASComponent = () => {
    return (
      <PROBLEMAS />
    );
  };

  const LLAMAGEMELAComponent = () => {
    return (
      <LLAMAGEMELA />
    );
  };

  const OneDayComponent = () => {
    return (
      <ONEDAY />
    );
  };

  const GAFASComponent = () => {
    return (
      <GAFAS />
    );
  }

  const TRIPPINComponent = () => {
    return (
      <TRIPPIN />
    );
  }

  const CURIOSOComponent = () => {
    return (
      <CURIOSO />
    );
  }

  const SOLYMARComponent = () => {
    return (
      <SOLYMAR />
    );
  }

  const ORIGINALComponent = () => {
    return (
      <ORIGINAL />
    );
  }

  const TwentySevenComponent = () => {
    return (
      <Twentyseven></Twentyseven>
    )
  }

  const TwentyTwoComponent = () => {
    return (
      <TwentyTwo></TwentyTwo>
    )
  }

  const TUROComponent = () => {
    return (
      <TURO></TURO>
    )
  } 

  const EmailTemplateComponent = () => { // Define component for /email-template route
    return (
      <EmailTemplate />
    );
  }

  const ShopRedirect = () => { // Define component for /SHOP route
    window.location.href = "https://enigma-labs.printify.me/products"; // Redirect to external URL
    return null; // Since we're redirecting, return null
  };
  
  
  return (
    <BrowserRouter>
      <div>
        <MetaPixel pixelId={META_PIXEL_ID} />
        {/* Include Header + Footer component */}
        <Routes>
          {/* <Route path="/" element={<><Header /><ExperienceWrapper /></>} /> */}
          <Route path="/" element={<><Header /><GenWavOSComponent /><Footer /></>} />
          <Route path="/OS" element={<><Header /><GenWavOSComponent /><Footer /></>} />
          <Route path="/RELEASES" element={<><Header /><RELEASESComponent/><Footer /></>} />
          <Route path="/LOSIGNORO" element={<><Header /><LOSIGNOROComponent  /><Footer /></>} />
          <Route path="/3am" element={<><Header /><TEXTINMEComponent  /><Footer /></>} />
          <Route path="/HIKING" element={<><Header /><HIKINGComponent /><Footer /></>} />
          <Route path="/GENESIS" element={<><Header /><GENESISComponent /><Footer /></>} />
          <Route path="/DALEMAMI" element={<><Header /><DALEMAMIComponent  /><Footer /></>} />
          <Route path="/PROBLEMAS" element={<><Header /><PROBLEMASComponent  /><Footer /></>} />
          <Route path="/LLAMAGEMELA" element={<><Header /><LLAMAGEMELAComponent  /><Footer /></>} />
          <Route path="/oneday" element={<><Header /><OneDayComponent  /><Footer /></>} />
          <Route path="/GAFAS" element={<><Header /><GAFASComponent  /><Footer /></>} />
          <Route path="/trippin" element={<><Header /><TRIPPINComponent  /><Footer /></>} />
          <Route path="/CURIOSO" element={<><Header /><CURIOSOComponent  /><Footer /></>} />
          <Route path="/SOLYMAR" element={<><Header /><SOLYMARComponent  /><Footer /></>} />
          <Route path="/ORIGINAL" element={<><Header /><ORIGINALComponent  /><Footer /></>} />
          <Route path="/27" element={<><Header /><TwentySevenComponent  /><Footer /></>} />
          <Route path="/22" element={<><Header /><TwentyTwoComponent  /><Footer /></>} />
          <Route path="/TURO" element={<><Header /><TUROComponent  /><Footer /></>} />
          <Route path="/EPK" element={<><Header /><EPKComponent /><Footer /></>} />
          <Route path="/SHOP" element={<ShopRedirect />} />
          <Route path="/emailtemplate" element={<><Header /><EmailTemplateComponent /><Footer /></>} /> 
        </Routes>
        
      </div>
    </BrowserRouter>
  );
};

export default App;
