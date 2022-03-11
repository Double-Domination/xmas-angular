import './_range-filter.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';

/**
 * This type represents all reqired data to build RangeFilterView
 * @param {string} filterHeader Text descripton in header
 */
export type IRangeFilterViewInit = {
  filterHeader: string;
};

/**
 *  Builds container which where you can put -=RANGE=- filters
 */
export class RangeFilterView extends DOMFactory implements IDomWithStaticHtml {
  /**
   * @constructor
   * @super @param {string} tagName defines tag
   * @super @param {string} className defines css class
   * @super @param {string} nodeContent defines very basic string in node if re
   *
   * @param {init:IRangeFilterViewInit} init object for static html construction
   *
   * @private @method htmlInit(IRangeFilterViewInit) should be exexuted with
   * initializing DTO
   */
  constructor(initializer: IRangeFilterViewInit) {
    super({
      tagName: 'div',
      className: 'range-filter',
      nodeContent: 'range filter will be there',
    });
    this.htmlInit(initializer);
  }

  htmlInit(init: IRangeFilterViewInit): void {
    this.domNode.innerHTML = `
    <h3 class="range-filter__heading">${init.filterHeader}</h3>
    `;
  }
}
