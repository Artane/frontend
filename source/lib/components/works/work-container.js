import { inject } from '../../helpers/g.js';

import style from './work-container.css';

export default function (id, children) {
	return inject(require('./work-container.html'), { id, children });
}
