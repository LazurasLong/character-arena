import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactSidebar from 'react-sidebar';
import imageResolver from '../utils/image-resolver.js';
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
import CharacterFinder from '../components/CharacterFinder.jsx';
import Character from '../components/Character.jsx';
import Footer from '../components/Footer.jsx';

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

  static fetchData(dispatch, params = {}) {
    const {
      region,
      language,
    } = params;

    const resourcesData = [];
    resourcesData.push(dispatch(fetchRaces({ region, language })));
    resourcesData.push(dispatch(fetchClasses({ region, language })));
    resourcesData.push(dispatch(fetchTalents({ region, language })));
    resourcesData.push(dispatch(fetchRealms({ region, language })));

    // Get basic data
    return Promise.all(resourcesData)
      .then((response) => {
        const {
          characters
        } = params;

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

          return Promise.all(charactersData)
            .then(() => Promise.resolve())
            .catch(errors => Promise.reject(errors));
        }
      })
      .catch(errors => Promise.reject(errors));
  }

  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.handleSelectRegion = this.handleSelectRegion.bind(this);
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.handleToggleCollapsable = this.handleToggleCollapsable.bind(this);
    this.handleFetchCharacter = this.handleFetchCharacter.bind(this);
    this.handleSwitchCharacter = this.handleSwitchCharacter.bind(this);
    this.handleRefreshCharacter = this.handleRefreshCharacter.bind(this);
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
      swipe: {
        start: false,
        current: false,
      },
      options: {
        region: region,
        language: language,
      },
      sections: {
        filters: {
          isOpen: true,
          slug: 'filters',
          title: 'New character',
        },
        attributes: {
          isOpen: true,
          slug: 'attributes',
          title: 'Attributes',
          elements: [
            {name: 'Item Level', slug: 'averageItemLevelEquipped'},
            {name: 'Health', slug: 'health'},
            {name: 'Energy', slug: 'energy', isPower: true},
            {name: 'Focus', slug: 'focus', isPower: true},
            {name: 'Fury', slug: 'fury', isPower: true},
            {name: 'Insanity', slug: 'insanity', isPower: true},
            {name: 'Maelstrom', slug: 'maelstrom', isPower: true},
            {name: 'Mana', slug: 'mana', isPower: true},
            {name: 'Pain', slug: 'pain', isPower: true},
            {name: 'Rage', slug: 'rage', isPower: true},
            {name: 'Runic Power', slug: 'runic-power', isPower: true},
          ],
        },
        stats: {
          isOpen: true,
          slug: 'stats',
          title: 'Stats',
          elements: [
            {name: 'Strength', slug: 'str', isSpecBased: true},
            {name: 'Agility', slug: 'agi', isSpecBased: true},
            {name: 'Intelect', slug: 'int', isSpecBased: true},
            {name: 'Stamina', slug: 'sta'},
          ],
        },
        enhacements: {
          isOpen: true,
          slug: 'enhacements',
          title: 'Enhacements',
          elements: [
            {name: 'Critical', slug: 'crit'},
            {name: 'Haste', slug: 'haste'},
            {name: 'Mastery', slug: 'mastery'},
            {name: 'Versatility', slug: 'versatility'},
          ],
        },
        talents: {
          isOpen: true,
          slug: 'talents',
          title: 'Talents',
        },
      },
    };
  }

  componentWillMount() {
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

    if ((!params.region || !params.language) && !params.characters) {
      const {
        options: {
          region,
          language,
        },
      } = this.state;

      this.context.router.push(composePathname({ region, language }));
    }

    Comparator.fetchData(dispatch, params);
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
    });
  }

  handleToggleCollapsable({ element }) {
    const { props: { data: { slug } } } = element;

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

    const characterTrimmed = characterName
      .replace(/\ /g, '');

    if (
      realm && realm !== '' && realm !== ' ' &&
      characterName && characterName !== '' && characterName !== ' '
    ) {
      Promise.all([dispatch(fetchCharacter({ region, language, realm, characterName: characterTrimmed }))])
        .then(this.handleDataChange);
    }
  }

  handleSwitchCharacter({ character }) {
    const { dispatch } = this.props;

    Promise.all([dispatch(switchCharacter(character))])
      .then(this.handleDataChange);
  }

  handleRefreshCharacter({ character }) {
    const { dispatch } = this.props;
    const { options: { region, language } } = this.state;

    dispatch(fetchCharacter({
      region,
      language,
      realm: character.realm,
      characterName: character.name,
    }, true));
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
    // this.fetchData(dispatch, {
    //   ...params,
    //   region,
    //   language,
    // });
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

    const isServiceLoading = (classes.isFetching || !classes.collection.length || races.isFetching || !races.collection.length || realms.isFetching || !realms.collection.length || talents.isFetching)
      ? true
      : false;
    const isServiceUnavailable = (classes.error || races.error || realms.error || talents.error)
      ? true
      : false;

    let dataFailing;
    if (isServiceUnavailable) {
      if (classes.error) {
        dataFailing = classes;
      } else if (races.error) {
        dataFailing = races;
      } else if (realms.error) {
        dataFailing = realms;
      } else if (talents.error) {
        dataFailing = talents;
      }
    }

    {/* App Sidebar */}
    const SidebarContent = <Sidebar
      options={options}
      sections={sections}
      isOpen={isSidebarOpen}
      handleToggleSidebar={this.handleToggleSidebar}
      handleSelectRegion={this.handleSelectRegion}
      handleSelectLanguage={this.handleSelectLanguage}
      options={options}
      ref={(ref) => { this.sidebar = ref; }}
      handleToggleCollapsable={this.handleToggleCollapsable}
    />;

    return (
      <ReactSidebar
        className="App"
        sidebar={SidebarContent}
        open={this.state.isSidebarOpen}
        onSetOpen={this.handleToggleSidebar}
        styles={{
          sidebar: {zIndex: 200},
        }}
      >
        <div className="App">
          {/* App Header */}
          <Header handleToggleSidebar={this.handleToggleSidebar} />

          {/* App content */}
          <div className="Comparator">
            <div className="Comparator-wrapper" style={{width: (((characters.collection.length + 1) * (300 + 20)) + 5)}}>
              {/* App builder */}

              {(isServiceLoading || isServiceUnavailable) &&
                <Builder
                  realms={realms}
                  races={races}
                  classes={classes}
                  talents={talents}
                />
              }

              {/* Comparator */}
              {(!isServiceLoading && !isServiceUnavailable) &&
                <div>
                  {/* New character */}
                  <CharacterFinder
                    collapsableData={sections.filters}
                    reference={(ref) => { this.filters = ref; }}
                    availableRealms={realms.collection}
                    handleToggleCollapsable={this.handleToggleCollapsable}
                    handleFetchCharacter={this.handleFetchCharacter}
                    error={characters.error}
                  />

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
                        region={options.region}
                        language={options.language}
                        handleToggleCollapsable={this.handleToggleCollapsable}
                        handleSwitchCharacter={this.handleSwitchCharacter}
                        handleRefreshCharacter={this.handleRefreshCharacter}
                        handleRemoveCharacter={this.handleRemoveCharacter}

                        character={selectedCharacter}

                        comparedTo={comparedTo}
                        ref={(ref) => { this[`characterFrame${index}`] = ref; }}
                      />
                    );
                  })}
                </div>
              }
            </div>
          </div>

          {/* App footer */}
          <Footer options={options}/>
        </div>
      </ReactSidebar>
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
