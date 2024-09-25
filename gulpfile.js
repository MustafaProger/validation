const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
});

gulp.task('default', gulp.parallel('server'));