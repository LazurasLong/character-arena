import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getCharacterRace,
  getCharacterClass,
  getAvailableTalents,
  composePathname,
  getSlug,
  getCookie,
  setCookie
} from '../utils/calcs.js';

import { REGIONS } from '../constants/app.js';
import { HOME } from '../constants/appRoutes.js';

import { fetchCharacter, switchCharacter, removeCharacter } from '../actions/characters.js';
import { fetchRaces, fetchClasses, fetchRealms,fetchTalents } from '../actions/resources.js';

import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Builder from '../components/Builder.jsx';
import Footer from '../components/Footer.jsx';
import Character from '../components/Character.jsx';
import CharacterFinder from '../components/CharacterFinder.jsx';

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

  static contextTypes = {
    router: PropTypes.object.isRequired,
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
    this.handleDataChange = this.handleDataChange.bind(this);

    const {
      params,
    } = this.props;

    const regionIndex = REGIONS.findIndex(reg => reg.slug === params.region);
    const region = (regionIndex >= 0)
      ? params.region
      : getCookie('region') || 'us';

    const languageIndex = (regionIndex >= 0)
      ? REGIONS[regionIndex].languages.findIndex(lan => lan.slug === params.language)
      : undefined;
    const language = (languageIndex >= 0)
      ? params.language
      : getCookie('language') || 'en';

    this.state = {
      isSidebarOpen: false,
      options: {
        region: region,
        language: language,
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
    const {
      params,
    } = this.props;

    if ((!params.region || !params.language) && !params.characters) {
      const {
        options: {
          region,
          language,
        },
      } = this.state;

      this.context.router.push(composePathname({ region, language }));
    }

    this.fetchInitialData();
  }

  fetchInitialData() {
    const {
      dispatch,
    } = this.props;

    const {
      options: {
        region,
        language,
      },
    } = this.state;

    const dataToFetch = [];
    dataToFetch.push(dispatch(fetchRaces({ region, language })));
    dataToFetch.push(dispatch(fetchClasses({ region, language })));
    dataToFetch.push(dispatch(fetchTalents({ region, language })));
    dataToFetch.push(dispatch(fetchRealms({ region, language })));

    // Get basic data
    Promise.all(dataToFetch)
      .then(() => {
        const {
          params: { characters },
        } = this.props;

        // If there are characters on the URL
        if (characters) {

          const charactersData = [];

          // Go through each character
          characters.split(',').forEach(char => {
            const data = char.split('-');
            if (data && data[0] && data[1]) {

              const character = {
                region,
                language,
                realm: char.split('-')[0],
                characterName: char.split('-')[1],
              };

              // Add it to 'data that needs to be fetched'
              charactersData.push(dispatch(fetchCharacter(character)));
            }
          });

          Promise.all(charactersData);
        }
      })
      .catch((errors) => { console.log(errors); });
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
    }, () => {
      this.handleDataChange();
      this.fetchInitialData();
    });
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
    }, () => {
      this.handleDataChange();
      this.fetchInitialData();
    });
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

    Promise.all([dispatch(fetchCharacter({ region, language, realm, characterName }))])
      .then(this.handleDataChange);
  }

  handleSwitchCharacter({ character }) {
    const { dispatch } = this.props;

    Promise.all([dispatch(switchCharacter(character))])
      .then(this.handleDataChange);
  }

  handleRemoveCharacter({ character }) {
    const { dispatch } = this.props;

    Promise.all([dispatch(removeCharacter(character))])
      .then(this.handleDataChange);
  }

  handleDataChange() {
    const { characters: { collection }, location } = this.props;
    const { options: { region, language } } = this.state;

    this.context.router.push(composePathname({ region, language, collection }));
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

        {/* App builder */}
        <Builder
          realms={realms}
          races={races}
          classes={classes}
          talents={talents}
        />

        {/* App content */}
        <div className="Comparator">
          <div className="Comparator-wrapper" style={{width: (((characters.collection.length + 1) * (300 + 10)) + 5)}}>
            {/* Fetched Characters */}
            {characters.collection.map((character, index) => {

              // Get character data
              const selectedCharacter = {...character};
              let comparedTo;
              if (!selectedCharacter.isFetching && !selectedCharacter.error) {
                selectedCharacter.race = getCharacterRace({
                  raceId: selectedCharacter.race,
                  races: races.collection
                });
                selectedCharacter.class = getCharacterClass({
                  classId: selectedCharacter.class,
                  classes: classes.collection
                });
                selectedCharacter.availableTalents = getAvailableTalents({
                  classId: selectedCharacter.class && selectedCharacter.class.id
                    ? selectedCharacter.class.id
                    : selectedCharacter.class,
                  talents: talents.collection
                });

                /* ComparedTo data */
                /* If this is not first character */
                if (index !== 0 && characters.collection[0] && !characters.collection[0].isFetching) {

                  // Set the comparedTo character
                  comparedTo = {...characters.collection[0]};
                  comparedTo.race = getCharacterRace({ raceId: comparedTo.race, races: races.collection });
                  comparedTo.class = getCharacterClass({ classId: comparedTo.class, classes: classes.collection });
                  comparedTo.availableTalents = getAvailableTalents({ classId: comparedTo.class.id || comparedTo.class, talents: talents.collection });
                }
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
              error={characters.error}
            />
          </div>
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
