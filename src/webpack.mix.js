const mix = require('laravel-mix');
require('laravel-mix-bundle-analyzer');

mix.webpackConfig({
	resolve: {
		extensions : ['.js','.vue'],
		alias : {
			'@' : __dirname + '/resources',
		}
	}
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

if (!process.argv.includes('--hot')) {
    mix.version();
}

if (!mix.inProduction()) {
    mix.bundleAnalyzer({
	    openAnalyzer: false,
	});
}

// mix.options({
//     hmrOptions: {
//         host: 'localhost',
//         port: '3311'
//     }
// });