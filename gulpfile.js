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

//clean the temp dirs
function clean(){
	return del([
		'dist/**',
		'generated/**'
	]);
}

//run angular's compiler
function precompile(cb){
	exec('./node_modules/.bin/ngc -p src', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
}

//run tsc
function compile(cb){
	exec('./node_modules/.bin/tsc', function(err, stdout, stderr){
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
}

//copy the sources next to the generated
function copy_src(){
	return gulp.src(['src/**/*.ts'])
	  .pipe(gulp.dest('generated'));
}

//copy deps
function copy_deps(){
	return gulp.src([
		'node_modules/reflect-metadata/Reflect.js',
		'node_modules/zone.js/dist/zone.min.js',
		'node_modules/systemjs/dist/system.js'])
	  .pipe(gulp.dest('bundles'));
}

//load the system config
function loadConfig(builder){
	return builder.loadConfig('system.config.js')
	  .then(() => builder);
}

//
function computeMainDependencies(path){
  return function(builder){
	  return builder.trace(path);
  }
}

function computeComponentBundles(builder, loaderTree){
	//trace the deps for each component
	var traceComponentTrees = Promise.all(components.map(componentName => builder.trace(`components/${componentName}.ngfactory`)));

    //wait for that to complete...
	return traceComponentTrees.then(componentTrees => {

		//combine the loader tree and the components
		var commonTree = builder.intersectTrees(...componentTrees.concat(loaderTree));

        //for each component....
		return Promise.all(componentTrees.map((componentTree, i) => {
			//bundle the unique dependencies for each and write to disk
			return builder.bundle(builder.subtractTrees(componentTree, commonTree), `bundles/components/${components[i]}.js`, {minify: true, mangle: true, rollup: true})
		}))
		.then(() => {
			//write the loader/deps bundle to disk
			return builder.bundle(loaderTree, 'bundles/loader.js', {minify: true, mangle: true, rollup: true})
		})

	});
}


//main task to write all bundles
function computeBundles(){

	var builder = new Builder();

	return loadConfig(builder)
	  .then(computeMainDependencies('loader'))
	  .then(componentTree => computeComponentBundles(builder, componentTree));
}

function bundle(){
	var builder = new Builder();
	return builder.loadConfig('system.config.js')
	  .then(() => builder.buildStatic('app', 'dist/app.js', {minify: true, mangle: true, rollup: true}))
}





gulp.task('precompile', ['copy:src'], precompile);
gulp.task('compile', ['precompile'], compile);
gulp.task('copy:src', ['clean'], copy_src);
gulp.task('copy:deps', copy_deps);
gulp.task('clean', clean);
gulp.task('bundle', ['compile', 'copy:deps'], bundle)
