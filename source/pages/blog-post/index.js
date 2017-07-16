import * as G from '../../lib/helpers/g.js';

import style from './blog-post.css';

var blogPostHTML = require('./blog-post.html');

export default function BlogPost() {
	return blogPostHTML;
}

function _PostContent(data) {
	return G.inject('<div id="post" class="post" src="{url}?embedded=true">{content}</div>', data);
}

function resizeIframe(event) {
	var iframe = event.target;
	iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

function _get_post() {
	var postId = window.location.hash.split('blog/')[1];
	return new Promise(function (res, rej) {
		fetch('http://localhost:14001/' + postId + '?content=true').then(function (response) {
			return response.json();
		}).then(function (reply) {
			res(reply.message[0]);
		});
	});
}

G.onNewElement('blogPost', function (blogPost) {
	_get_post().then(function (post) {
		document.title = post.title + ' | LTS Art';
		var postElementId = 'post';
		G.inject(blogPost, {
			blogDetail: _PostContent(G.join(post, { id: postElementId }))
		});
	});
});
