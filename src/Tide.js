/**
 * A single tide, either high or low.
 */
export default class Tide {
  /**
   * @param {Date} when when the water level is highest/lowest
   * @param {number} depth of the tide, in metres, when it is highest/lowest
   * @param {boolean?} high optionally specify if this is a high or a low tide
   */
  constructor(time, depth, high = undefined) {
    /**
     * Absolute time of the tide
     * @member {Date}
     */
    this.time = time;

    /**
     * Depth of the tide in metres
     * @member {number}
     */
    this.depth = depth;

    /**
     * True if this is a high tide
     * @member {boolean}
     */
    this.high = high;
  }

  /**
   * Generate a cleanly formatted tide for inclusion in a calendar
   * @return {string} a tide string
   */
  toString() {
    return (this.high ? "H " : "L ")
    + this.time.toISOString().replace(
      /^.*T(\d\d:\d\d):\d\d\.\d+(.*)$/, "$1$2 ")
    + this.depth + "m";
  }
};

