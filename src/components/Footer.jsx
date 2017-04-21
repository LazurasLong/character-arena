import React from 'react';
import { fillUrlData } from '../utils/calcs.js';

import Spacer from '../components/Spacer.jsx';

import {
  TITLE,
  SITE_URL,
  REPO_URL,
  IMPERDIBLESOFT,
  WOWPROGRESS,
  LEADERBOARDS_PVE,
  LEADERBOARDS_PVP,
  WOW_WEB_ENHACER,
} from '../constants/app.js';

const Footer = ({ options: { region, language } }) => (
  <footer className="Footer">
    <div className="Footer-left">
        <p>Created by <a
          className="Link"
          target="_blank"
          rel="noopener noreferrer"
          href={IMPERDIBLESOFT}
        >
          ImperdibleSoft
        </a></p>
        <p>Help us on <a
          className="Link"
          target="_blank"
          rel="noopener noreferrer"
          href={REPO_URL}
        >
          Github
        </a></p>
    </div>
    <div className="Footer-right">
      <p>Some interesting links:</p>
      <ul className="Footer-links">
        <li className="Footer-link">
          <a
            className="Link"
            target="_blank"
            rel="noopener noreferrer"
            href={fillUrlData({
              url: LEADERBOARDS_PVE,
              region: region,
              language: language,
            })}
          >PvE Leaderboards</a>
        </li>
        <li className="Footer-link">
          <a
            className="Link"
            target="_blank"
            rel="noopener noreferrer"
            href={fillUrlData({
              url: LEADERBOARDS_PVP,
              region: region,
              language: language,
            })}
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
