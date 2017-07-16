import { inject, onNewElement } from '../../lib/helpers/g.js';

import style from './gallery-detail.css';

import WorkDetail from '../../lib/components/works/work-detail.js'

export default function () {
	return require('./gallery-detail.html');
}

function _get_work() {
	var workId = window.location.hash.split('gallery/')[1];
	return new Promise(function (res, rej) {
		fetch('http://localhost:13001/' + workId).then(function (response) {
			return response.json();
		}).then(function (reply) {
			res(reply.message[0]);
		});
	});
}

onNewElement('galleryDetail', function (galleryDetail) {
	_get_work().then(function (work) {
		document.title = work.title + ' | LTS Art';
		inject(galleryDetail, { 'workDetail' : WorkDetail(work) });
	});
});
