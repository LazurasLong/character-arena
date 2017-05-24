import React, { PropTypes, Component } from 'react';
import { getItemQualityName } from '../utils/calcs';

import Icon from '../components/Icon';
import TalentsIcon from '../components/CharacterTalentsIcon';

export default class ItemDetail extends Component {
  static PropTypes = {
    className: PropTypes.string,
    item: PropTypes.object,
  };

  static defaultProps = {
    className: '',
  };

  static displayName = 'ItemDetail';

  state = {
    isModalOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isModalOpen: (nextProps.items && (nextProps.items.isFetching || nextProps.items.selected)),
    })
  }

  render() {
    const {
      items: {
        isFetching,
        selected: item,
      },
    } = this.props;

    const {
      isModalOpen,
    } = this.state;

    /* Calc item quality */
    const quality = item && getItemQualityName(item.quality);

    return (
      <div className={`Share-modal ${isModalOpen ? 'is-open' : ''}`}>
        <div className="Share-modalBody">
          {/* Close button */}
          <button
            className="Button Button--icon Button--invisible Share-modalClose"
            onClick={() => { this.setState({isModalOpen: false}); }}
          >
            <Icon className="Button-icon" icon="close" />
          </button>

          {/* Modal body */}
          {isFetching && <p>Loading</p>}

          {!isFetching && item &&
            <div className={`Item Item--${quality} Item--detail`}>

              {/* Item icon */}
              <TalentsIcon
                className="Item-icon"
                icon={item.icon}
              />

              {/* Item info */}
              <div className="Item-info">

                {/* Name */}
                <span className="Item-name">{item.name}</span>

                {/* Context */}
                <span className="Item-context">Need to define context</span>

                {/* Item Level */}
                <span className="Item-itemLevel">Item Level {item.itemLevel}</span>

                {/* Soulbound */}
                <span className="Item-itemBind">Need to define binding</span>

                {/* Socket */}
                <span className="Item-socket">Need to define socket</span>

                {/* Material */}
                <span className="Item-material">Need to define material</span>

                {/* Stats */}
                <span className="Item-stats">Need to define stats</span>
                {/* 74 = strenght or intellect */}
                {/* 7 = stamina */}
                {/* 32 = crit */}
                {/* 49 = mastery */}

                {/* Durability */}
                <span className="Item-durability">Need to define durability</span>

                {/* Requirements */}
                {/* Level */}
                <span className="Item-requiredLevel">Need to define level requirement</span>

                {/* Skill */}
                <span className="Item-requiredSkill">Need to define skill requirement</span>

                {/* Skill Rank */}
                <span className="Item-requiredSkillRank">Need to define skillRank requirement</span>

                {/* Sell price */}
                <span className="Item-sellPrice">Need to define sellPrice</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
};
