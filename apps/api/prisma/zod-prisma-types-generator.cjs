const fs = require('node:fs');

const toRmOptions = (options) => ({
  recursive: true,
  force: true,
  ...(typeof options?.maxRetries === 'number'
    ? { maxRetries: options.maxRetries }
    : {}),
  ...(typeof options?.retryDelay === 'number'
    ? { retryDelay: options.retryDelay }
    : {}),
});

const originalRmdirCallback = fs.rmdir.bind(fs);
fs.rmdir = (path, options, callback) => {
  if (typeof options === 'function') {
    return originalRmdirCallback(path, options);
  }

  if (options?.recursive) {
    return fs.rm(path, toRmOptions(options), callback);
  }

  return originalRmdirCallback(path, options, callback);
};

const originalRmdirSync = fs.rmdirSync.bind(fs);
fs.rmdirSync = (path, options) => {
  if (options?.recursive) {
    return fs.rmSync(path, toRmOptions(options));
  }

  return originalRmdirSync(path, options);
};

const originalRmdir = fs.promises.rmdir.bind(fs.promises);
fs.promises.rmdir = (path, options) => {
  if (options?.recursive) {
    return fs.promises.rm(path, toRmOptions(options));
  }

  return originalRmdir(path, options);
};

require('../node_modules/zod-prisma-types/dist/bin.js');
