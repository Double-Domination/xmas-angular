import './base-button.scss';

import RecivedHtmlTemplate from './base-button-template.html'; //TODO: add This functions to DOMFACTORY
import HtmlTemplateConverter from '../../models/html-template-converter';

import { DOMFactory } from '../../models/dom-factory';

export class NewGenericElement extends DOMFactory {
  constructor() {
    super({
      className: 'recived-from-template',
    });

    const genericButton = HtmlTemplateConverter(
      RecivedHtmlTemplate
    ) as HTMLElement;

    const innerMid = genericButton.querySelector('.middle') as HTMLElement;
    innerMid.innerHTML = 'GOT IT';
    this.domNode.append(genericButton);
    // genericButton.innerHTML = 'ffff';
  }
}
