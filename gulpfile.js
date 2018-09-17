var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');
// var babel = require('gulp-babel');
// var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
//scripts task 
gulp.task('scripts', function(){
	gulp.src('./js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'))
});

//images task 
// gulp.task('images',function(){
// 	gulp.src('./img/*.jpg')
// 	.pipe(imagemin([
// 		imagemin.jpegtran({progressive: true})
// 	]))
// 	.pipe(gulp.dest('./dist/img'));
// });

//css task
gulp.task('minify-css',() => {
	return gulp.src('./css/*.css')
	  .pipe(sourcemaps.init())
	  .pipe(cleanCSS())
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('dist/css'));
  });

  gulp.task('watch',function(){
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('css/*.css',['minify-css']);
  });

gulp.task('default', ['minify-css','scripts','watch']);