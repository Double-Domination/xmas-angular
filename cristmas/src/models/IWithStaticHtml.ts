type DomWithStaticHtmlInitializer = {
  //abstract interface
  // [index: string]: any;
};

export interface IDomWithStaticHtml {
  htmlInit(init: DomWithStaticHtmlInitializer): void;
}
