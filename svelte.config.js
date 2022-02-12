import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
const netlify = require('@sveltejs/adapter-netlify')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		vite: {
      	define: {
        'process.env': process.env,
      },
    },
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
