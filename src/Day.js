/**
 * A day of tides; there will be 3 or 4 tides in a day.
 */
export default class Day {

  /**
   * @param {Date} date of the tide (time is ignored)
   * @param {Tide[]} tides tides in this day
   */
  constructor(date, tides) {
    /**
     * Date of the tide
     * @member {Date}
     */
    this.date = date;

    /**
     * Tides in this day, sorted by time.
     * @member {Tide[]}
     */
    this.tides = tides.sort((a, b) => a.time - b.time);
    const depths = tides.map(t => t.depth);

    /**
     * The maximum tidal range in the day, in metres, i.e. (max depth)
     * - (min depth).
     * @member {number}
     */
    this.range = Math.max(...depths) - Math.min(...depths);
  }

  /**
   * Generate a cleanly formatted tide for inclusion in a calendar
   * @return {string} a tide string
   */
  toString() {
    return `Tides on ${this.date.toISOString().replace(/T.*$/, "")}\n`
    + this.tides.map(a => a.toString()).join("\n");
  }
};
