// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "./Header.css";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" style={{backgroundColor:"black"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src="https://dl.dropboxusercontent.com/s/e0in5yu3gqiidw7se0bte/wave-animation.gif?rlkey=s7dv6t1fyvoh17nn05m33wy7x&dl=0" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Link>
        </Typography>
        <nav style={{fontSize:"0.9rem"}}>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
           <li style={{ marginRight: '10px'}}><Link style={{color:"white", textDecoration:"none" }}  to="/OS">OS</Link></li>
            <li style={{ marginRight: '10px'}}><Link style={{color:"white", textDecoration:"none" }}  to="/SOLYMAR">SOLYMAR</Link></li>
          <li style={{ marginRight: '10px'}}><Link style={{color:"white", textDecoration:"none" }}  to="/GENESIS">GENESIS</Link></li>
          <li style={{ marginRight: '10px'}}><Link style={{color:"white", textDecoration:"none" }} to="/RELEASES">RELEASES</Link></li>
          <li style={{ marginRight: '10px'}}><Link style={{color:"white", textDecoration:"none" }} to="/EPK">EPK</Link></li>
          <li style={{ marginRight: '10px'}}><Link style={{color:"white", textDecoration:"none" }}  to="/SHOP">SHOP</Link></li>
           
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
