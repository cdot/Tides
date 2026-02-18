import Day from "./Day.js";

/**
 * Find neap and spring tides from tidal data. The days in the
 * tidal data have their `type` set.
 * @param {Day[]} tides sorted array of tide data
 */
export default function findNeapsAndSprings(tides) {

  // Use a sliding window to find local extrema
  const window = 3; // Look at 2*window days at a time

  for (let i = window; i < tides.length - window; i++) {
    const day = tides[i];
    const currentRange = day.range;

    // Check if this is a local minimum (neap) or maximum (spring)
    let isNeap = true;
    let isSpring = true;

    for (let j = -window; j <= window; j++) {
      if (j === 0) continue;

      if (tides[i + j].range < currentRange)
        isNeap = false;

      if (tides[i + j].range > currentRange)
        isSpring = false;
    }
    if (isNeap) {
      day.type = Day.NEAP;
    } else if (isSpring) {
      day.type = Day.SPRING;
    } else
      day.type = undefined;
  }
}
