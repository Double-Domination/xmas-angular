import './_header-block.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

interface IHeaderBlockViewInit {
  recivedRoutes: Array<string>;
}

/**
 *  Builds navigation row
 */
export class HeaderBlockView extends DOMFactory implements IDomWithStaticHtml {
  navigationRow: HTMLElement;
  constructor(initializer: IHeaderBlockViewInit) {
    super({
      tagName: 'div',
      className: 'header-block',
    });

    this.htmlInit(initializer);

    this.navigationRow = this.domNode.querySelector(
      '.header-block__navigation-list'
    ) as HTMLElement;

    this.createRoutesControls(initializer);
  }

  createRoutesControls(initializer: IHeaderBlockViewInit) {
    initializer.recivedRoutes.map((curRoute) => {
      const liElementTmp = new DOMFactory({
        className: 'header-block__nav-item',
        tagName: 'li',
      });

      const aElementTmp = new DOMFactory({
        className: 'header-block__nav-link',
        tagName: 'a',
        nodeContent: curRoute,
      });
      aElementTmp.domNode.setAttribute('href', `#${curRoute}`);
      aElementTmp.renderElement(liElementTmp.domNode);

      liElementTmp.renderElement(this.navigationRow);
    });
  }

  htmlInit(init: IHeaderBlockViewInit): void {
    this.domNode.innerHTML = `
    <ul class="header-block__navigation-list"></ul>
    `;
  }
}
