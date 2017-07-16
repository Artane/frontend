import { inject } from '../../helpers/g.js';

import style from './work-detail.css';

export default function (work) {
	return inject(require('./work-detail.html'), work);
}
