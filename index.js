// IMPORTS /////////////////////////////////////////////////////////////////////

var stylus  = require('stylus');

// GOBBLE GOBBLE GOBBLE ////////////////////////////////////////////////////////

function gobbleStylus(input, opts) {
	opts       = opts || {};
	opts.defs  = opts.defs || {};
	opts.paths = opts.paths || [];

	if (!('sourcemap' in opts) || opts.sourcemap === true)
		opts.sourcemap = {};

	var renderer = stylus(input, opts);

	for (var key in opts.defs)
		renderer.define(key, opts.defs[key]);

	// Despite what it may look like (nodeback, event emitters...), the stylus
	// API’s async trappings are a sham -- everything is same-tick. Well, I
	// assume it was a future-proofing measure? It actually makes our lives
	// easier, but I wish I’d realized before I wrote the first version of this
	// as a directory-style async gobble plugin :(

	var css = renderer.render();
	var map = renderer.sourcemap;

	return {
		code: css,
		map: map
	};
};

gobbleStylus.defaults = {
	accept: [ '.styl', '.stylus' ],
	ext: '.css'
};

module.exports = gobbleStylus;
