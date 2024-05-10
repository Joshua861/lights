const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		typography,
		require('@catppuccin/tailwindcss')({
			defaultFlavour: 'mocha'
		})
	],

	safelist: ['grid-cols-5', 'grid-cols-9', 'bg-surface1', 'bg-text']
};

module.exports = config;
