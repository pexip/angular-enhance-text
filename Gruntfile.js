/**
 * Copyright (c) 2013, Bernhard Posselt <dev@bernhard-posselt.com>
 * This file is licensed under the Affero General Public License version 3 or later.
 * See the COPYING file.
 */
module.exports = function(grunt) {

    // load needed modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        meta: {
            pkg: grunt.file.readJSON('package.json'),
            version: '<%= meta.pkg.version %>',
            production: 'build/'
        },
        concat: {
            options: {
                // remove license headers
                stripBanners: true
            },
            dist: {
                src: [
                    'app/app.js',
                    'app/filters/**/*.js',
                ],
                dest: '<%= meta.production %>angular-enhance-text.js'
            }
        },
        uglify: {
            build: {
                src: ['<%= meta.production %>angular-enhance-text.js'],
                dest: '<%= meta.production %>angular-enhance-text.min.js',
            }
        },
        wrap: {
            basic: {
                src: ['<%= meta.production %>angular-enhance-text.js'],
                dest: '<%= meta.production %>angular-enhance-text.js',
                options: {
                    wrapper: [
                        '(function(angular){\n\n\'use strict\';\n\n',
                        '\n})(angular, undefined);'
                    ]
                }
            }
        },
        jshint: {
            all: [
                '**/*.js',
                '!build/**/*',
                '!coverage/**/*',
                '!bower_components/**/*',
                '!node_modules/**/*'
            ],
            options: {
                jshintrc: true
            }
        },
        watch: {
            concat: {
                files: [
                    'tests/**/*.js',
                    'app/**/*.js'
                ],
                tasks: ['default']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
                preprocessors: {
                    'app/**/*.js': 'coverage'
                },
                coverageReporter: {
                    type: 'lcovonly',
                    dir: 'coverage/',
                    file: 'coverage.lcov'
                },
                reporters: ['coverage']
            }
        }
    });

    // make tasks available under simpler commands
    grunt.registerTask('default', ['jshint', 'concat', 'wrap', 'uglify']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('ci', ['default', 'karma:continuous']);

};