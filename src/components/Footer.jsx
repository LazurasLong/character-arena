import React from 'react';
import Spacer from '../components/Spacer.jsx';

const Footer = () => (
  <footer className="Footer">
    <Spacer />
    <div className="Footer-left">
      <img className="Footer-logo" />
    </div>
    <div className="Footer-right">
      <p>Some interesting links:</p>
      <ul className="Footer-links">
        <li className="Footer-link Link">PvE Leaderboards</li>
        <li className="Footer-link Link">PvP Leaderboards</li>
        <li className="Footer-link Link">WoW Progress</li>
        <li className="Footer-link Link">WoW Website Enhacer</li>
      </ul>
    </div>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;