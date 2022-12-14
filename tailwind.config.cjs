/** @type {import('tailwindcss').Config} */

module.exports = {
	prefix: 'tw-',
	corePlugins: {
		preflight: false
	},
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
