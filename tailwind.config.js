const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#126160',
				background: '#F9F4EE',
				foreground: '#000000',
				backgroundSecondary: '#fcfaf7',
				light: '#fffcf7',
			},
		},
		screens: {
			xs: { max: '475px' },
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
