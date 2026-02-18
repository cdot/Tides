/* global Logger, CalendarApp */
import BangorTables from "./BangorTables.js";
import findNeapsAndSprings from "./NeapsAndSprings.js";
import Day from "./Day.js";
import Sun from "./Sun.js";
import Gradient from "./Gradient.js";
import CalendarApp from "./CalendarApp.js";
import "./Logger.js";

/**
 * Populate a google calendar with the timings of daily tides,
 * as determined from Bangor University tide tables.
 * Designed to run in two different contexts. Under node.js, this will
 * generate a .ics file with the calendar data. If loaded into AppScript,
 * will update a Google Calendar.
 * @param {object} options Generation options
 * @param {string} options.site Required site name, one of "Liverpool", "Menai Bridge",
 * "Port Dinorwic", "Menai Bridge" or "Conwy"
 * @param {boolean} options.nsOnly True to generate only neaps and springs.
 * @param {number} options.year Year to generate the calendar for, defaults to
 * this year.
 * @param {string} options.calendar_id the id of the Google calendar to update.
 * Only used when running in AppScript.
 * @return {ICalCalendar?} undefined if running in AppScript; an iCal object
 * otherwise.
 */
export default function createTideCalendar(options) {
  const cal = CalendarApp.getCalendarById(options.calendar_id || "Tides");
  const sun = new Sun(...(BangorTables.locations[options.site]));

  const TAG = "Tide";

  const year = options.year || new Date().getUTCFullYear();

  Logger.log("Getting tides for " + year);
  return BangorTables.getTides(options.site, year)
    .then(tides => {
      findNeapsAndSprings(tides);

      // Clear out existing events for the current year
      Logger.log("Deleting old tides");

      const start = new Date(year, 0, 1), end = new Date(year + 1, 0, 1);
      const events = cal.getEvents(start, end).filter(e => e.getTag("Tide"));
      for (const e of events)
        e.deleteEvent();

      Logger.log("Creating tides");
      for (const day of tides) {
        if (options.nsOnly && !day.type)
          continue;
        const title = ((day.type === Day.NEAP)
              ? "Neap "
              : (day.type === Day.SPRING)
              ? "Spring "
                       : "") + day.toTitle();
        const colour = (day.type === Day.NEAP)
              ? CalendarApp.EventColor.PALE_GREEN
              : (day.type === Day.SPRING)
              ? CalendarApp.EventColor.PALE_RED
              : CalendarApp.EventColor.GRAY;
        const event = cal.createAllDayEvent(title, day.date);
        event.setTag(TAG, true);
        event.setDescription(`${day.toDescription()}\n${sun.atDate(day.date)}`);
        event.setColor(colour);
        event.setAnyoneCanAddSelf(false);
        event.setLocation(options.site);
        event.setTransparency(CalendarApp.EventTransparency.TRANSPARENT);
        Logger.log(`Created ${title}`);
      }
      return cal;
    });
}

