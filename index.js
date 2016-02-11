'use strict';

const fs = require('fs');
const Path = require('path');

const internals = {};

internals.i18n = function (Joi, i18nDir) {
  const directory = i18nDir || '';
  if (!Joi) {
    throw new TypeError('Joi is required');
  }

  const originalFn = Joi.validate;
  Joi.validate = function (value /*, [schema], [options], callback */) {
    const last = arguments[arguments.length - 1];
    const callback = typeof last === 'function' ? last : null;

    const count = arguments.length - (callback ? 1 : 0);
    if (count === 1) {
      return originalFn(value, callback);
    }

    const options = count === 3 ? arguments[2] : {};

    if (options.i18n) {
      options.language = internals.getI18nFile(directory, options.i18n);
      delete options.i18n;
    }

    const schema = arguments[1];

    return originalFn(value, schema, options, callback);
  };

  return Joi;
};

internals.getI18nFile = function (i18nDir, fileName) {
  try {
    const root = Path.join(i18nDir, fileName + '.json');
    const isFile = fs.statSync(root).isFile();
    return isFile ? require(root) : {};
  } catch (err) {
    console.error(err);

    return {};
  }
};

module.exports = internals.i18n;

