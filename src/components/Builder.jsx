import React from 'react';
import imageResolver from '../utils/image-resolver.js';

import BuilderItem from '../components/BuilderItem.jsx';
import Collapsable from '../components/Collapsable.jsx';

const Builder = ({
  realms,
  races,
  classes,
  talents,
  itemTypes,
}) => {

  /* All info has been loaded */
  const className = `Character Builder ${(
    !realms.isFetching && !realms.error && realms.collection.length > 0
    && !races.isFetching && !races.error && races.collection.length > 0
    && !classes.isFetching && !classes.error && classes.collection.length > 0
    && !talents.isFetching && !talents.error
  ) ? 'is-complete' : ''}`;

  return (
    <div className={className}>
      <div className="Builder-wrapper">
        <div className="Character-header is-loading">
          <img
            alt="App logo"
            className="Character-placeholder"
            src={imageResolver('../images/favicons/android-chrome-192x192.png')}
          />
          <p className="Character-name">Building the arena</p>
        </div>

        <Collapsable data={{}} disabled>
          <div className="Builder-info">
            <BuilderItem
              data={realms}
              label="Sending messages to all kingdoms"
              onError="Some kingdoms could not attend the call. Please, try again later."
            />
            <br />
            <BuilderItem
              data={races}
              label="Listing the races of all participants"
              onError="Some of the most powerful races could not participate on this arena. Please, try again later."
            />
            <br />
            <BuilderItem
              data={classes}
              label="Sending all classes to their class halls"
              onError="Some class halls are not in conditions to host their guests. Please, try again later."
            />
            <br />
            <BuilderItem
              data={talents}
              label="Teaching skills and rules to participants"
              onError="Some participants don't have neccessary skills to participate on this arena. Please, try again later."
            />
            <BuilderItem
              data={itemTypes}
              label="Gathering different weapons and armors"
              onError="Some armors are broken and it's not safe to fight with them. Please, try again later."
            />
          </div>
        </Collapsable>
      </div>
    </div>
  );
};

Builder.displayName = 'Builder';
export default Builder;