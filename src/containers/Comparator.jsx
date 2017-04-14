import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCharacter, fetchRival } from '../actions/characters.js';
import { fetchRaces, fetchClasses, fetchRealms,fetchTalents } from '../actions/resources.js';


import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
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

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.handleToggleCollapsable = this.handleToggleCollapsable.bind(this);
    this.handleFetchCharacter = this.handleFetchCharacter.bind(this);
    this.handleFetchRival = this.handleFetchRival.bind(this);

    this.state = {
      isSidebarOpen: false,
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
      dispatch,
    } = this.props;

    const dataToFetch = [
      dispatch(fetchRaces()),
      dispatch(fetchClasses()),
      dispatch(fetchRealms()),
      dispatch(fetchTalents()),
    ];

    Promise.all(dataToFetch)
      .then(() => dispatch(fetchCharacter({})));
  }

  handleToggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
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
    }, () => {
  
      /* Go through all children */
      for (let x in this) {
        const ref = this[x];

        /* If our collapsable refference exists, toggle it */
        if (ref && ref[slug] && ref[slug].state) {
          ref[slug].setState({ isOpen: this.state.sections[slug].isOpen });
        }
      }
    });
  }

  handleFetchCharacter({ realm, characterName }) {
    const { dispatch } = this.props;

    dispatch(fetchCharacter({ realm, characterName }));
  }

  handleFetchRival({ realm, characterName }) {
    const { dispatch } = this.props;

    dispatch(fetchRival({ realm, characterName }));
  }

  render() {
    const {
      characters: {
        character,
        rival,
      },
      resources: {
        classes,
        races,
        realms,
        talents,
      },
    } = this.props;
    const {
      isSidebarOpen,
      sections,
    } = this.state;

    const options = { region: 'us', language: 'en' };

    return (
      <div className="App">

        {/* App Header */}
        <Header handleToggleSidebar={this.handleToggleSidebar} />
        
        {/* App Sidebar */}
        <Sidebar
          sections={sections}
          isOpen={isSidebarOpen}
          handleToggleSidebar={this.handleToggleSidebar}
          options={options}
          ref={(ref) => { this.sidebar = ref; }}
          handleToggleCollapsable={this.handleToggleCollapsable}
        />

        {/* App content */}
        <div className="Comparator">

          {/* First character */}
          <Character
            sections={sections}
            title="You"
            ref={(ref) => { this.characterFrame = ref; }}
            handleToggleCollapsable={this.handleToggleCollapsable}
            classes={classes.collection}
            races={races.collection}
            talents={talents.collection}
            availableRealms={realms.collection}
            handleFetchCharacter={this.handleFetchCharacter}
            character={character}
          />

          {/* Second character */}
          {(
            (character && character.name && !character.isFetching)
            || (rival && rival.name && !rival.isFetching)
          ) &&
            <Character
              sections={sections}
              title="Your rival"
              ref={(ref) => { this.rivalFrame = ref; }}
              handleToggleCollapsable={this.handleToggleCollapsable}
              classes={classes.collection}
              races={races.collection}
              talents={talents.collection}
              availableRealms={realms.collection}
              handleFetchCharacter={this.handleFetchRival}
              character={rival}
              comparedTo={(character && character.name) ? character : undefined}
              isRival
            />
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
