import './styles-general.scss';
import App from './models/app';

const rootElement = document.querySelector('#root') as HTMLElement;
const app = new App({ className: 'general-wrapper' });
rootElement.appendChild(app.domNode);
