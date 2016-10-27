function pathRewirte(options) {
  // Configure your plugin with options...
}

pathRewirte.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
        for (var i = 0; i < htmlPluginData.assets.js.length; i++) {
            htmlPluginData.assets.js[i] = htmlPluginData.assets.js[i].replace('/public','');
        }
        for (var i = 0; i < htmlPluginData.assets.css.length; i++) {
            htmlPluginData.assets.css[i] = htmlPluginData.assets.css[i].replace('/public','');
        }
        callback(null, htmlPluginData);
    });
  });

};

module.exports = pathRewirte;