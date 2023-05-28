const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#F9F4EE',
				foreground: '#000000',
				backgroundSecondary: '#fcfaf7',
			},
		},
		screens: {
			xs: { max: '475px' },
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
