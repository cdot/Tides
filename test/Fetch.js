/* eslint-env mocha,node */

import { assert } from "chai";
import Fetch from "../src/Fetch.js";

describe("Fetch", () => {
  it("fetches", () => {
    return Fetch("https://example.com/")
    .then(text => assert(/^<!doctype html>/.test(text)));
  });
});
