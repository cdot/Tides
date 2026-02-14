# Tides
Generation of calendars from the Bangor University tide tables for North Wales and the north west. Supports generation of ICS files, and can be imported into AppScript to update a Google calendar.

## Generating a .ics file
When run under node.js, use
```
node bin/gen_ics.js
```
which will output ICS data to the console. Redirect it into a file, and import
it to your calendar app.

## Running in Appscript
You can create a script that will automatically update a Google Calendar.
```
git clone 
npm install
npm run appscript
```
+ In Google Drive, create a new AppScript file.
+ Use `Files +` in the left bar to create a new Script file.
+ Call it "TideCalendar"
+ Replace the contents with the content of the local file `appscript/TideCalendar.gs`
+ Switch to Code.gs, delete eveyrthing there and paste:
```
function createCalendar() {
   createTideCalendar("Liverpool", "eq470905jlkdfi095098silf4o@group.calendar.google.com");
}
```
+ Replace the second parameter to `updateTideCalendar` with your calendar ID.
+ Click `Run` in the top bar
