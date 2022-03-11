import './_toys-desc.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';
import { IToyCard, singleCardDTO, initialDataDTO } from '../../models/IToyCard';

import { UnitCardView } from '../unit-card/unit-card';
import { FilterByCountView } from '../count-filter/count-filter';

import { ChosenToysList } from '../../models/chosen-toys';

/**
 * This type represents toys filterng desc for initialization
 */
export type IToysDescInit = {
  innerString: string;
};

export type filterByCountConfig = {
  minItemCount: string;
  maxItemCount: string;
};

export type filterByYearConfig = {
  minItemYear: string;
  maxItemYear: string;
};

export enum StringAsBool {
  FALSE = '0',
  TRUE = '1',
}
export type filterByColorConfig = {
  большой: StringAsBool;
  малый: StringAsBool;
  средний: StringAsBool;
};

export type filterBySizeConfig = {
  белый: StringAsBool;
  желтый: StringAsBool;
  красный: StringAsBool;
  синий: StringAsBool;
  зелёный: StringAsBool;
};
export type filterByShapeConfig = {
  шар: StringAsBool;
  колокольчик: StringAsBool;
  шишка: StringAsBool;
  снежинка: StringAsBool;
  фигурка: StringAsBool;
};

export type filterByFavoritesConfig = {
  избранные: StringAsBool;
};

/**
 *  represents toys filterng desc
 */
export class ToysDesc extends DOMFactory implements IUseState, IFolower {
  public stDriver: StateDriver;
  public readonly initialDTO: Array<IToyCard>;
  public filteredDTO: Array<IToyCard>;

  localChosen: any;

  constructor() {
    super({
      tagName: 'div',
      className: 'toys-desc',
    });

    //State Stuff
    this.stDriver = new StateDriver();
    this.stDriver.subscribeToState(this);

    //chosen Stuff

    this.localChosen = new ChosenToysList();

    // Check if state exists
    if (this.stDriver.checkStateIdentifer('chosenToys')) {
      //grab existed state
      // const prevState = JSON.parse(
      //   JSON.stringify(this.stDriver.getState('chosenToys').chosenToysList)
      // );
      const prevState = this.stDriver.getState('chosenToys').chosenToysList;
      // console.log(prevState);

      // this.localChosen asign
      this.localChosen.chosenToysList = prevState;
    } else {
      this.stDriver.addState('chosenToys', this.localChosen);
    }

    //filterStaff
    this.initialDTO = JSON.parse(JSON.stringify(initialDataDTO));
    this.filteredDTO = initialDataDTO;
    this.renderCards(this.filteredDTO, this.localChosen.chosenToysList);
    this.updateFolower();
  }

  filterByCount(param: filterByCountConfig) {
    const { minValue = '1', maxValue = '12' } = { ...param };
    // console.log(`min>${minValue} max>${maxValue}`);
    this.filteredDTO = this.filteredDTO.filter((item) => {
      if (
        Number(item.count) >= Number(minValue) &&
        Number(item.count) <= Number(maxValue)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  filterByYear(param: filterByYearConfig) {
    const { minValue = '1940', maxValue = '2022' } = { ...param };
    // console.log(`min>${minValue} max>${maxValue}`);
    this.filteredDTO = this.filteredDTO.filter((item) => {
      if (
        Number(item.year) >= Number(minValue) &&
        Number(item.year) <= Number(maxValue)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  filterBySize(param: filterBySizeConfig) {
    // console.log(param);
    const activeSizeFlags = Object.entries(param)
      .map(([key, value]) => {
        // console.log(key, value);
        if (value === '1') {
          return key;
        } else {
          return null;
        }
      })
      .filter((x) => x); //to trim null values

    if (activeSizeFlags.length === 0) {
      // if no flags selected
      return;
    }

    // console.log(activeSizeFlags);

    this.filteredDTO = this.filteredDTO.filter((item) => {
      if (activeSizeFlags.includes(item.size)) {
        return true;
      } else {
        return false;
      }
    });

    // {большой: '0', средний: '0', малый: '0'}
  }

  filterByColor(params: filterBySizeConfig) {
    // console.log(params);
    const activeColorFlags = Object.entries(params)
      .map(([key, value]) => {
        // console.log(key, value);
        if (value === '1') {
          return key;
        } else {
          return null;
        }
      })
      .filter((x) => x); //to trim null values

    if (activeColorFlags.length === 0) {
      // if no flags selected
      return;
    }

    // console.log(activeColorFlags);

    this.filteredDTO = this.filteredDTO.filter((item) => {
      if (activeColorFlags.includes(item.color)) {
        return true;
      } else {
        return false;
      }
    });

    //{белый: '1', желтый: '1', красный: '0', синий: '1', зелёный: '0'}
  }

  filterByShape(params: filterByShapeConfig) {
    // console.log(params);

    const activeShapeFlags = Object.entries(params)
      .map(([key, value]) => {
        // console.log(key, value);
        if (value === '1') {
          return key;
        } else {
          return null;
        }
      })
      .filter((x) => x); //to trim null values

    if (activeShapeFlags.length === 0) {
      // if no flags selected
      return;
    }

    // console.log(activeShapeFlags);

    this.filteredDTO = this.filteredDTO.filter((item) => {
      if (activeShapeFlags.includes(item.shape)) {
        return true;
      } else {
        return false;
      }
    });

    // {шар: '0', колокольчик: '0', шишка: '0', снежинка: '0', фигурка: '0'}
  }

  filterByFavorites(params: filterByFavoritesConfig) {
    // console.log(params);

    const isFavoriteFlag = Object.values(params)[0] === '0' ? false : true;
    // console.log(isFavoriteFlag);
    if (isFavoriteFlag === true) {
      this.filteredDTO = this.filteredDTO.filter((item) => {
        if (item.favorite === isFavoriteFlag) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return;
    }
  }

  chosenCardClickHandler(recivedEvent: Event) {
    // console.log(recivedEvent.currentTarget);
    if (this.localChosen.chosenToysList.length >= 20) {
      alert('Chosen list is full, remove something first');
      return;
    }
    const currentCardElement = recivedEvent.currentTarget as HTMLElement;
    // currentCardElement.classList.toggle('chosen');

    const cardIdentiferName = currentCardElement.querySelector(
      '.unit-card__heading'
    )?.textContent;

    this.localChosen.toggleChosen(cardIdentiferName);
    // console.log(this.localChosen.chosenToysList);

    this.stDriver.setState('chosenToys', this.localChosen);

    // console.log(StateDriver.getAllStates());
  }

  renderCards(recived: Array<IToyCard>, cardsToMark: Array<string>) {
    recived.map((toyCardDTO: IToyCard) => {
      const tmpContainer = new UnitCardView(toyCardDTO);

      if (cardsToMark.includes(toyCardDTO.name)) {
        tmpContainer.domNode.classList.add('chosen');
      }

      tmpContainer.domNode.addEventListener('click', (event) => {
        this.chosenCardClickHandler(event);
      });

      this.domNode.append(tmpContainer.domNode);
    });
  }

  sortCards(params: { curentSort: string }) {
    console.log(params);

    enum Orders {
      ASC,
      DESC,
    }

    const alphabetSort = (order: Orders) => {
      this.filteredDTO.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });

      if (order === Orders.DESC) {
        this.filteredDTO.reverse();
      }
    };

    const yearSort = (order: Orders) => {
      this.filteredDTO.sort((a, b) => {
        if (Number(a.year) < Number(b.year)) {
          return -1;
        }
        if (Number(a.year) > Number(b.year)) {
          return 1;
        }
        return 0;
      });

      if (order === Orders.DESC) {
        this.filteredDTO.reverse();
      }
    };

    const SortStrategies: { [key: string]: void } = {
      get ['sort-name-ascend']() {
        return alphabetSort(Orders.ASC);
      },

      get ['sort-name-descend']() {
        return alphabetSort(Orders.DESC);
      },
      get ['sort-value-ascend']() {
        return yearSort(Orders.ASC);
      },
      get ['sort-value-descend']() {
        return yearSort(Orders.DESC);
      },
    };

    return SortStrategies[params.curentSort];
  }

  updateFolower(): void {
    this.domNode.innerHTML = '';

    const filterByCountParams = this.stDriver.getState('filterByCount');
    const filterByYearParams = this.stDriver.getState('filterByYear');
    const filterByShapeParams = this.stDriver.getState('filterByShape');
    const filterByColorParams = this.stDriver.getState('filterByColor');
    const filterBySizeParams = this.stDriver.getState('filterBySize');
    const filterByFavoritesParams = this.stDriver.getState('filterByFavorites');

    const sortParams = this.stDriver.getState('filterBySort');

    const chosenToysParams =
      this.stDriver.getState('chosenToys').chosenToysList;

    // console.log(chosenToysParams);
    // console.log(filterByShapeParams);
    // console.log(filterByColorParams);
    // console.log(filterBySizeParams);
    // console.log(filterByFavoritesParams);
    // console.log(filterBySortParams);

    this.filterByShape(filterByShapeParams);
    this.filterByColor(filterByColorParams);
    this.filterBySize(filterBySizeParams);

    this.filterByCount(filterByCountParams);
    this.filterByYear(filterByYearParams);

    this.filterByFavorites(filterByFavoritesParams);

    this.sortCards(sortParams);

    console.log(this.filteredDTO.length);
    // console.log(this.filteredDTO);

    this.renderCards(this.filteredDTO, chosenToysParams);
    //reset filtered list
    this.filteredDTO = JSON.parse(JSON.stringify(initialDataDTO));
  }
}
