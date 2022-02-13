const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy')

module.exports = function(config) {

  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "preview",
    functionsDir: "./netlify/functions/",
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "layouts",
      includes: "components"
    }
  }
}