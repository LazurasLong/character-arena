import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getCharacterRace,
  getCharacterClass,
  getAvailableTalents,
  getSlug,
  getCookie,
  setCookie
} from '../utils/calcs.js';

import { fetchCharacter, switchCharacter, removeCharacter } from '../actions/characters.js';
import { fetchRaces, fetchClasses, fetchRealms,fetchTalents } from '../actions/resources.js';

import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CharacterFinder from '../components/CharacterFinder.jsx';
import Character from '../components/Character.jsx';

class Comparator extends Component {
  static propTypes = {
    characters: PropTypes.shape({
      character: PropTypes.shape({
      }),
      rival: PropTypes.shape({
      }),
    }).isRequired,
    resources: PropTypes.shape({
      races: PropTypes.shape({
        collection: PropTypes.array,
        isFetching: PropTypes.bool,
      }),
      classes: PropTypes.shape({
        collection: PropTypes.array,
        isFetching: PropTypes.bool,
      }),
      realms: PropTypes.shape({
        collection: PropTypes.array,
        isFetching: PropTypes.bool,
      }),
    }).isRequired,
  };

  static displayName = 'Comparator';

  constructor(props) {
    super(props);

    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.handleSelectRegion = this.handleSelectRegion.bind(this);
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.handleToggleCollapsable = this.handleToggleCollapsable.bind(this);
    this.handleFetchCharacter = this.handleFetchCharacter.bind(this);
    this.handleSwitchCharacter = this.handleSwitchCharacter.bind(this);
    this.handleRemoveCharacter = this.handleRemoveCharacter.bind(this);

    this.state = {
      isSidebarOpen: false,
      options: {
        region: getCookie('region') || 'us',
        language: getCookie('language') || 'en',
      },
      sections: {
        filters: {
          isOpen: true,
          slug: 'filters',
        },
        itemLevel: {
          isOpen: false,
          slug: 'itemLevel',
          elements: ['averageItemLevel', 'averageItemLevelEquipped'],
        },
        attributes: {
          isOpen: true,
          slug: 'attributes',
          elements: ['str', 'agi', 'int', 'sta'],
        },
        enhacements: {
          isOpen: true,
          slug: 'enhacements',
          elements: ['crit', 'haste', 'mastery', 'versatility', 'mana5'],
        },
        deffense: {
          isOpen: false,
          slug: 'deffense',
          elements: ['armor', 'dodge', 'parry', 'block'],
        },
        talents: {
          isOpen: true,
          slug: 'talents',
        },
      },
    };
  }

  componentWillMount() {
    this.fetchInitialData();
  }

  fetchInitialData() {
    const {
      params,
      dispatch,
    } = this.props;

    const {
      options: {
        region,
        language,
      },
    } = this.state;

    const dataToFetch = [
      dispatch(fetchRaces({ region, language })),
      dispatch(fetchClasses({ region, language })),
      dispatch(fetchRealms({ region, language })),
      dispatch(fetchTalents({ region, language })),
    ];

    Promise.all(dataToFetch);
  }

  handleToggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  handleSelectRegion() {
    const {
      sidebar: {
        region,
      }
    } = this;

    setCookie({ name: 'region', value: region.value });

    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        region: region && region.value,
      },
    }, this.fetchInitialData);
  }

  handleSelectLanguage() {
    const {
      sidebar: {
        language,
      }
    } = this;

    setCookie({ name: 'language', value: language.value });

    this.setState({
      ...this.state,
      options: {
        ...this.state.options,
        language: language && language.value,
      },
    }, this.fetchInitialData);
  }

  handleToggleCollapsable({ element }) {
    const { props: { slug } } = element;

    /* Update general status */
    this.setState({
      ...this.state,
      sections: {
        ...this.state.sections,
        [slug]: {
          ...this.state.sections[slug],
          isOpen: !this.state.sections[slug].isOpen,
        },
      },
    });
  }

  handleFetchCharacter({ realm, characterName }) {
    const { dispatch } = this.props;
    const { options: { region, language } } = this.state;

    dispatch(fetchCharacter({ region, language, realm, characterName }));
  }

  handleSwitchCharacter({ character }) {
    const { dispatch } = this.props;

    dispatch(switchCharacter(character));
  }

  handleRemoveCharacter({ character }) {
    const { dispatch } = this.props;

    dispatch(removeCharacter(character));
  }

  render() {
    const {
      resources: {
        classes,
        races,
        realms,
        talents,
      },
      characters,
    } = this.props;

    const {
      isSidebarOpen,
      options,
      sections,
    } = this.state;

    const isServiceUnavailable = (classes.error || races.error || realms.error || talents.error);

    return (
      <div className="App">

        {/* App Header */}
        <Header handleToggleSidebar={this.handleToggleSidebar} />
        
        {/* App Sidebar */}
        <Sidebar
          options={options}
          sections={sections}
          isOpen={isSidebarOpen}
          handleToggleSidebar={this.handleToggleSidebar}
          handleSelectRegion={this.handleSelectRegion}
          handleSelectLanguage={this.handleSelectLanguage}
          options={options}
          ref={(ref) => { this.sidebar = ref; }}
          handleToggleCollapsable={this.handleToggleCollapsable}
        />

        {/* App content */}
        <div className="Comparator">
          {/* There is an error fetching base data */}
          {isServiceUnavailable &&
            <p>Service unavailable</p>
          }

          {/* No errors */}
          {!isServiceUnavailable &&
            <div className="Comparator-wrapper" style={{width: (((characters.collection.length + 1) * (300 + 10)) + 5)}}>
              {/* Fetched Characters */}
              {characters.collection.map((character, index) => {

                // Get character data
                const selectedCharacter = {...character};
                selectedCharacter.race = getCharacterRace({ raceId: selectedCharacter.race, races: races.collection });
                selectedCharacter.class = getCharacterClass({ classId: selectedCharacter.class, classes: classes.collection });
                selectedCharacter.availableTalents = getAvailableTalents({ classId: selectedCharacter.class.id || selectedCharacter.class, talents: talents.collection });

                /* ComparedTo data */
                let comparedTo;

                /* If this is not first character */
                if (index !== 0) {

                  // Set the comparedTo character
                  comparedTo = {...characters.collection[0]};
                  comparedTo.race = getCharacterRace({ raceId: comparedTo.race, races: races.collection });
                  comparedTo.class = getCharacterClass({ classId: comparedTo.class, classes: classes.collection });
                  comparedTo.availableTalents = getAvailableTalents({ classId: comparedTo.class.id || comparedTo.class, talents: talents.collection });
                }

                return (
                  <Character
                    key={`character-${index}`}
                    sections={sections}
                    handleToggleCollapsable={this.handleToggleCollapsable}
                    handleSwitchCharacter={this.handleSwitchCharacter}
                    handleRemoveCharacter={this.handleRemoveCharacter}

                    character={selectedCharacter}

                    comparedTo={comparedTo}
                    ref={(ref) => { this[`characterFrame${index}`] = ref; }}
                  />
                );
              })}

              {/* New character */}
              <CharacterFinder
                collapsableData={sections.filters}
                reference={(ref) => { this.filters = ref; }}
                availableRealms={realms.collection}
                handleToggleCollapsable={this.handleToggleCollapsable}
                handleFetchCharacter={this.handleFetchCharacter}
              />
            </div>
          }
        </div>

        {/* App footer */}
        <Footer options={options}/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    characters: state.characters,
    resources: state.resources,
  };
};

export default connect(
  mapStateToProps
)(Comparator);
