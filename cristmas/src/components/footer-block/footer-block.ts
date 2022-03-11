import './_footer-block.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

interface IFooterBlockViewInit {
  //
}

/**
 *  Builds footer row
 */
export class FooterBlockView extends DOMFactory implements IDomWithStaticHtml {
  constructor(/* initializer: IFooterBlockViewInit */) {
    super({
      tagName: 'div',
      className: 'footer-block',
      nodeContent: 'footer placeholder',
    });

    // this.htmlInit(initializer);
  }

  htmlInit(init: IFooterBlockViewInit): void {
    this.domNode.innerHTML = `
    <ul class="header-block__navigation-list"></ul>
    `;
  }
}
