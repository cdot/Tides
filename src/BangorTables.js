import Tide from"./Tide.js";
import Day from "./Day.js";
import Fetch from "./Fetch.js";

/**
 * Download and extract tide data for a site supported by the Bangor
 * University CAMS free tide tables. This only works for the current and
 * next year, and depends on Bangor having updated their website.
 */
export default class BangorTables {

  /**
   * @param {string} site site name, one of "Liverpool", "Menai Bridge",
   * "Port Dinorwic", or "Conwy"
   * @param {string} when must be "present" or "next", default is "present"
   * @return {Promise<Day[]>} Promise that resolves to a sorted array of `Day`
   */
  static getTable(site, when = "present") {
    const MONTHS = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    /**
     * Parse a single tide string extracted from a CAMS tide table.
     * @param {number} year the year of the table
     * @param {number} month the month in the table
     * @param {number} date the date in the month
     * @param {string} s the string specifying the tide
     * @return {object?} If the string contains a recognisable tide, returns
     * { time:, depth: }. If the string is blank, returns undefined.
     */
    function parseTide(year, month, date, s) {
      if (/^\s*$/.test(s))
        return undefined;
      const m = /^(\d\d)(\d\d)\s*([-\d.]+)$/.exec(s);
      if (!m) debugger;
      const hour = parseInt(m[1]), min = parseInt(m[2]), depth = parseFloat(m[3]);
      return {
        time: new Date(year, month, date, hour, min),
        depth: depth
      };
    }

    // Construct the URI to extract the tide table for the site from CAMS.
    // URI construction reverse engineered from the CAMS site.
    site = site.replace(/\s+/g, "").toLowerCase().substring(0, 8);
    const uri = `https://cams.bangor.ac.uk/dataproducts/local_forecasts/tide_tables/${when}/${site}.htm`;

    // fetch the URL
    return Fetch(uri)
    .then(content => {

      // We don't know month and year yet
      let month = 12, year;

      // Gather tides into a big array
      const tides = [];

      // Process line by line
      for (const line of content.split("\n")) {

        // See if we are in a month
        let m = /^\s*(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*\s+(\d+)\s*$/.exec(line);

        if (m) {
          // This is a month-year header line e.g.
          //                 JAN 2024
          month = MONTHS.indexOf(m[1]), year = parseInt(m[2]);
        }
        else if (month < 12) {
          // We're in a month, see if we match a data line e.g.
          //    13  1155  3.84               0649 -2.48  1916 -2.94
          m = /^\s*(\d\d?)\s+(\d\d\d\d\s+[\d.]+.*?)\s*$/.exec(line);
          if (m) {
            // It's a data line, starting with the date and 1 or more times
            const date = parseInt(m[1]);
            const times = m[2];
            const day = [];
            const tideRE = /(\d\d)(\d\d)\s+([-\d.]+)/g;
            while ((m = tideRE.exec(times))) {
              const hour = parseInt(m[1]),
                    min = parseInt(m[2]),
                    depth = parseFloat(m[3]);
              const utc = Date.UTC(year, month, date, hour, min);
              day.push(new Tide(new Date(utc), depth));
            }
            const utc = Date.UTC(year, month, date);
            tides.push(new Day(new Date(utc), day));
          }
        }
      }
      // See if the first tide was high and set the high flag on all tides
      let high = true;
      if (tides[0].tides[0].depth < tides[0].tides[1].depth)
        high = false;
      for (const day of tides)
        for (const tide of day.tides) {
          tide.high = high;
          high = !high;
        }
      return tides;
    });
  }

  /**
   * Get the tide table for the current year from the Bangor University
   * tide tables. Bangor U supports two years of tables on their site,
   * this function will retrieve the one appropriate to the current
   * year (Date.now()).
   * @param {string} site site name, one of "Liverpool", "Menai Bridge",
   * "Port Dinorwic", "Caernarfon", "Beaumaris", or "Conwy"
   * @param {number?} year the year to retrieve. If not given, defaults
   * to the current year. If given but that date is unavailable, throws.
   * @return {Promise.<Day[]>} Promise that resolves to a sorted array of Day
   */
  static getTides(site, year = new Date().getUTCFullYear()) {
    return BangorTables.getTable(site, "present")
    .then(tides => {
      // If "present" is the current year, we're done
      if (tides[0].date.getUTCFullYear() === year)
        return tides;
      // Otherwise it must (!) be "next"
      return BangorTables.getTable(site, "next")
      .then(tides => {
        if (tides[0].date.getUTCFullYear() === year)
          return tides;
        throw new Error(`${year} not available from Bangor U tables`);
      });
    });
  }
}

/**
 * Lat/Long of tidal prediction sites
 * AppScript doesn't support static
 */
BangorTables.locations = {
  "Liverpool":     [ 53.4555809, -3.0224621 ],
  "Menai Bridge":  [ 53.222816,  -4.1621462 ],
  "Port Dinorwic": [ 53.1837381, -4.2161348 ],
  "Conwy":         [ 53.2957327, -3.849208 ],
  "Caernarfon":    [ 53.1399465, -4.2794888 ],
  "Beaumaris":     [ 53.2609341, -4.0951639 ]
};
