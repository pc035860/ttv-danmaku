import ee from 'event-emitter';

const defaultParams = {
  shownick: 0,
  highlight: 'nick',
  showbadges: 0,
  theme: 'dark',
  speed: 100,
  reverse: 0,
  showstream: 0,
  nochat: 0,
  rect: '0,100'
};

export default function createWatchParams(initParams = {}, alias = {}) {
  const instance = ee({});

  const params = Object.assign({}, defaultParams, initParams);

  const get = (name) => {
    if (name) {
      if (alias[name]) {
        return params[name] || params[alias[name]];
      }
      return params[name];
    }
    return { ...params };
  };

  const set = (name, value) => {
    const oldValue = get(name);
    params[name] = value;
    const changes = [{
      name,
      oldValue,
      newValue: value
    }];
    instance.emit('change', changes);
    return value;
  };

  return Object.assign(instance, { get, set });
}
