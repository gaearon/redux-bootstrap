module.exports = function (config) {
  "use strict";

  config.set({
    singleRun: false,
    basePath: "",
    frameworks: ["mocha", "chai"],
    browsers: [
        "PhantomJS"
    ],
    reporters: ["mocha", "coverage"],
    coverageReporter: {
      check: {
        global: {
          statements: 0,
          branches: 0,
          functions: 0,
          lines: 0,
          excludes: [
            "node_modules/**/*.js"
          ]
        },
        each: {
          statements: 0,
          branches: 0,
          functions: 0,
          lines: 0,
          excludes: [
            "node_modules/**/*.js"
          ]
        }
      }
    },
    plugins : [
        "karma-mocha-reporter",
        "karma-coverage",
        "karma-mocha",
        "karma-chai",
        "karma-phantomjs-launcher"
    ],
    preprocessors: {
      "temp/bundle/index.js" :  ["coverage"]
    },
    files : [
        { pattern: "temp/bundle/index.js", included: true }
    ],
    port: 9876,
    colors: true,
    autoWatch: false,
    logLevel: config.LOG_INFO
  });
};
