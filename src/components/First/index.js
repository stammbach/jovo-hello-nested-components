const { ComponentPlugin } = require('jovo-framework');
const Nested = require('../Nested');

class First extends ComponentPlugin {
  constructor(config) {
    super(config);

    this.handler = require('./src/handler');
    this.config = require('./src/config');

    this.useComponents(new Nested());
  }
}

module.exports = First;