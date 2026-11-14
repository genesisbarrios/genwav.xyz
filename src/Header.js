// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./Header.css";

// Neon blue menu everywhere (same blue as the homepage foam and speakers).
// `transparent`: the bar floats over the page instead of sitting on black (3D homepage)
const linkStyle = {
  color: "#4fe3ff",
  textDecoration: "none",
  fontWeight: 600,
  textShadow: "0 0 4px #4fe3ff, 0 0 10px #4fe3ff, 0 0 22px rgba(79,227,255,.8), 0 0 2px #00303a",
};

// `hideMenu`: logo only (the 3D homepage)
const Header = ({ transparent = false, hideMenu = false }) => {
  return (
    <AppBar
      position={transparent ? "absolute" : "static"}
      color="transparent"
      elevation={transparent ? 0 : 4}
      style={{ backgroundColor: transparent ? "transparent" : "black", ...(transparent ? { top: 0, left: 0, right: 0, zIndex: 10 } : {}) }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/OS">
            <img src="https://dl.dropboxusercontent.com/s/e0in5yu3gqiidw7se0bte/wave-animation.gif?rlkey=s7dv6t1fyvoh17nn05m33wy7x&dl=0" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Link>
        </Typography>
        {!hideMenu && <nav style={{fontSize:"0.9rem"}}>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
          <li style={{ marginRight: '10px'}}><Link className="nav-link" style={linkStyle} to="/GENESIS">GENESIS</Link></li>
          <li style={{ marginRight: '10px'}}><Link className="nav-link" style={linkStyle} to="/RELEASES">RELEASES</Link></li>
          <li style={{ marginRight: '10px'}}><Link className="nav-link" style={linkStyle} to="/SHOP">SHOP</Link></li>
          <li style={{ marginRight: '10px'}}><Link className="nav-link" style={linkStyle} to="/EPK">EPK</Link></li>
          {/* <li style={{ marginRight: '10px'}}><Link className="nav-link" style={linkStyle} to="/newsletter">NEWSLETTER</Link></li> */}
          </ul>
        </nav>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
