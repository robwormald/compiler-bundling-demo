System.config({
	transpiler: 'typescript',
	map: {
		'@angular': 'node_modules/@angular',
		'rxjs': 'node_modules/rxjs',
		'components': 'dist/components',
		'loader': 'dist',
		'typescript': 'node_modules/typescript/lib/typescript.js'
	},
	paths: {
		'@angular/*': 'node_modules/@angular/*',
		'rxjs/*': 'node_modules/rxjs/*',
		'components/*': 'dist/components/*',
		'main/*': 'dist/*'
	},
	packages: {
		'loader': {
			main: 'main.js',
			defaultExtension: 'js'
		},
		'components': {
			defaultExtension: 'js'
		},
		'@angular/core': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/common': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/compiler': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/platform-browser': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/platform-browser-dynamic': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		}
	}
});
