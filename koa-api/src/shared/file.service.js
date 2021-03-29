const {
  unlink,
  readFile,
} = require('fs');

module.exports = {
  readAsync(path) {
    return new Promise((resolve, reject) => readFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    }));
  },

  removeAsync(path) {
    return new Promise((resolve, reject) => unlink(path, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    }));
  },

  getCorrectPath(path) {
    if (!path) {
      return Promise.reject(new Error('file.path is not defined or maybe is null'));
    }

    let isRelativePath = false;

    return path.split('/').filter((pathItem) => {
      if (pathItem === 'uploads') {
        isRelativePath = true;
      }

      return isRelativePath;
    }).join('/');
  },

  parseFileNameFromPath(path) {
    if (!path) {
      throw new Error('[FileService.parseFileNameFromPath] path is not defined. Please specify');
    }

    return path.split('/').pop();
  },

  getFullPath(relativePath = '') {
    if (!relativePath) {
      throw new Error('[FileService.getFullPath] please specify relativePath. Relative path is not defined');
    }

    return `http://${process.env.HOST}:${process.env.PORT}/${relativePath}`;
  },
};
