import { inject } from '../../helpers/g.js';

import style from './work.css';

export default function (work) {
	return inject(require('./work.html'), work);
}
