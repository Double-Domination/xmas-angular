import './_toys-page.scss';

import { DOMFactory } from '../../models/dom-factory';
// import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
// import { StateDriver, IUseState, IFolower } from '../../models/state-driver';
// import { RangeFilterView } from '../../components/range-filter/range-filter';
// import { UnitCardView } from '../../components/unit-card/unit-card';
// import { FilterByCountView } from '../../components/count-filter/count-filter';
// import { FilterByValueView } from '../../components/value-filter/value-filter';
// import { ToysDesc } from '../../components/toys-desc/toys-desc';

// interface IStartPageInit {
//   // recivedRoutes: Array<string>;
//   page: string;
// }

/**
 *  Builds toys page
 */
export class ToysPage extends DOMFactory {
  // navigationRow: HTMLElement;
  constructor(/* initializer: IStartPageInit */) {
    super({
      tagName: 'div',
      className: 'toys-page',
      nodeContent: 'UNDER CONSTRUCTION',
    });
  }
}
