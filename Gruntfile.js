/* jshint node: true, laxcomma: true */
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          mocha: require('mocha')
        , reporter: 'spec'
        , growl: true
        , require: [
            'coffee-script/register'
          , 'test/_support/common'
          ]
        }
      , src: [
          'test/**/*.coffee'
        , 'test/**/*.js'
        , '!test/_support/**'
        ]
      }
    }

  , copy: {
      js: {
        files: [{expand: true, cwd: 'src', src: 'js/**/*.js', dest: 'demo', filter: 'isFile'}]
      }
    , css: {
        files: [{expand: true, cwd: 'src', src: 'css/**/*.css', dest: 'demo', filter: 'isFile'}]
      }
    }

  , coffee: {
      compile: {
        options: {
          sourceMap: true
        }
      , files: [{
          expand: true
        , cwd: 'src'
        , src: '**/*.coffee'
        , dest: 'demo'
        , ext: '.js'
        }]
      }
    }

  , jade: {
      compile: {
        options: {
          pretty: true
        }
      , files: [{
          expand: true
        , cwd: 'src'
        , src: '*.jade'
        , dest: 'demo'
        , ext: '.html'
        }]
      }
    }

  , sass: {
      compile: {
        options: {
          sourcemap: true
        }
      , files: [{
          expand: true
        , cwd: 'src'
        , src: 'css/*.sass'
        , dest: 'demo'
        , ext: '.css'
        }]
      }
    }

  , watch: {
      test: {
        files: ['test/**/*.coffee', 'test/**/*.js']
      , tasks: ['test']
      }
    , js: {
        files: ['src/js/**/*.js']
      , tasks: ['copy:js', 'test']
      }
    , coffee: {
        files: ['src/js/**/*.coffee']
      , tasks: ['coffee', 'test']
      }
    , css: {
        files: ['src/css/**/*.css']
      , tasks: ['copy:css']
      }
    , sass: {
        files: ['src/css/*.sass']
      , tasks: ['sass']
      }
    , jade: {
        files: ['src/*.jade']
      , tasks: ['jade']
      }
    }

  , browserSync: {
      dev: {
        bsFiles: {
          src: ['demo/**/*', '!demo/**/*.map']
        }
      }
    , options: {
        watchTask: true
      , server: {
          baseDir: '.'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('test', 'mochaTest');
};
