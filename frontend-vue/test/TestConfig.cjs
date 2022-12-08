const inspector = require("node:inspector");

exports.TestConfig = {
  /** true when the tests are currently being debugged */
  isDebug: !!inspector.url(),
  /** true when running on an automated build server  */
  isCI: !!process.env.CI,
};
