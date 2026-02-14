/* global CalendarApp, Logger */
import BangorTables from "./BangorTables.js";
import NeapsAndSprings from "./NeapsAndSprings.js";
import Sun from "./Sun.js";
import { ICalCalendar } from 'ical-generator';

/**
 * Populate a google calendar with the timings of neap and spring tides,
 * as determined from Bangor University tide tables.
 * Designed to run in two different contexts. Under node.js, this will
 * generate a .ics file with the calendar data. If loaded into AppScript,
 * will update a Google Calendar.
 * @param {string} site site name, one of "Liverpool", "Menai Bridge",
 * "Port Dinorwic", "Menai Bridge" or "Conwy"
 * @param {number?} year Year to generate the calendar for, defaults to
 * this year.
 * @param {string?} calendar_id the id of the Google calendar to update.
 * Do not set if generating an ics.
 * @return {ICalCalendar?} undefined if running in AppScript; an iCal object
 * otherwise.
 */
export default function createTideCalendar(site, year = new Date().getUTCFullYear(), calendar_id) {
  let cal;
  const sun = new Sun(...(BangorTables.locations[site]));

  function createTideEvent(cal, day, title) {
    const description = `${day.toString()}\n${sun.atDate(day.date)}`;
    if (typeof CalendarApp === "undefined") {
      cal.createEvent({
        start: day.date,
        allDay: true,
        summary: title,
        description: description
      });
    } else {
      const event = cal.createAllDayEvent(title, day.date);
      event.setTag("Tide", "neap");
      event.setDescription(description);
      event.setAnyoneCanAddSelf(false);
      event.setLocation(site);
      event.setTransparency(CalendarApp.EventTransparency.OPAQUE);
    }
    Logger.log(title + " " + day.date);
  }

  if (typeof CalendarApp === "undefined") {
    var Logger = { log: s => console.debug(s) };
    cal = new ICalCalendar({ name: "Tides" });
  } else {
    cal = CalendarApp.getCalendarById(calendar_id);
    if (!cal)
      throw new Error(`Cannot access calendar ${calendar_id}`);
  }

  Logger.log("Getting tides for " + year);
  return BangorTables.getTides(site, year)
    .then(tides => {
      const ns = new NeapsAndSprings(tides);

      // Clear out existing events for the current year
      Logger.log("Deleting old tides");

      // Clear out old events
      if (typeof CalendarApp === "undefined") {
        cal.clear();
      } else {
        const start = new Date(year, 0, 1), end = new Date(year + 1, 0, 1);
        const events = cal.getEvents(start, end).filter(e => e.getTag("Tide"));
        for (const e of events)
          e.deleteEvent();
      }

      // Add neaps
      Logger.log("Creating neaps");
      for (const neap of ns.neaps)
        createTideEvent(cal, neap, "Neap tide");

      // Add springs
      Logger.log("Creating springs");
      for (const spring of ns.springs)
        createTideEvent(cal, spring, "Spring tide");

      return cal;
    });
}

