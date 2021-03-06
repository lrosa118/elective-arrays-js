// var chai = require('chai')
global.expect = require('expect')

const babel = require('babel-core');
const jsdom = require('jsdom');
const path = require('path');

before(function(done) {
  const babelResult = babel.transformFileSync(path.resolve(__dirname, '..', 'arrays.js'), {
    presets: ['es2015']
  });

  jsdom.env(path.resolve(__dirname, '..', 'index.html'), [], {src: babelResult.code}, (err, window) => {
    if (err) {
      return done(err);
    }

    Object.keys(window).forEach(key => {
      global[key] = window[key];
    });

    return done();
  });
});
