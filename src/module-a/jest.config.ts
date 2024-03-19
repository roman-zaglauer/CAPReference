/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  globalSetup: "./test/jest.setup.ts",
  detectOpenHandles: true,
  silent: true,
  verbose: true,
  passWithNoTests: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/srv/**/*.ts', '**/lib/**/*.ts, '!**/types/**/*.ts'"],
  testMatch: ["**/*.test.ts"]

};
export default config;
