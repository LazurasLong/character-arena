import React, { PropTypes, Component } from 'react';
import { getItemQualityName } from '../utils/calcs';

import Icon from '../components/Icon';
import TalentsIcon from '../components/CharacterTalentsIcon';

export default class ItemDetail extends Component {
  static PropTypes = {
    className: PropTypes.string,
    item: PropTypes.object,
    classes: PropTypes.array.isRequired,
    itemTypes: PropTypes.array.isRequired,
    sockets: PropTypes.array.isRequired,
    handleCloseItemDetail: PropTypes.func.isRequired,
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
      classes,
      itemTypes,
      sockets,
      handleCloseItemDetail,
    } = this.props;

    const {
      isModalOpen,
    } = this.state;

    /* Calc item quality */
    const quality = item && getItemQualityName(item.quality);

    /* Get the material */
    const itemClass = item
      && itemTypes
      && itemTypes.find(type => type.class === item.itemClass);

    const itemSubClass = item
      && itemClass
      && itemClass.subclasses
      && itemClass.subclasses.find(type => type.subclass === item.itemSubClass).name;

    return (
      <div className={`Share-modal ${isModalOpen ? 'is-open' : ''}`}>
        <div className="Share-modalBody">
          {/* Close button */}
          <button
            className="Button Button--icon Button--invisible Share-modalClose"
            onClick={() => { handleCloseItemDetail() }}
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

                {/* TODO: Context */}
                <span className="Item-context">Need to define context</span>

                {/* Item Level */}
                <span className="Item-itemLevel">Item Level {
                  (item.tooltipParams && item.tooltipParams.timewalkerLevel)
                    ? item.tooltipParams.timewalkerLevel
                    : item.itemLevel
                }</span>

                {/* TODO: Soulbound */}
                {/* item.itemBind */}
                {/* 1 = Binds when picked up */}
                {/* 2 = Binds when equipped */}
                {/* 1 = Binds to Battle.net account */}
                <span className="Item-itemBind">Need to define binding</span>

                {/* Socket & Material */}
                {(itemSubClass || item.inventoryType) &&
                  <span className="Item-socket">
                    {item.inventoryType &&
                      <span>{sockets.find(sock => sock.id === item.inventoryType).name}</span>
                    }
                    {itemSubClass &&
                      <span className="Item-material">{itemSubClass}</span>
                    }
                  </span>
                }

                {/* TODO: Stats */}
                {/* 74 = strenght or intellect */}
                {/* 7 = stamina */}
                {/* 32 = crit */}
                {/* 36 = haste */}
                {/* 49 = mastery */}
                {/* 70 = vers */}
                <span className="Item-stats">
                  Need to define stats<br />
                  {(item.armor > 0) && <span>{item.armor} Armor<br /></span>}
                </span>

                {/* TODO: Buffs */}
                {/* item.itemSpells */}
                <span className="Item-benefits">Need to define benefits</span>

                {/* TODO: Tier Bonus */}
                {item && item.itemSet && item.itemSet.name &&
                <div className="Item-set">
                  <span className="Item-setTitle">
                    {item.itemSet.name} ({
                      item.itemSet.items.filter(i => i.isOwned).length
                    }/{
                      item.itemSet.items.length
                    })</span>
                  <ul className="Item-setList">
                    {item.itemSet.items.map(i => i.id
                      ? (<li
                          key={`item-${i.id}`}
                          className={`Item-setItem ${i.isOwned ? 'is-active' : ''}`}
                        >{i.name}</li>)
                      : <li key={i} />
                      )}
                  </ul>
                </div>
                }

                {/* Description */}
                {item.description &&
                  <span className="Item-description">"{item.description}"</span>
                }

                {/* Durability */}
                {item.maxDurability > 0 &&
                  <span className="Item-durability">Durability: {item.maxDurability}/{item.maxDurability}</span>
                }

                {/* Requirements */}
                {/* Class */}
                {item.allowableClasses &&
                  <span className="Item-allowedClasses">Classes: {
                    item.allowableClasses.map(classId =>
                      classes.find(c => 
                        (c.id === classId)
                      ).name
                    )
                  }</span>
                }

                {/* Level */}
                {item.requiredLevel > 0 &&
                  <span className="Item-requiredLevel">Requires level {item.requiredLevel}</span>
                }

                {/* TODO: Skill */}
                <span className="Item-requiredSkill">Need to define skill requirement</span>

                {/* TODO: Skill Rank */}
                <span className="Item-requiredSkillRank">Need to define skillRank requirement</span>

                {/* TODO: Sell price */}
                <span className="Item-sellPrice">Need to define sellPrice {item.sellPrice}</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
};
