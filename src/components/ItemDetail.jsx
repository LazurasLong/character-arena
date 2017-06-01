import React, { PropTypes, Component } from 'react';
import imageResolver from '../utils/image-resolver';
import { getItemQualityName } from '../utils/calcs';
import { defaultStats, defaultBinds, defaultContexts, defaultSockets } from '../constants/blizz-settings';

import Icon from '../components/Icon';
import TalentsIcon from '../components/CharacterTalentsIcon';

export default class ItemDetail extends Component {
  static PropTypes = {
    className: PropTypes.string,
    item: PropTypes.object,
    classes: PropTypes.array.isRequired,
    itemTypes: PropTypes.array.isRequired,
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
    
    const context = item && defaultContexts.find(dc => dc.key === item.context);

    const sellPrice = {
      string: item && item.sellPrice.toString(),
    };
    if (sellPrice.string && sellPrice.string.length > 0) sellPrice.copper = parseInt(sellPrice.string.substr(-2), 10);
    if (sellPrice.string && sellPrice.string.length > 2) sellPrice.silver = parseInt(sellPrice.string.substr(sellPrice.string.length - 4, 2), 10);
    if (sellPrice.string && sellPrice.string.length > 4) sellPrice.gold = parseInt(sellPrice.string.substr(0, sellPrice.string.length - 4), 10);
    
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
                {/* Pending mythic level, titanforged, warforged */}
                {(context && context.value.length > 0) &&
                  <span className="todo Item-context">{context.value}</span>
                }

                {/* Item Level */}
                <span className="Item-itemLevel">Item Level {
                  item.itemLevel
                }</span>

                {/* TODO: Transmog */}
                <span className="todo Item-transmog">Need to define transmog</span>

                {/* Soulbound */}
                {item.itemBind &&
                  <span className="Item-itemBind">
                    {(item.itemBind === 1 && item.quality === 7) && defaultBinds.find(db => db.key === 'account').value}
                    {(item.itemBind === 1 && item.quality !== 7) && defaultBinds.find(db => db.key === 'pickup').value}
                    {(item.itemBind === 2) && defaultBinds.find(db => db.key === 'equip').value}
                  </span>
                }

                <span className="todo Item-equippedCount">Need to define equippedCountLimit</span>

                {/* Socket & Material */}
                {(itemSubClass || item.inventoryType) &&
                  <span className="Item-socket">
                    {item.inventoryType &&
                      defaultSockets.find(sock => sock.key === item.inventoryType).name
                    }
                    {itemSubClass &&
                      `, ${itemSubClass}`
                    }
                  </span>
                }

                {/* Stats */}
                <div className="Item-stats">
                  {(item.armor > 0) &&
                    <p className="Item-stat">+{item.armor} Armor</p>
                  }
                  {defaultStats.map(ds => {
                    const itemStat = item.stats.find(stat => stat.stat === ds.key);
                    if (itemStat) {
                      return (
                        <p key={`stat-${ds.key}`} className={`Item-stat ${
                          (ds.key === 32 || ds.key === 36 || ds.key === 49 || ds.key === 70)
                          ? 'is-enhance' : ''
                        }`}>
                          {`+${itemStat.amount} ${ds.value}`}
                        </p>
                      );
                    }

                    return;
                  })}
                </div>

                {/* Spells */}
                {item && item.itemSpells &&
                  <span className="Item-benefits">{
                    item.itemSpells.map(s =>
                      (s.spell.description.length > 0) &&
                        <span
                          key={`spell-${s.spell.id}`}
                          className="Item-benefit"
                        >
                          {s.trigger === 'ON_EQUIP' && 'Equip: '}
                          {s.trigger === 'ON_USE' && 'Use: '}
                          {s.spell.description}
                        </span>
                    )
                  }</span>
                }

                {/* Item set */}
                {/* Pending itemSet spells */}
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
                  <span className="Item-requiredLevel">Requires level {
                    (item.tooltipParams && item.tooltipParams.timewalkerLevel)
                    ? item.tooltipParams.timewalkerLevel
                    : item.requiredLevel
                  }</span>
                }

                {/* TODO: Skill */}
                <span className="todo Item-requiredSkill">Need to define skill requirement</span>

                {/* TODO: Skill Rank */}
                <span className="todo Item-requiredSkillRank">Need to define skillRank requirement</span>

                {/* Sell price */}
                {item.sellPrice &&
                  <span className="Item-sellPrice">
                    Sell price:
                    {(sellPrice.gold > 0) && 
                      <span
                        className="Currency Currency--gold"
                        style={{ backgroundImage: `url(${imageResolver('../images/coin-gold.gif')})`}}
                      >{sellPrice.gold}</span>
                    }
                    {(sellPrice.silver > 0) && 
                      <span
                        className="Currency Currency--silver"
                        style={{ backgroundImage: `url(${imageResolver('../images/coin-silver.gif')})`}}
                      >{sellPrice.silver}</span>
                    }
                    {(sellPrice.copper > 0) && 
                      <span
                        className="Currency Currency--copper"
                        style={{ backgroundImage: `url(${imageResolver('../images/coin-copper.gif')})`}}
                      >{sellPrice.copper}</span>
                    }
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
};
