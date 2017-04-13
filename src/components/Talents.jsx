import React, { PropTypes } from 'react';

import TalentIcon from '../components/TalentIcon.jsx';

const Talents = ({
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

    const availableTier = [];
    tier.forEach(column => {
      column.forEach(talent => {
        if (!talent.spec || talent.spec.backgroundImage === spec.backgroundImage) {
          const index = availableTier.findIndex(tal => tal.column === talent.column);
          if (index < 0) {
            availableTier[talent.column] = talent;
          }
        }
      });
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
    <div className="Talents">
      {talentsGrid.map((tier, index) => (
        <div className="Talents-tier" key={`tier-${index}`}>
          {tier.map((talent, index2) => (
            <div
              className={` Talents-column ${
                talent.isUsed ? 'is-used' : ''
              } ${
                talent.isActive ? 'is-active' : ''
              } ${
                talent.isRival ? 'is-rival' : ''
              }`}
              key={`tier-${index}-${index2}`}
            >
              <TalentIcon icon={talent.spell.icon} description={`"${talent.spell.name}": ${talent.spell.description}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Talents.propTypes = {
  availableTalents: PropTypes.object.isRequired,
  usedTalents: PropTypes.object.isRequired,
  comparedTo: PropTypes.object,
};
Talents.displayName = 'Talents';

export default Talents;