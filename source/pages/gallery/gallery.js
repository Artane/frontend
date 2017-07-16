import * as G from '../../lib/helpers/g.js';

import style from './gallery.css';

import Navbar from '../../lib/components/nav/navbar.js';
import NavbarFloat from '../../lib/components/nav/navbar-float.js';
import NavbarButton from '../../lib/components/nav/navbar-button.js';
import NavbarInput from '../../lib/components/nav/navbar-input.js';
import NavbarDropdown from '../../lib/components/nav/navbar-dropdown.js';

import Work from '../../lib/components/works/work.js';
import WorkContainer from '../../lib/components/works/work-container.js';

var dropdownConfig = require('./dropdown-data.json');

var _works = [];
var _search_box_value = '';

var filter = {};

var galleryHTML = require('./gallery.html');

export default function Gallery(works, container) {
	var prepDropdownOptions = function(option) {
		return {
			id: G.deleteWhitespace(option).toLowerCase(),
			label: option,
			events: {
				onclick: onDropdownClicked
			}
		};
	};

	var generatedFilterDropdowns = G.keys(dropdownConfig).map(function (dropdownName) {
		var dropdownOptions = dropdownConfig[dropdownName];
		return NavbarDropdown(G.deleteWhitespace(dropdownName).toLowerCase() + 'Dropdown', dropdownName, dropdownOptions.map(prepDropdownOptions));
	}).join('');

	var generatedNavbarItems = [
		NavbarInput('searchBox', '', 'Search...', {
			onkeypress: function (event) {
				event.key === 'Enter' ? onSearchActivated() : null
			}
		}),
		NavbarButton('filterButton', 'Go', { onclick: onSearchActivated }),
		generatedFilterDropdowns
	];

	var generatedNavbar = Navbar(NavbarFloat('left', generatedNavbarItems));

	var populateChildren = {};
	if (works) {
		var generatedWorks = WorkContainer(G.generate(works, Work).join(''));
		populateChildren = { 'children' : generatedWorks };
	}

	document.title = 'Gallery | LTS Art';
	return G.inject(galleryHTML, G.join({ 'filterbar' : generatedNavbar }, populateChildren));
}

function onSearchActivated() {
	filter.title = event.target.value;
	getFilteredWorks(filter);
}

function onDropdownClicked(event) {
	event.target.className += ' selected';

	var type = event.target.parentElement.parentElement.querySelector('button').innerText;

	var content = event.target.parentElement;
	G.slice(content.children).forEach(function(dropdownOption) {
		if (dropdownOption.innerText !== event.target.innerText) {
			dropdownOption.className = dropdownOption.className.replace(RegExp('(selected)', 'g', ''));
		}
	});

	if (event.target.innerText !== 'Any') {
		filter[type] = event.target.innerText;
	} else {
		delete filter[type];
	}

	getFilteredWorks(filter);
}

function getFilteredWorks(filterParams) {
	_get_works(filterParams).then(function (filteredWorkList) {
		var generatedWorks = G.generate(filteredWorkList, Work).join('');
		G.get('#workContainer').innerHTML = generatedWorks;
	});
};

function _get_works(params) {
	var queryString = '';
	if (params) {
		_works = [];
		var paramKeys = G.keys(params);
		var keyVals = paramKeys.map(function(key) {
			return key + '=' + params[key];
		});
		queryString = '?' + keyVals.join('&');
	}

	return new Promise(function (res, rej) {
		fetch('http://localhost:13001' + queryString).then(function (response) {
			return response.json();
		}).then(function (reply) {
			_works = reply.message;
			res(_works);
		});
	});
}

G.onNewElement('gallery', function (gallery) {
	_get_works().then(function (workList) {
		var generatedWorks = WorkContainer('workContainer', G.generate(workList, Work).join(''));

		// going to search for {children} and replace
		G.inject(gallery, { 'children' : generatedWorks });
	});
});
