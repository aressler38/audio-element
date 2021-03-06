module.exports = function( grunt ) {
    "use strict";

    function readOptionalJSON( filepath ) {
        var data = {};
        try {
            data = grunt.file.readJSON( filepath );
        } catch ( e ) {}
        return data;
    }

    var srcHintOptions = readOptionalJSON( "src/.jshintrc" );

    // The concatenated file won't pass onevar
    // But our modules can
    delete srcHintOptions.onevar;

    grunt.initConfig({
        pkg: grunt.file.readJSON( "package.json" ),
        dst: readOptionalJSON( "dist/.destination.json" ),
        build: {
            all: {
                dest: "dist/audio-element.js",
                minimum: [
                    "core"
                ]
            }
        },
        jsonlint: {
            pkg: {
                src: [ "package.json" ]
            },
            jscs: {
                src: [ ".jscs.json" ]
            },
            bower: {
                src: [ "bower.json" ]
            }
        },
        jshint: {
            all: {
                src: [
                    "src/**/*.js", "Gruntfile.js", "test/**/*.js", "build/tasks/*",
                    "build/{bower-install,release-notes,release}.js"
                ],
                options: {
                    jshintrc: true
                }
            },
            dist: {
                src: "dist/audio-element.js",
                options: srcHintOptions
            }
        },
        jscs: {
            src: "src/**/*.js",
            gruntfile: "Gruntfile.js",
            tasks: "build/tasks/*.js"
        },
        uglify: {
            all: {
                files: {
                    "dist/audio-element.min.js": [ "dist/audio-element.js" ]
                },
                options: {
                    preserveComments: "some",
                    sourceMap: "dist/audio-element.min.map",
                    sourceMappingURL: "audio-element.min.map",
                    report: "min",
                    beautify: {
                        ascii_only: true
                    },
                    compress: {
                        hoist_funs: false,
                        loops: false,
                        unused: false
                    }
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    require( "load-grunt-tasks" )( grunt );

    // Integrate specific tasks
    grunt.loadTasks( "build/tasks" );

    // Short list as a high frequency watch task
    grunt.registerTask( "dev", [ "build:*:*", "jshint", "jscs" ] );

    // Default grunt
    grunt.registerTask( "default", [ "build", "uglify" ] );
    
};
