'use strict';

var image = require('./image');

var container = function container(options) {
  if (!options) {
    throw new Error('Options are missing.');
  }

  if (!options.configuration) {
    throw new Error('Configuration is missing.');
  }

  if (!options.env) {
    throw new Error('Environment is missing.');
  }

  if (!options.sharedKey) {
    throw new Error('Shared key is missing.');
  }

  if (options.persistData === undefined) {
    throw new Error('Persist data is missing.');
  }

  if (options.debug === undefined) {
    throw new Error('Debug is missing.');
  }
  /* eslint-disable no-unused-vars */


  var configuration = options.configuration,
      env = options.env,
      sharedKey = options.sharedKey,
      persistData = options.persistData,
      debug = options.debug;
  /* eslint-enable no-unused-vars */

  var selectedEnvironment = configuration.environments[env];
  var result = {
    image: "thenativeweb/wolkenkit-mongodb",
    name: "".concat(configuration.application, "-mongodb"),
    env: {
      MONGODB_DATABASE: 'wolkenkit',
      MONGODB_USER: 'wolkenkit',
      MONGODB_PASS: sharedKey
    },
    labels: {
      'wolkenkit-api-host': selectedEnvironment.api.address.host,
      'wolkenkit-api-port': selectedEnvironment.api.address.port,
      'wolkenkit-application': configuration.application,
      'wolkenkit-debug': debug,
      'wolkenkit-persist-data': persistData,
      'wolkenkit-shared-key': sharedKey,
      'wolkenkit-type': image().type
    },
    networks: ["".concat(configuration.application, "-network")],
    networkAlias: 'liststore',
    ports: {
      27017: selectedEnvironment.api.address.port + 2
    },
    restart: 'always'
  };

  if (persistData) {
    result.volumes = ["".concat(configuration.application, "-mongodb-volume:/data/db")];
  }

  return result;
};

module.exports = container;