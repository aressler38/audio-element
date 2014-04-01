module.exports = function( grunt ) {
    "use strict";
    var fs = require( "fs" );
    var requirejs = require( "requirejs" );
    var rdefineEnd = /\}\);[^}\w]*$/;

    var config = {
            baseUrl: "src",
            name: "audio-element",
            out: "dist/audio-element.js",
            optimize: "none",
            // Include dependencies loaded with require
            findNestedDependencies: true,
            // Avoid breaking semicolons inserted by r.js
            skipSemiColonInsertion: true,

            wrap: {
                startFile: "src/header.part",
                endFile: "src/footer.part"
            },

            paths: {
            },

            //rawText: {},

            onBuildWrite: convert
    };


    /**
     * Strip all definitions generated by requirejs
     * Convert "var" modules to var declarations
     * "var module" means the module only contains a return statement that should be converted to a var declaration
     * This is indicated by including the file in any "var" folder
     * @param {String} name
     * @param {String} path
     * @param {String} contents The contents to be written (including their AMD wrappers)
     */
    function convert( name, path, contents ) {
        var amdName;
        // Convert var modules
        if ( /.\/var\//.test( path ) ) {
            contents = contents
                .replace( /define\([\w\W]*?return\s/, "var " + (/var\/([\w-]+)/.exec(name)[1]) + " = " )
                .replace( rdefineEnd, "" );
        }
        else {
            // Ignore audio-element's exports (the only necessary one)
            if ( name !== "audio-element" ) {
                contents = contents
                    .replace( /\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, "$1" )
                    // Multiple exports
                    .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );
            }

            // Remove define wrappers, closure ends, and empty declarations
            contents = contents
                .replace( /define\([^{]*?{/, "" )
                .replace( rdefineEnd, "" );

            // Remove anything wrapped with
            // /* ExcludeStart */ /* ExcludeEnd */
            // or a single line directly after a // BuildExclude comment
            contents = contents
                .replace( /\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "" )
                .replace( /\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "" );

            // Remove empty definitions
            contents = contents
                .replace( /define\(\[[^\]]+\]\)[\W\n]+$/, "" );
        }
        // AMD Name
        if ( (amdName = grunt.option( "amd" )) !== null && /^exports\/amd$/.test( name ) ) {
            if (amdName) {
                grunt.log.writeln( "Naming audio-element with AMD name: " + amdName );
            } else {
                grunt.log.writeln( "AMD name now anonymous" );
            }
            // Remove the comma for anonymous defines
            contents = contents
                .replace( /(\s*)"audio-element"(\,\s*)/, amdName ? "$1\"" + amdName + "\"$2" : "" );

        }
        return contents;
    }

    grunt.registerMultiTask(
        "build",
        "run a build",
    function() {
        var done = this.async();
        // Trace dependencies and concatenate files
        requirejs.optimize(config, function( response ) {
            done();
        }, function( err ) {
            done( err );
        });
    });
};
