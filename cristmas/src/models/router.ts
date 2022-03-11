import { DOMFactory } from './dom-factory';

import { StartPage } from '../templates/start-page/start-page';
import { ToysPage } from '../templates/toys-page/toys-page';
import { TreePage } from '../templates/tree-page/tree-page';

class RouterController {
  page: DOMFactory;

  private defaultPageId = 'start';

  private PageIDList: { [key: string]: DOMFactory } = {
    start: new StartPage(),
    toys: new ToysPage(),
    tree: new TreePage(),
  };

  constructor() {
    // set default route hash
    if (!window.location.hash) {
      window.location.hash = `#${this.defaultPageId}`;
    }

    // set router wrapper default representation
    this.page = new DOMFactory({
      className: 'route-wrap',
      nodeContent: 'CONTENT IS LOADING',
    });

    this.renderNewPageHandler();
    this.enableRouteChange();
  }

  renderNewPageHandler(idPage: string = this.defaultPageId) {
    const tmpPage = this.PageIDList[idPage];
    if (typeof tmpPage === 'undefined') {
      throw new Error(`cant find ${idPage}`);
    }

    this.page.domNode.replaceChildren(tmpPage.domNode);
  }

  enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPageHandler(hash);
    });
  }
}

export default RouterController;
