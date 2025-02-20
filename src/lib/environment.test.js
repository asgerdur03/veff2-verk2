import { test } from "node:test";
import assert from "node:assert/strict";
import { environment } from "./environment.js";

class MockLogger {
  constructor() {
    this.messages = { error: [], info: [] };
  }

  getErrors() {
    return this.messages.error;
  }
}

test("environment() should return valid config when correct env is provided", () => {
  const mockLogger = new MockLogger();
  const env = {
    PORT: "4000",
    DATABASE_URL: "postgres://user:pass@localhost:5432/dbname",
  };

  const result = environment(env, mockLogger);

  assert.deepStrictEqual(result, { port: 4000, connectionString: env.DATABASE_URL });
  assert.strictEqual(mockLogger.getErrors().length, 0, "Logger should not log errors");
});




