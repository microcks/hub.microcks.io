const DEFAULT_TARGET = 'http://127.0.0.1:4000';
const target = process.env.API_URL || DEFAULT_TARGET;

module.exports = {
  '/api': {
    target,
    secure: false,
  },
  '/documentation': {
    target,
    secure: false,
  },
};
