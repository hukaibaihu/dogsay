import queryString from 'query-string';
import lodash from 'lodash';
import config from './config';

export default {
  get(api, params) {
    let url = config.api.base + api;
    if(params) {
      url += '?' + queryString.stringify(params);
    }

    return fetch(url)
      .then((response) => response.json());
  },
  post(api, params) {
    let options = lodash.extend(config.header, {
      body: JSON.stringify(params)
    });
    
    return fetch(config.api.base + api, options)
      .then((response) => response.json());
  }
}