import htmlTemplateConverter from './html-template-converter';

export type IDOMNodeConstructor = {
  tagName?: string;
  className?: string;
  nodeContent?: string;
  useTemplate?: string;
};

export class DOMFactory<NodeType extends HTMLElement = HTMLElement> {
  public domNode: NodeType;

  constructor(DOMInitialParam?: IDOMNodeConstructor) {
    const el = document.createElement(DOMInitialParam?.tagName || 'div');
    el.className = DOMInitialParam?.className || '';
    el.textContent = DOMInitialParam?.nodeContent || '';

    this.domNode = el as NodeType;

    if (DOMInitialParam?.useTemplate) {
      const constructedMarkup = htmlTemplateConverter(
        DOMInitialParam.useTemplate
      ) as HTMLElement;
      this.domNode.appendChild(constructedMarkup);
    }
  }

  destroyDomElement(): void {
    this.domNode.remove();
  }

  renderElement(parentDomNode: HTMLElement): void {
    parentDomNode.append(this.domNode);
  }
}
