/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

// const { level } = require('winston');
const { config } = require('dotenv');
config();

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME],
  license_key: process.env.NEW_RELIC_KEY,
  agent_enabled: true,
  logging: {
    enabled: true,
    level: 'info',
  },
  allow_all_headers: true,
  application_logging: {
    forwarding: {
      enabled: true,
      max_samples_stored: 10000,
    },
  },
  distributed_tracing: {
    enabled: true,
  },
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @env NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      // 'request.headers.cookie',
      // 'request.headers.authorization',
      // 'request.headers.proxyAuthorization',
      // 'request.headers.setCookie*',
      // 'request.headers.x*',
      // 'response.headers.cookie',
      // 'response.headers.authorization',
      // 'response.headers.proxyAuthorization',
      // 'response.headers.setCookie*',
      // 'response.headers.x*'
    ],
  },
};
