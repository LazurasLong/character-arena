import React, { PropTypes } from 'react';

import CharacterTalentsIcon from '../components/CharacterTalentsIcon.jsx';

const CharacterTalents = ({
  spec,
  availableTalents,
  usedTalents,
  comparedTo,
}) => {
  if (!spec.name) {
    return <div>No spec</div>;
  }

  const shouldCompare = (comparedTo && comparedTo.spec.backgroundImage === usedTalents.spec.backgroundImage);

  // Parse class talents
  const talentsGrid = [];
  availableTalents.talents.forEach(tier => {

    // For each tier (row), go through each column
    const availableTier = [];

    // For each column
    tier.forEach(column => {
      const suitableTalents = [];

      // Each column have different options
      column.forEach(talent => {

        // If current option has no spec, or spec is equal to current spec
        if (!talent.spec || talent.spec.backgroundImage === spec.backgroundImage) {

          // Add it to suitableTalents
          suitableTalents.push(talent);
        }
      });

      // Once we checked all suitableTalents, choose the best one
      // If there is only 1 suitableTalents, use it
      if (suitableTalents.length === 1) {
        const talent = suitableTalents[0];
        availableTier[talent.column] = talent;

      // If there are several suitableTalents, use the one with a spec defined
      } else {
        const talent = suitableTalents.find(tal => tal.spec);
        availableTier[talent.column] = talent;
      }
    });
    talentsGrid.push(availableTier);
  });


  // Parse used talents
  for (let x in usedTalents.talents) {
    const talent = usedTalents.talents[x];
    talentsGrid[talent.tier][talent.column] = {
      ...talentsGrid[talent.tier][talent.column],
      isUsed: true,
      isActive: shouldCompare,
    };
  }

  // Parse used talents
  if (comparedTo && shouldCompare) {
    for (let x in comparedTo.talents) {
      const talent = comparedTo.talents[x];
      talentsGrid[talent.tier][talent.column] = {
        ...talentsGrid[talent.tier][talent.column],
        isRival: shouldCompare,
      };
    }
  }

  return (
    <div className="CharacterTalents">
      {talentsGrid.map((tier, index) => (
        <div className="CharacterTalents-tier" key={`tier-${index}`}>
          {tier.map((talent, index2) => (
            <div
              className={` CharacterTalents-column ${
                talent.isUsed ? 'is-used' : ''
              } ${
                talent.isActive ? 'is-active' : ''
              } ${
                talent.isRival ? 'is-rival' : ''
              }`}
              key={`tier-${index}-${index2}`}
            >
              <CharacterTalentsIcon icon={talent.spell.icon} description={`"${talent.spell.name}": ${talent.spell.description}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

CharacterTalents.propTypes = {
  availableTalents: PropTypes.object.isRequired,
  usedTalents: PropTypes.object.isRequired,
  comparedTo: PropTypes.object,
};
CharacterTalents.displayName = 'CharacterTalents';

export default CharacterTalents;