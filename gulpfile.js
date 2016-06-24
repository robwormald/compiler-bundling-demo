//simple gulp tasks
var gulp = require('gulp');
var Builder = require('systemjs-builder');
var exec = require('child_process').exec;
var del = require('del');

//list of components
var components = [
	'component-one',
	'component-two'
];

function clean(){
	return del([
		'dist/**',
		'generated/**'
	]);
}

function precompile(cb){
	exec('./node_modules/.bin/ngc -p src', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
}

function compile(cb){
	exec('./node_modules/.bin/tsc', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
}

function copy_src(){
	return gulp.src(['src/**/*.ts'])
	  .pipe(gulp.dest('generated'));
}

function copy_deps(){
	return gulp.src([
		'node_modules/reflect-metadata/Reflect.js',
		'node_modules/zone.js/dist/zone.min.js',
		'node_modules/systemjs/dist/system.js'])
	  .pipe(gulp.dest('bundles'));
}

function loadConfig(builder){
	return builder.loadConfig('system.config.js')
	  .then(() => builder);
}

function computeMainDependencies(path){
  return function(builder){
	  return builder.trace(path);
  }
}

function computeComponentBundles(builder, loaderTree){
	var traceComponentTrees = Promise.all(components.map(componentName => builder.trace(`components/${componentName}.ngfactory`)));

	return traceComponentTrees.then(componentTrees => {

		var commonTree = builder.intersectTrees(...componentTrees.concat(loaderTree));

		return Promise.all(componentTrees.map((componentTree, i) => {
			return builder.bundle(builder.subtractTrees(componentTree, commonTree), `bundles/components/${components[i]}.js`, {minify: true, mangle: true, rollup: true})
		}))
		.then(() => {
			return builder.bundle(loaderTree, 'bundles/loader.js', {minify: true, mangle: true, rollup: true})
		})

	})




	return ;
}

function computeBundles(){

	var builder = new Builder();

	return loadConfig(builder)
	  .then(computeMainDependencies('loader'))
	  .then(componentTree => computeComponentBundles(builder, componentTree))
	  .then(loaderTree => {



	  })
}





gulp.task('precompile', ['copy:src'], precompile);
gulp.task('compile', ['precompile'], compile);
gulp.task('copy:src', ['clean'], copy_src);
gulp.task('copy:deps', copy_deps);
gulp.task('clean', clean);
gulp.task('bundle', ['compile', 'copy:deps'], computeBundles)
