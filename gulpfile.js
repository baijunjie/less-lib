var gulp = require('gulp'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
	less = require('gulp-less');

var srcPath = ['./less/*.less', '!./less/_*.less'];
    distPath = './css/',
    watchPath = './less/**/*.less';

gulp.task('lessClean', function () {
	return gulp.src(distPath, { read: false, allowEmpty: true })
		.pipe(clean({ force: true }));
});

gulp.task('less', gulp.series('lessClean', function() {
    return gulp.src(srcPath)
        // 当编译时出现语法错误或者其他异常，会终止watch事件，通常需要查看命令提示符窗口才能知道，这并不是我们所希望的，
        // 所以我们需要处理出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）。
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less({ javascriptEnabled: true }))
        .pipe(gulp.dest(distPath));
}));

// 监听文件修改
gulp.task('lessWatch', gulp.series('less', function() {
	gulp.watch(watchPath, gulp.parallel('less'));
}));

gulp.task('default', gulp.parallel('lessWatch'));