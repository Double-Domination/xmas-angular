import './_count-filter.scss';

import * as noUiSlider from '../../../node_modules/nouislider/dist/nouislider';
import '../../models/nouislider/_styles.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

export type IFilterByCountViewInit = {
  filterHeading: string;
  filterId: string; // must bu uniq
  filterStateContainer: string;
  initMinValue: number;
  initMaxValue: number;
};

/**
 *  Builds filter by count
 */
export class FilterByCountView
  extends DOMFactory
  implements IDomWithStaticHtml, IUseState
{
  public stDriver: StateDriver;
  constructor(initializer: IFilterByCountViewInit) {
    super({
      className: 'count-filter',
    });
    this.htmlInit(initializer);

    this.stDriver = new StateDriver();

    const uiSliderContainer = new DOMFactory({
      className: 'count-filter__container',
    });
    // min value element
    uiSliderContainer.domNode.append(
      new DOMFactory({
        tagName: 'output',
        className: 'count-filter__count-min-value',
        nodeContent: '',
      }).domNode
    );

    this.domNode.append(uiSliderContainer.domNode);

    const slider = document.createElement('div');
    slider.className = 'count-filter__slider-body ';
    slider.id = initializer.filterId;

    uiSliderContainer.domNode.append(slider);

    uiSliderContainer.domNode.append(
      new DOMFactory({
        tagName: 'output',
        className: 'count-filter__count-max-value',
        nodeContent: '',
      }).domNode
    );

    //Slider init

    //check if state is already exist
    if (this.stDriver.checkStateIdentifer(initializer.filterStateContainer)) {
      //if state allready exists
      const prevState = this.stDriver.getState(
        initializer.filterStateContainer
      );

      // console.log(prevState);
      // console.log(prevState.minValue, prevState.maxValue);

      noUiSlider.create(slider, {
        start: [parseInt(prevState.minValue), parseInt(prevState.maxValue)],
        connect: true,
        range: {
          min: initializer.initMinValue,
          max: initializer.initMaxValue,
        },
        step: 1,
      });
    } else {
      //if state NOT existed
      this.stDriver.addState(initializer.filterStateContainer, {
        minValue: initializer.initMinValue.toString(),
        maxValue: initializer.initMaxValue.toString(),
      });

      noUiSlider.create(slider, {
        start: [initializer.initMinValue, initializer.initMaxValue],
        connect: true,
        range: {
          min: initializer.initMinValue,
          max: initializer.initMaxValue,
        },
        step: 1,
      });
    }

    const rangeValues = [
      uiSliderContainer.domNode.firstChild,
      uiSliderContainer.domNode.lastChild,
    ];

    (slider as noUiSlider.target).noUiSlider?.on(
      'update',
      (values: Array<any>, handle: number) => {
        // console.log(`values ${values[0]}`);
        this.stDriver.setState(initializer.filterStateContainer, {
          minValue: Math.trunc(values[0]).toString(),
          maxValue: Math.trunc(values[1]).toString(),
        });
        (rangeValues[handle] as HTMLElement).innerHTML = Number(
          values[handle]
        ).toFixed(0);
      }
    );
  }

  htmlInit(init: IFilterByCountViewInit): void {
    this.domNode.innerHTML = `
      <h4 class="count-filter__heading">
      ${init.filterHeading}
      </h4>
    `;
  }
}
