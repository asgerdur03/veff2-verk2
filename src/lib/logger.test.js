import { test } from "node:test";
import assert from "node:assert/strict";
import { Logger } from "./logger.js";

function captureConsoleOutput(method, callback) {
  const original = console[method];
  let output = "";
  
  console[method] = (...messages) => {
    output += messages.join(" ") + "\n";
  };

  callback();
  console[method] = original; // Restore console

  return output.trim();
}

test("Logger.info() should log messages when not silent", () => {
  const logger = new Logger(false);
  const output = captureConsoleOutput("info", () => {
    logger.info("Test Info Message");
  });

  assert.strictEqual(output, "Test Info Message");
});

test("Logger.warn() should log messages when not silent", () => {
  const logger = new Logger(false);
  const output = captureConsoleOutput("warn", () => {
    logger.warn("Test Warning Message");
  });

  assert.strictEqual(output, "Test Warning Message");
});

test("Logger.error() should log messages when not silent", () => {
  const logger = new Logger(false);
  const output = captureConsoleOutput("error", () => {
    logger.error("Test Error Message");
  });

  assert.strictEqual(output, "Test Error Message");
});

test("Logger should not log messages when silent", () => {
  const logger = new Logger(true);
  
  const infoOutput = captureConsoleOutput("info", () => logger.info("Should not appear"));
  const warnOutput = captureConsoleOutput("warn", () => logger.warn("Should not appear"));
  const errorOutput = captureConsoleOutput("error", () => logger.error("Should not appear"));

  assert.strictEqual(infoOutput, "");
  assert.strictEqual(warnOutput, "");
  assert.strictEqual(errorOutput, "");
});
