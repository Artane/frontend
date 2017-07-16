import * as G from '../../lib/helpers/g.js';

import style from './blog.css';

var blogHTML = require('./blog.html');
var previewPostHTML = require('./preview-post.html');

export default function () {
	document.title = "Blog | LTS Art";
	return blogHTML;
}

function _PostPreview(data) {
	return G.inject(previewPostHTML, data);
}

function _get_posts() {
	return new Promise(function (res, rej) {
		fetch('http://localhost:14001').then(function (response) {
			return response.json();
		}).then(function (reply) {
			console.log(reply);
			res(reply.message);
		});
	});
}

G.onNewElement('blog', function (blog) {
	_get_posts().then(function (postList) {
		G.inject(blog, { 'posts' : postList.map(_PostPreview).join('') });
	});
});
