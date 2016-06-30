System.config({
	transpiler: 'typescript',
	map: {
		'@angular': 'node_modules/@angular',
		'@angular/core': 'node_modules/@angular/core/esm',
		'@angular/common': 'node_modules/@angular/common/esm',
		'@angular/forms': 'node_modules/@angular/forms/esm',
		'@angular/platform-browser': 'node_modules/@angular/platform-browser/esm',
		'rxjs': 'node_modules/rxjs',
		'components': 'dist/components',
		'app': 'dist',
		'typescript': 'node_modules/typescript/lib/typescript.js',
		'@ngrx/store': 'node_modules/@ngrx/store',
		'@ngrx/core': 'node_modules/@ngrx/core'
	},
	paths: {
		'@angular/*': 'node_modules/@angular/*',
		'rxjs/*': 'node_modules/rxjs/*',
		'components/*': 'dist/components/*',
		'main/*': 'dist/*'
	},
	packages: {
		'app': {
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
		'@angular/forms': {
			defaultExtension: 'js',
			main: 'index.js'
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
		},
		'@ngrx/store': {
			defaultExtension: 'js',
			main: 'index.js'
		},
		'@ngrx/core': {
			defaultExtension: 'js',
			main: 'index.js'
		},

	}
});
