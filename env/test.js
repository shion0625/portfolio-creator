import * as fs from "fs";

// Load all defined environment variables
const environmentVariables = fs
  .readdirSync(__dirname)
  .filter((fileName) => fileName.startsWith("env."))
  .reduce((pre, fileName) => {
    pre[fileName] = require(`./${fileName}`);
    return pre;
  }, {});

Object.entries(environmentVariables).forEach(([envName, env]) => {
  describe(`${envName}`, () => {
    it("NEXT_PUBLIC_API_BASE_URL が必ずセットされている。", () => {
      expect(env["NEXT_PUBLIC_API_BASE_URL"]).toBeDefined();
    });
  });
});
