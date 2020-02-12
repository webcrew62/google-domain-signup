// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs-extra');
const path = require('path');

const getConfigurationByFile = file => {
  const pathToConfigFile = path.resolve('config', `${file}.json`);
  return JSON.parse(fs.readFileSync(pathToConfigFile));
};

const brands = { bh: 'bluehost', jh: 'justhost', hm: 'hostmonster', fd: 'fastdomain' };
const targets = { userApps: 'my', mainSites: 'www' };

const getInfo = (brand = 'bh', target = 'userApps', environment = '') => {
  let baseURL = '';
  let hpURL = '';
  let targetENV = targets[target];
  let brandENV = brands[brand];

  switch (environment) {
    case 'alpha': {
      baseURL = `https://${targetENV}.${process.env.USER}.alpha.${brands[brand]}.com`;
      hpURL = `https://i.${process.env.USER}.alpha.${brands[brand]}.com`;
      break;
    }
    case 'beta': {
      baseURL = `https://${targetENV}.beta${brand}.com`;
      hpURL = `https://i.beta${brand}.com`;
      break;
    }
    case 'bhin': {
      baseURL = `https://www1.beta.bluehost.in`;
      hpURL = `https://i2.beta.bluehost.in`;
      break;
    }
    default: {
      baseURL = 'http://localhost:5000';
      hpURL = `https://i.${process.env.USER}.alpha.${brands[brand]}.com`;
    }
  }
  return { baseUrl: baseURL, hpURL: hpURL };
};

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  let fileInfo;
  let environmnetInfo;
  let finalConfig;

  let environmentInfo = getInfo(config.env.brand, config.env.target, config.env.environment);
  const file = config.env.configFile;

  if (file) {
    fileInfo = getConfigurationByFile(file);
  }

  try {
    finalConfig = Object.assign({}, fileInfo, environmentInfo);
  } catch (err) {
    finalConfig = {};
  }

  if (config.baseUrl) {
    finalConfig.baseUrl = config.baseUrl;
  }

  // If no config is returned the config from cypress.json remains unchanged.
  return finalConfig;
};

const { GoogleSocialLogin } = require('cypress-social-logins').plugins;

module.exports = (on, config) => {
  on('task', {
    GoogleSocialLogin: GoogleSocialLogin,
  });
};
