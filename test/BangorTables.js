/* eslint-env mocha,node */

import { assert } from "chai";
import BangorTables from "../src/BangorTables.js";
import Tide from "../src/Tide.js";
import Day from "../src/Day.js";

describe("BangorTables", () => {
  it("retrieves this year", () => {
    return BangorTables
    .getTides("Liverpool")
    .then(tides => {
      assert(tides.length >= 364 && tides.length <= 365);
      assert(tides[0] instanceof Day);
      assert(tides[0].date.getUTCFullYear() === new Date().getUTCFullYear());
      assert(tides[0].tides[0] instanceof Tide);
      assert(tides[0].tides[0].time.getUTCFullYear() === new Date().getUTCFullYear());
    });
  });
});

