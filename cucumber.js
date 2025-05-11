module.exports = {
  default: {
    require: ["features/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["summary"],
    paths: ["features/**/*.feature"],
  },
};
