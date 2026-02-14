/* eslint-env mocha,node */

import { assert } from "chai";
import Sun from "../src/Sun.js";

describe("Sun", () => {
  it("rises and sets", () => {
    const s = new Sun(58, 0);
    const now = new Date("2026-02-14T13:39Z");
    const up = s.rise(now);
    const down = s.set(now);
    assert.equal(up.toISOString(), "2026-02-14T07:33:00.000Z");
    assert.equal(down.toISOString(), "2026-02-14T16:55:00.000Z");
  });
});

