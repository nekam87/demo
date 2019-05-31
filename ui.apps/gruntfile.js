//see documentation: https://github.com/gruntjs/grunt-contrib-sass

module.exports = function(grunt) {
    var sourceScssPath = "./src/main/content/jcr_root/apps/demo/components/";

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: sourceScssPath,
                    src: ['**/*.scss'],
                    ext: '.css',
                    dest: sourceScssPath,
                    rename: function (dest, src) {
                        var filename = src.replace(/^.*[\\\/]/, '');
                        var newDest = src.substring(0, src.lastIndexOf('/')) + "/";

                        grunt.log.write('changed scss file detected: \n');

                        newDest = newDest.replace('/scss/', '/css/');

                        grunt.log.write('compiled in path: ', dest + newDest + filename, '\n');

                        return dest + newDest + filename;
                    }
                }]
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass','postcss']
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['> 1%',
                            'last 3 versions',
                            'ie >= 10'],
                        cascade: false,
                        grid: true
                    }), // add vendor prefixes
                ]
            },
            dist: {
                src: ['**/css/*.css','!**/clientlibs-vendor/css/*.css']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.task.registerTask('scsscompile', ['sass', 'postcss']);

};