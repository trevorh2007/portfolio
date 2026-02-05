import { isDevelopment } from "../env";

describe("env utility", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env = { ...process.env, NODE_ENV: originalEnv };
  });

  it("returns true when NODE_ENV is development", () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    expect(isDevelopment()).toBe(true);
  });

  it("returns false when NODE_ENV is production", () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    expect(isDevelopment()).toBe(false);
  });

  it("returns false when NODE_ENV is test", () => {
    process.env = { ...process.env, NODE_ENV: "test" };
    expect(isDevelopment()).toBe(false);
  });
});
