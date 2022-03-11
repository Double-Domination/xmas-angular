import { DOMFactory, IDOMNodeConstructor } from './dom-factory';
// entry point

import { HeaderBlockView } from '../components/header-block/header-block';
import { FooterBlockView } from '../components/footer-block/footer-block';

import RouterController from './router';
import { StateDriver } from './state-driver';

class App extends DOMFactory {
  router: RouterController;

  constructor(recived: IDOMNodeConstructor) {
    super(recived);
    // router init
    this.router = new RouterController();

    // header block
    const headerBlock = new HeaderBlockView({
      recivedRoutes: ['start', 'toys', 'tree'],
    });
    headerBlock.renderElement(this.domNode);

    // router wrapper
    this.router.page.renderElement(this.domNode);

    // footer block
    const footerBlock = new FooterBlockView();
    footerBlock.renderElement(this.domNode);

    // utility section
    
    // window.onload = function () {
    //   console.log('READY');
    // };

    console.log(StateDriver.getAllStates());
  }
}

export default App;
