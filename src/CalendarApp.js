/**
 * Abstraction to make an ICalCalendar look enough like a GoogleCalendar
 * so it works with the TideCalendar.
 * Must be excluded from AppScript packaging.
 */
import { ICalCalendar, ICalEvent, ICalEventTransparency } from 'ical-generator';

ICalEvent.prototype.setDescription = ICalEvent.prototype.description;
ICalEvent.prototype.setAnyoneCanAddSelf = () => {};
ICalEvent.prototype.setLocation = ICalEvent.prototype.location;
ICalEvent.prototype.setTransparency = ICalEvent.prototype.transparency;
ICalEvent.prototype.setTag = function(tag, val) {
  this.x(`X-${tag}`, val);
};
ICalEvent.prototype.getTag = function(tag) {
  const xs = this.x().filter(e => e.key == `X-${tag}`);
  if (typeof xs === "undefined" || xs.length === 0)
    return undefined;
  return xs[0].value;
};
ICalEvent.prototype.deleteEvent = function() {
  const cal = this.calendar;
  const events = cal.events();
  events.splice(events.indexOf(this), 1);
};
ICalEvent.prototype.setColor = function(col) {
  this.data.color = col;
};
ICalEvent.prototype.color = function(col) {
  if (col === undefined)
    return this.data.color;
  return this.data.color = col;
};
ICalEvent.prototype.superToString = ICalEvent.prototype.toString;
ICalEvent.prototype.toString = function() {
  const superString = this.superToString();
  if (this.data.color)
    return superString.replace(/(END:VEVENT)/, `COLOR:${this.data.color}\r\n$1`);
  return superString;
};

export default class CalendarApp extends ICalCalendar {

  // Mapping from CalendarApp.Color and CalendarApp.EventColor colour names
  // to close-ish equivalent CSS3 basic color names.
  static EventColor = {
    BLUE:       "blue",    // Blueberry
    CYAN:       "teal",    // Peacock
    GRAY:       "gray",    // Graphite
    GREEN:      "green",   // Basil
    MAUVE:      "maroon",  // Grape
    ORANGE:     "olive",   // Tangerine
    PALE_BLUE:  "aqua",    // Lavender
    PALE_GREEN: "lime",    // Sage
    PALE_RED:   "fuchsia", // Flamingo
    RED:        "red",     // Tomato
    YELLOW:     "yellow"   // Banana
  };

  static EventTransparency = {
    OPAQUE: ICalEventTransparency.OPAQUE,
    TRANSPARENT: ICalEventTransparency.TRANSPARENT
  };

  static getCalendarById(name) {
    return new CalendarApp({ name: name });
  }
  
  getEvents() { return super.events(); }
  
  /**
   * @param {string} title Event title
   * @param {Date} date Date to create the event
   */
  createAllDayEvent(title, date) {
    return this.createEvent({
      start: date,
      allDay: true,
      summary: title
    });
  }
}
