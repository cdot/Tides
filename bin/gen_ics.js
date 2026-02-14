/**
 * Generate a .ics file for a tides calndar for this year.
 */
import createTideCalendar from "../src/TideCalendar.js";
createTideCalendar("Liverpool")
.then(tc => console.log(tc.toString()));
