/* eslint-env mocha,node */

import { assert } from "chai";
import createTideCalendar from "../src/TideCalendar.js";

describe("iCal", () => {
  it("generates tides", () => {
    return createTideCalendar("Liverpool")
    .then(tc => console.log(tc.toString()));
  });
});
