import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactSidebar from 'react-sidebar';
import imageResolver from '../utils/image-resolver';
import {
  getCharacterRace,
  getCharacterClass,
  getAvailableTalents,
  composePathname,
  getCookie,
  setCookie
} from '../utils/calcs';

import { REGIONS } from '../constants/app';
import { HOME } from '../constants/appRoutes';

import { fetchCharacter, switchCharacter, moveCharacter, removeCharacter } from '../actions/characters';
import { fetchRaces, fetchClasses, fetchRealms,fetchTalents, fetchItemTypes } from '../actions/resources';
import { fetchItem, /* fetchInfoItem, */ fetchItemSetItem, updateItemSetItem, fetchTransmogItem, unselectItem } from '../actions/items';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Builder from '../components/Builder';
import CharacterFinder from '../components/CharacterFinder';
import Character from '../components/Character';
import Footer from '../components/Footer';
import ItemDetail from '../components/ItemDetail';

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
    resourcesData.push(dispatch(fetchItemTypes({ region, language })));

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
    this.handleMoveCharacter = this.handleMoveCharacter.bind(this);
    this.handleRefreshCharacter = this.handleRefreshCharacter.bind(this);
    this.handleRemoveCharacter = this.handleRemoveCharacter.bind(this);
    this.handleGetShareTitle = this.handleGetShareTitle.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleShowItemDetail = this.handleShowItemDetail.bind(this);
    this.handleCloseItemDetail = this.handleCloseItemDetail.bind(this);

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
          isDisabled: true,
          slug: 'filters',
          title: 'New character',
        },
        attributes: {
          isOpen: true,
          slug: 'attributes',
          title: 'Attributes',
          elements: [
            {
              name: 'Item Level',
              slug: 'averageItemLevelEquipped',
              icon: 'swords',
            },
            {
              name: 'Health',
              slug: 'health',
            },
            {
              name: 'Energy',
              slug: 'energy',
              isPower: true,
            },
            {
              name: 'Focus',
              slug: 'focus',
              isPower: true,
            },
            {
              name: 'Fury',
              slug: 'fury',
              isPower: true,
            },
            {
              name: 'Insanity',
              slug: 'insanity',
              isPower: true,
            },
            {
              name: 'Maelstrom',
              slug: 'maelstrom',
              isPower: true,
            },
            {
              name: 'Mana',
              slug: 'mana',
              isPower: true,
            },
            {
              name: 'Pain',
              slug: 'pain',
              isPower: true,
            },
            {
              name: 'Rage',
              slug: 'rage',
              isPower: true,
            },
            {
              name: 'Runic Power',
              slug: 'runic-power',
              isPower: true,
            },
          ],
        },
        stats: {
          isOpen: true,
          slug: 'stats',
          title: 'Stats',
          elements: [
            {
              name: 'Strength',
              slug: 'str',
              icon: 'strength',
              isSpecBased: true,
            },
            {
              name: 'Agility',
              slug: 'agi',
              icon: 'agility',
              isSpecBased: true,
            },
            {
              name: 'Intellect',
              slug: 'int',
              icon: 'intellect',
              isSpecBased: true,
            },
            {
              name: 'Stamina',
              slug: 'sta',
              icon: 'stamina',
            },
          ],
        },
        enhancements: {
          isOpen: true,
          slug: 'enhancements',
          title: 'Enhancements',
          elements: [
            {
              name: 'Critical',
              slug: 'crit',
              icon: 'critical-strike',
            },
            {
              name: 'Haste',
              slug: 'haste',
            },
            {
              name: 'Mastery',
              slug: 'mastery',
            },
            {
              name: 'Versatility',
              slug: 'versatility',
            },
          ],
        },
        talents: {
          isOpen: true,
          slug: 'talents',
          title: 'Talents',
        },
        items: {
          isOpen: true,
          slug: 'items',
          title: 'Items',
          elements: [
            'head',
            'neck',
            'shoulder',
            'back',
            'chest',
            'shirt',
            'tabard',
            'wrist',
            'hands',
            'waist',
            'legs',
            'feet',
            'finger1',
            'finger2',
            'trinket1',
            'trinket2',
            'mainHand',
            'offHand',
          ],
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

  handleMoveCharacter({ character, movement }) {
    const { dispatch } = this.props;

    Promise.all([dispatch(moveCharacter(character, movement))])
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

  handleGetShareTitle() {
    const {
      characters: { collection },
    } = this.props;

    if (!collection.length) {
      return document.title;
    }

    let title = '';
    collection.forEach((char, index) => {
      if (index === 0) {
        title += char.name;
      } else {
        title += ` vs ${char.name}`;
      }
    });

    return `${title} on ${document.title}`;
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

  handleShowItemDetail({ character, item }) {
    const { characters: { collection }, dispatch } = this.props;
    const { options: { region, language } } = this.state;

    dispatch(fetchItem({ item, region, language }))
      .then(response => {
        // Get owner of the item set
        const owner = collection.find(c => (c.name === character.name && c.realm === character.realm));

        // Create new itemSet object
        const fetchedItem = {
          ...response,
        };

        const itemsToFetch = [];
        /*
        // Fetch extra info
        if (response.displayInfoId) {
          itemsToFetch.push(
            dispatch(fetchInfoItem({
              item: response.displayInfoId,
              region,
              language,
            })),
          );
        }
        */

        // If item is part of the set
        if (response.itemSet && response.itemSet.items) {
          // Store the set
          fetchedItem.itemSet.items = response.itemSet.items.map(i => {
            let ownedItem;
            // Loop throu each item of the character items
            Object.keys(owner.items).forEach(key => {
              const charItem = owner.items[key];

              // If character already has it
              if (charItem && charItem.id && i === charItem.id) {
                ownedItem = {
                  ...charItem,
                  isOwned: true,
                };

                return;
              }
            });

            return ownedItem || i;
          });

          // Loop items on the set
          fetchedItem.itemSet.items.map(fetchedI => {
            // Fetch not owned items
            if (!fetchedI.id) {
              itemsToFetch.push(
                dispatch(fetchItemSetItem({
                  item: fetchedI,
                  region,
                  language,
                }))
              );
            
            } else {
              itemsToFetch.push(
                dispatch(updateItemSetItem({
                  item: fetchedI,
                }))
              );
            }
          });
        }

        // Fetch transmog item
        if (item.tooltipParams && item.tooltipParams.transmogItem) {
          itemsToFetch.push(
            dispatch(fetchTransmogItem({
              item: item.tooltipParams.transmogItem,
              region,
              language,
            })),
          );
        }

        // Fetch unknown items
        return Promise.all(itemsToFetch)
          .then(() => Promise.resolve())
          .catch(errors => Promise.reject(errors));
      });
  }

  handleCloseItemDetail() {
    const { dispatch } = this.props;

    dispatch(unselectItem());
  }

  render() {
    const {
      resources: {
        classes,
        races,
        realms,
        talents,
        itemTypes,
      },
      characters,
      items,
    } = this.props;

    const {
      isSidebarOpen,
      options,
      sections,
    } = this.state;

    const isServiceLoading = (classes.isFetching || !classes.collection.length || races.isFetching || !races.collection.length || realms.isFetching || !realms.collection.length || talents.isFetching || !itemTypes.collection.length || itemTypes.isFetching)
      ? true
      : false;
    const isServiceUnavailable = (classes.error || races.error || realms.error || talents.error || itemTypes.error)
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
      } else if (itemTypes.error) {
        dataFailing = itemTypes;
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
          <Header handleToggleSidebar={this.handleToggleSidebar} handleGetShareTitle={this.handleGetShareTitle} />

          {/* App content */}
          <div className="Comparator">
            <div className="Comparator-wrapper" style={{width: (((characters.collection.length + 1) * (270 + 10)) + 20)}}>
              {/* App builder */}
              {(isServiceLoading || isServiceUnavailable) &&
                <Builder
                  realms={realms}
                  races={races}
                  classes={classes}
                  talents={talents}
                  itemTypes={itemTypes}
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
                        handleMoveCharacter={this.handleMoveCharacter}
                        handleRefreshCharacter={this.handleRefreshCharacter}
                        handleRemoveCharacter={this.handleRemoveCharacter}
                        handleShowItemDetail={this.handleShowItemDetail}

                        character={selectedCharacter}
                        isFirst={index === 1}
                        isLast={index === (characters.collection.length - 1)}

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

          {/* Item Detail */}
          <ItemDetail
            items={items}
            classes={classes.collection}
            itemTypes={itemTypes.collection}
            handleCloseItemDetail={this.handleCloseItemDetail}
          />
        </div>
      </ReactSidebar>
    );
  }
};

function mapStateToProps(state) {
  return {
    resources: state.resources,
    characters: state.characters,
    items: state.items,
  };
};

export default connect(
  mapStateToProps
)(Comparator);
