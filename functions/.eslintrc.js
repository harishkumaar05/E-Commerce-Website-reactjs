module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parseOptions:{
    sourceType: module,
    ecmaVersion: 8,
    ecmaFeatures:{
      jsx: true,
      experimentalOjectRestSpread: true,
    },
  },
  rules: {
    quotes: ["error", "double"],
  },
};
