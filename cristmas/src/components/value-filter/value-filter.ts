import './_value-filter.scss';

import * as noUiSlider from '../../../node_modules/nouislider/dist/nouislider';
import '../../models/nouislider/_styles.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
import { StateDriver, IUseState } from '../../models/state-driver';

export type IFilterByValueViewInit = {
  filterHeading: string;
  filterId: string; // must bu uniq
  filterStateContainer: string; // must bu uniq
  datafilters?: Array<string>;
};

/**
 *  Builds filter by -=VALUE=-
 */
export class FilterByValueView
  extends DOMFactory
  implements IDomWithStaticHtml, IUseState
{
  public stDriver: StateDriver;
  localStates: any;
  localStateIdentiferKey: any;
  constructor(initializer: IFilterByValueViewInit) {
    super({
      className: 'value-filter',
    });
    this.stDriver = new StateDriver();
    this.localStates = {};

    this.htmlInit(initializer);

    if (initializer.datafilters) {
      //check if state already exists
      if (this.stDriver.checkStateIdentifer(initializer.filterStateContainer)) {
        this.localStates = this.stDriver.getState(
          initializer.filterStateContainer
        );
        this.localStateIdentiferKey = initializer.filterStateContainer;

        // trigeted when state exists
        this.injectControlsUsingState();
      } else {
        // trigered if component created first time
        this.injectControlButtons(initializer.datafilters);
        this.localStateIdentiferKey = initializer.filterStateContainer;

        this.stDriver.addState(initializer.filterStateContainer, {
          ...this.localStates,
        });
      }
    }
  }

  filterValueButtonHandler(recivedEvent: Event) {
    // console.log('handler engaged');
    // console.log(recivedEvent.target);
    const datafilterButton = recivedEvent.target as HTMLButtonElement;

    datafilterButton.classList.toggle('active');
    const clickedDataFilter = datafilterButton.dataset.filter;

    if (clickedDataFilter) {
      if (this.localStates[clickedDataFilter] === '0') {
        this.localStates[clickedDataFilter] = '1';
      } else if (this.localStates[clickedDataFilter] === '1') {
        this.localStates[clickedDataFilter] = '0';
      }

      // console.log(this.localStates);
    } else {
      throw new Error(`Cant resolve data-filter ${clickedDataFilter}`);
    }

    this.stDriver.setState(this.localStateIdentiferKey, this.localStates);

    // console.log(StateDriver.getAllStates());
  }

  injectControlsUsingState() {
    // console.log(this.localStates);
    const butonsControlsField = this.domNode.querySelector(
      '.value-filter__controls'
    ) as HTMLElement;

    for (const curKey in this.localStates) {
      if (Object.prototype.hasOwnProperty.call(this.localStates, curKey)) {
        const element = this.localStates[curKey];
        // create element
        const tmpButton = new DOMFactory({
          tagName: 'button',
        });
        //set data attribute
        tmpButton.domNode.dataset.filter = curKey;
        //curent datafiter
        //if filter activated in state
        if (element === '1') {
          tmpButton.domNode.classList.add('active');
        } else {
          tmpButton.domNode.classList.remove('active');
        }

        //render element
        tmpButton.renderElement(butonsControlsField);

        tmpButton.domNode.addEventListener('click', (event) => {
          this.filterValueButtonHandler(event);
        });
      }
    }
  }

  injectControlButtons(dataFilters: Array<string>) {
    const butonsControlsField = this.domNode.querySelector(
      '.value-filter__controls'
    ) as HTMLElement;

    dataFilters.map((currentDataFilter) => {
      //create new dom element
      const tmpContainer = new DOMFactory({
        tagName: 'button',
      });

      // set data attribute
      tmpContainer.domNode.dataset.filter = currentDataFilter;
      //redner in target block
      tmpContainer.renderElement(butonsControlsField);
      //set default state for control element
      this.localStates[currentDataFilter] = '0';
      //add event listener to element
      tmpContainer.domNode.addEventListener('click', (event) => {
        this.filterValueButtonHandler(event);
      });
    });
  }

  htmlInit(init: IFilterByValueViewInit): void {
    this.domNode.innerHTML = `
      <div class="value-filter__descriptor">
        <h4 class="value-filter__caption">${init.filterHeading}</h4>
      </div>
      <div class="value-filter__controls">

      </div>
    `;
  }
}
