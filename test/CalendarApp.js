/* eslint-env mocha,node */

import { assert } from "chai";
import CalendarApp from "../src/CalendarApp.js";
import { ICalCalendar, ICalEvent } from 'ical-generator';

describe("iCal", () => {
  it("basics", () => {
    const cal = CalendarApp.getCalendarById("Liverpool");
    assert(cal instanceof ICalCalendar);
    assert.equal(cal.name(), "Liverpool");

    const event = cal.createAllDayEvent(
      "Dinner", new Date("1980-01-01T18:30Z"));
    assert.equal(event.start().toISOString(), "1980-01-01T18:30:00.000Z");
    assert.equal(event.summary(), "Dinner");

    event.setDescription("Egg and Chips");
    assert.equal(event.description().plain, "Egg and Chips");

    event.setAnyoneCanAddSelf(false);

    event.setTag("Knick", "Knack");
    assert.equal(event.getTag("Knick"), "Knack");

    event.setLocation("Knock");
    assert.equal(event.location().title, "Knock");

    event.setTransparency(CalendarApp.EventTransparency.TRANSPARENT);
    assert.equal(event.transparency(), "TRANSPARENT");

    event.setColor(CalendarApp.EventColor.BLUE);
    assert.equal(event.color(), "blue");
  });

  it("delete events", () => {
    const cal = CalendarApp.getCalendarById("Smell");
    const breakfast = cal.createAllDayEvent(
      "Breakfast", new Date("1980-01-01T06:30Z"));
    const lunch = cal.createAllDayEvent(
      "Lunch", new Date("1980-01-01T12:30Z"));
    lunch.setTag("Midday", "Hummus");
    assert.equal(lunch.getTag("Midday"), "Hummus");
    const dinner = cal.createAllDayEvent(
      "Dinner", new Date("1980-01-01T18:30Z"));
    assert.equal(cal.events().length, 3);
    const dead = cal.getEvents().filter(e => e.getTag("Midday"));
    assert.equal(dead.length, 1);
    dead[0].deleteEvent();
    assert.equal(cal.events().length, 2);
  });

  it("setColor", () => {
    const cal = CalendarApp.getCalendarById("Smell");
    const breakfast = cal.createAllDayEvent(
      "Breakfast", new Date("1980-01-01T06:30Z"));
    breakfast.setColor(CalendarApp.EventColor.PALE_GREEN);
    const s = cal.toString();
    assert(/SUMMARY:Breakfast\r\n/.test(s));
    assert(/COLOR:lime\r\n/.test(s));
  });
});
