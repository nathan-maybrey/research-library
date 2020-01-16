const { parallel } = require('gulp');

const sass = require('./sass');
const scripts = require('./scripts');

exports.default = parallel(sass.default, scripts.default);