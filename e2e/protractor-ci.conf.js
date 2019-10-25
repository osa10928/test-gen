const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headleass', '--no-sandbox', '--disable-gpu']
  }
};

exports.config = config;
