import Container from '../lib/components/container/container.js';

import Blog from './blog/blog.js';
import BlogPost from './blog-post';
import Gallery from './gallery/gallery.js';
import GalleryDetail from './gallery-detail/gallery-detail.js';
import Landing from './landing/landing.js';
import About from './about/about.js';

export default {
	blog: {
		url: 'blog',
		component: function () { return Container(Blog()) }
	},
	blog_post: {
		url: /(blog)\/\d/,
		component: function () { return Container(BlogPost()) }
	},
	gallery: {
		url: 'gallery',
		component: function () { return Container(Gallery()) }
	},
	gallery_detail: {
		url: /(gallery)\/\d/,
		component: function () { return Container(GalleryDetail()) }
	},
	about: {
		url: 'about',
		component: function () { return Container(About()) }
	},
	landing: {
		url: '',
		component: function () { return Container(Landing()) }
	}
}
