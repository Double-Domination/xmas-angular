import './_sort-filter.scss';
import rawHtml from './sort-filter.html';

import { DOMFactory } from '../../models/dom-factory';
import { StateDriver, IUseState } from '../../models/state-driver';

enum SortVariants {
  'sort-name-ascend',
  'sort-name-descend',
  'sort-value-ascend',
  'sort-value-descend',
}

export type IFilterSortViewInit = {
  filterHeading: string;
  filterId: string; // must bu uniq
  filterStateContainer: string; // must bu uniq
  defaultSort: string;
};

/**
 *  Builds filter by -=Sorting=-
 */
export class FilterBySortView extends DOMFactory implements IUseState {
  public stDriver: StateDriver;
  selectedSorting: string;
  innerStateContanerName: string;

  constructor(initializer: IFilterSortViewInit) {
    super({
      className: 'sort-filter',
      useTemplate: rawHtml,
    });

    this.innerStateContanerName = initializer.filterStateContainer;

    //Guard
    if (initializer.defaultSort in SortVariants === false) {
      throw new Error(
        `${initializer.defaultSort} sort method is not implemented`
      );
    }

    //state init
    this.stDriver = new StateDriver();
    if (this.stDriver.checkStateIdentifer(initializer.filterStateContainer)) {
      //exists
      this.selectedSorting = this.stDriver.getState(
        initializer.filterStateContainer
      ).curentSort;
    } else {
      //not exists
      this.stDriver.addState(initializer.filterStateContainer, {
        curentSort: initializer.defaultSort,
      });
      this.selectedSorting = this.stDriver.getState(
        initializer.filterStateContainer
      ).curentSort;
    }

    //working with select
    const selectElement = this.domNode.querySelector(
      '.sort-filter-selector'
    ) as HTMLSelectElement;

    const optionElementCollection = this.domNode.querySelectorAll(
      '.sort-selector__value'
    ) as NodeListOf<HTMLOptionElement>;

    selectElement.value = initializer.defaultSort;

    //sort change mechanism
    selectElement.addEventListener('change', (evt) =>
      this.sortTypeChangeHandler(evt)
    );
  }

  sortTypeChangeHandler(evt: any) {
    // console.log(evt.target.value);
    this.stDriver.setState(this.innerStateContanerName, {
      curentSort: evt.target.value,
    });

    // console.log(StateDriver.getAllStates());
  }
}
