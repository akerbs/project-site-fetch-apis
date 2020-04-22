const argv = require('yargs').argv;

const productionMode = !!(process.env.NODE_ENV === 'production' || argv.prod);

const mode = {
  prod: productionMode,
  dev: !productionMode
};

// NodeJS specific export obj as module
module.exports = mode;
