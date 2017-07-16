import style from './landing.css';

import { onNewElement } from '../../lib/helpers/g.js';

export default function () {
	document.title = 'LTS Art';
	return require('./landing.html');
}
