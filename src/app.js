import { render } from 'react-dom';

import 'psychic-ui/dist/psychic-min.css';
import './style.css';

import routes from './router';

const mountNode = document.body;

render(routes, mountNode);
