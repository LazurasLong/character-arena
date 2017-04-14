import React from 'react';
import Spacer from '../components/Spacer.jsx';

import { WOWPROGRESS, LEADERBOARDS_PVE, LEADERBOARDS_PVP, WOW_WEB_ENHACER } from '../constants/app.js';

const Footer = ({ options: { region, language } }) => (
  <footer className="Footer">
    <Spacer />
    <div className="Footer-left">
      <img className="Footer-logo" />
    </div>
    <div className="Footer-right">
      <p>Some interesting links:</p>
      <ul className="Footer-links">
        <li className="Footer-link">
          <a 
            className="Link"
            target="_blank"
            rel="noopener noreferrer"
            href={
              LEADERBOARDS_PVE
              .replace(':region', region)
              .replace(':language', language)
            }
          >PvE Leaderboards</a>
        </li>
        <li className="Footer-link">
          <a 
            className="Link"
            target="_blank"
            rel="noopener noreferrer"
            href={
              LEADERBOARDS_PVP
              .replace(':region', region)
              .replace(':language', language)
            }
          >PvP Leaderboards</a>
        </li>
        <li className="Footer-link">
          <a 
            className="Link"
            target="_blank"
            rel="noopener noreferrer"
            href={WOWPROGRESS}
          >WoW Progress</a>
        </li>
        <li className="Footer-link">
          <a 
            className="Link"
            target="_blank"
            rel="noopener noreferrer"
            href={WOW_WEB_ENHACER}
          >WoW Website Enhacer</a>
        </li>
      </ul>
    </div>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;