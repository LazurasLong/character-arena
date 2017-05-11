import React from 'react';

import Icon from '../components/Icon.jsx';

const Share = ({ className }) => {
  return (
    <div className={`Share ${className}`}>
      {/* Facebook */}
      {/*<button
        className="Button Button--invisible Button--icon Share-button"
      >
        <Icon className="Button-icon Share-buttonIcon" icon="social-facebook" />
      </button>*/}

      {/* Twitter */}
      {/*<button
        className="Button Button--invisible Button--icon Share-button"
      >
        <Icon className="Button-icon Share-buttonIcon" icon="social-twitter" />
      </button>*/}

      {/* Whatsapp TODO: Not included on blizzard icons */}
      {/*<button
        className="Button Button--invisible Button--icon Share-button"
      >
        <Icon className="Button-icon Share-buttonIcon" icon="social-whatsapp" />
      </button>*/}

      {/* Share */}
      <button
        className="Button Button--invisible Button--icon Share-button"
      >
        <Icon className="Button-icon Share-buttonIcon" icon="external" />
      </button>
    </div>
  );
};

Share.displayName = 'Share';

export default Share;
