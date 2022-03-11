import './_tree-page.scss';

import { DOMFactory } from '../../models/dom-factory';

/**
 *  Builds tree page
 */
export class TreePage extends DOMFactory {
  constructor() {
    super({
      tagName: 'div',
      className: 'tree-page',
      nodeContent: 'UNDER CONSTRUCTION',
    });
  }
}
