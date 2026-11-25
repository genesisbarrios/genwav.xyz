// App.js
// ExperienceWrapper (the old 3D homepage) isn't routed anymore; not imported so its code stays out of the bundle.
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Header component
import MetaPixel from './MetaPixel';
import Studio3D from './Studio3D';

// Every page except the studio homepage loads on demand
const GenWavOS = lazy(() => import("./OS"));
const EPK = lazy(() => import("./EPK"));
const GENESIS = lazy(() => import("./GENESIS"));
const DALEMAMI = lazy(() => import("./DALEMAMI"));
const HIKING = lazy(() => import("./HIKING"));
const LOSIGNORO = lazy(() => import("./LOSIGNORO"));
const RELEASES = lazy(() => import("./RELEASES"));
const TEXTINME = lazy(() => import("./3am"));
const PROBLEMAS = lazy(() => import("./PROBLEMAS"));
const LLAMAGEMELA = lazy(() => import("./LLAMAGEMELA"));
const ONEDAY = lazy(() => import("./oneday"));
const GAFAS = lazy(() => import("./GAFAS"));
const TRIPPIN = lazy(() => import("./TRIPPIN"));
const NEWSLETTER = lazy(() => import("./NEWSLETTER"));
const CURIOSO = lazy(() => import("./CURIOSO"));
const SOLYMAR = lazy(() => import("./SOLYMAR"));
const ORIGINAL = lazy(() => import("./ORIGINAL"));
const Twentyseven = lazy(() => import("./TwentySeven"));
const TwentyTwo = lazy(() => import("./TwentyTwo"));
const SINDESTINO = lazy(() => import("./SINDESTINO"));
const AFTERALL = lazy(() => import("./AFTERALL"));
const TURO = lazy(() => import("./TURO"));
const UP = lazy(() => import("./UP"));
const KEEPGRINDING = lazy(() => import("./KEEPGRINDING"));
const CACHUMBAMBE = lazy(() => import("./CACHUMBAMBE"));
const NMLQ = lazy(() => import("./NMLQ"));
const SOLTERO = lazy(() => import("./SOLTERO"));
const LAPLAYA = lazy(() => import("./LAPLAYA"));
const SMS = lazy(() => import("./SMS"));
const AGAIN = lazy(() => import("./AGAIN"));
const CAMBIE = lazy(() => import("./CAMBIE"));
const WORLD = lazy(() => import("./WORLD"));
const EmailTemplate = lazy(() => import("./EmailTemplate"));
const MATRIX = lazy(() => import("./MATRIX"));
const RUNAWAY = lazy(() => import("./RUNAWAY"));

// Public ID (it's visible in page source anyway), kept here so it doesn't depend on Vercel env vars
const META_PIXEL_ID = '1077030558456212';

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

  const SINDESTINOComponent = () => {
    return (
      <SINDESTINO />
    );
  };

  const AFTERALLComponent = () => {
    return (
      <AFTERALL />
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

  const UPComponent = () => {
    return (
      <UP></UP>
    )
  }

  const KEEPGRINDINGComponent = () => {
    return (
      <KEEPGRINDING></KEEPGRINDING>
    )
  }

  const CACHUMBAMBEComponent = () => {
    return (
      <CACHUMBAMBE></CACHUMBAMBE>
    )
  }

  const NMLQComponent = () => {
    return (
      <NMLQ></NMLQ>
    )
  }

  const SOLTEROComponent = () => {
    return (
      <SOLTERO></SOLTERO>
    )
  }

  const LAPLAYAComponent = () => {
    return (
      <LAPLAYA></LAPLAYA>
    )
  }

  const SMSComponent = () => {
    return (
      <SMS></SMS>
    )
  }

  const AGAINComponent = () => {
    return (
      <AGAIN></AGAIN>
    )
  }

  const CAMBIEComponent = () => {
    return (
      <CAMBIE></CAMBIE>
    )
  }

  const EmailTemplateComponent = () => { // Define component for /email-template route
    return (
      <EmailTemplate />
    );
  }

  const RUNAWAYComponent = () => {
    return (
      <RUNAWAY />
    );
  }

  const MATRIXComponent = () => {
    return (
      <MATRIX />
    );
  }

  const WORLDComponent = () => {
    return (
      <WORLD />
    );
  }

  const NEWSLETTERComponent = () => {
    return (
      <NEWSLETTER />
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
        {/* Pages other than the studio load on demand (React.lazy) */}
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0c0c0e" }} />}>
        <Routes>
          {/* <Route path="/" element={<><Header /><ExperienceWrapper /></>} /> */}
          <Route path="/" element={<><Header transparent hideMenu /><Studio3D /></>} />
          <Route path="/OS" element={<><Header /><GenWavOSComponent /><Footer /></>} />
          <Route path="/os2" element={<><Header transparent hideMenu /><Studio3D /></>} />
          <Route path="/RELEASES" element={<><Header /><RELEASESComponent/><Footer /></>} />
          <Route path="/SINDESTINO" element={<><Header /><SINDESTINOComponent  /><Footer /></>} />
          <Route path="/AFTERALL" element={<><Header /><AFTERALLComponent  /><Footer /></>} />
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
          <Route path="/UP" element={<><Header /><UPComponent  /><Footer /></>} />
          <Route path="/KEEPGRINDING" element={<><Header /><KEEPGRINDINGComponent  /><Footer /></>} />
          <Route path="/CACHUMBAMBE" element={<><Header /><CACHUMBAMBEComponent  /><Footer /></>} />
          <Route path="/NMLQ" element={<><Header /><NMLQComponent  /><Footer /></>} />
          <Route path="/SOLTERO" element={<><Header /><SOLTEROComponent  /><Footer /></>} />
          <Route path="/LAPLAYA" element={<><Header /><LAPLAYAComponent  /><Footer /></>} />
          <Route path="/SMS" element={<><Header /><SMSComponent  /><Footer /></>} />
          <Route path="/AGAIN" element={<><Header /><AGAINComponent  /><Footer /></>} />
          <Route path="/CAMBIE" element={<><Header /><CAMBIEComponent  /><Footer /></>} />
          <Route path="/syre" element={<><Header /><KEEPGRINDINGComponent  /><Footer /></>} />
          <Route path="/RUNAWAY" element={<><Header /><RUNAWAYComponent  /><Footer /></>} />
          <Route path="/MATRIX" element={<><Header /><MATRIXComponent  /><Footer /></>} />
          <Route path="/WORLD" element={<><Header /><WORLDComponent  /><Footer /></>} />
          <Route path="/EPK" element={<><Header /><EPKComponent /><Footer /></>} />
          <Route path="/newsletter" element={<><Header /><NEWSLETTERComponent /><Footer /></>} />
          <Route path="/SHOP" element={<ShopRedirect />} />
          <Route path="/emailtemplate" element={<><Header /><EmailTemplateComponent /><Footer /></>} /> 
        </Routes>
        </Suspense>
        
      </div>
    </BrowserRouter>
  );
};

export default App;
