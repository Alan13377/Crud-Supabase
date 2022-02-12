import preprocess from 'svelte-preprocess';
const netlify = require('@sveltejs/adapter-netlify')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: netlify(),
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
