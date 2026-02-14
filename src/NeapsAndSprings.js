/**
 * Find neap and spring tides from tidal data.
 */
export default class NeapsAndSprings {

  /**
   * @param {Day[]} tidalData sorted array of tide data
   */
  constructor(tidalData) {
    /**
     * The input tide data.
     * @member {Day[]}
     */
    this.tides = tidalData;

    /**
     * Days identified as neaps. Each element will be a reference to a
     * `Day` in the `tides`.
     * @member {Day[]}
     */
    this.neaps = [];

    /**
     * Days identified as springs. Each element will be a reference to a
     * `Day` in the `tides`.
     * @member {Day[]}
     */
    this.springs = [];

    // Use a sliding window to find local extrema
    const window = 3; // Look at 7 cycles at a time, -3..+3

    for (let i = window; i < this.tides.length - window; i++) {
      const day = this.tides[i];
      const currentRange = day.range;

      // Check if this is a local minimum (neap) or maximum (spring)
      let isNeap = true;
      let isSpring = true;

      for (let j = -window; j <= window; j++) {
        if (j === 0) continue;

        if (this.tides[i + j].range < currentRange)
          isNeap = false;

        if (this.tides[i + j].range > currentRange)
          isSpring = false;
      }

      if (isNeap)
        this.neaps.push(day);

      if (isSpring)
        this.springs.push(day);
    }
  }
};
