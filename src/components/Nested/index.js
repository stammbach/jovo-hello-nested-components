const { ComponentPlugin } = require('jovo-framework');

class Nested extends ComponentPlugin {
  constructor(config) {
    super(config);

    this.handler = require('./src/handler');
    this.config = require('./src/config');
  }
}

module.exports = Nested;