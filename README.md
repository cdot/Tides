# Tides
[Bangor University Centre for Applied Marine Science](https://cams.bangor.ac.uk/contact.php.en) generously share their annual tidal predictions for a selection of ports around North Wales - Liverpool, Conwy, Beaumaris, Menai Bridge, Port Dinorwic, and Caernarfon.

SCUBA divers find this information invaluable for planning diving, as we plan our diving many months in advance. Of particular importance is the occurrence of Spring and Neap tides, as they generally offer the longest slack windows, best suited for diving.

This module supports the creation of calendars of Spring and Neap tides based on the Bangor tables, though the generation of [ICS](https://en.wikipedia.org/wiki/ICalendar) files. The code can also be imported into [AppScript](https://developers.google.com/apps-script) to manipulate a Google calendar directly.

## Generating a .ics file
Clone the repository and install dependencies. Then run the bin script:
```
git clone https://github.com/cdot/Tides.git
cd Tides
npm install
node bin/gen_ics.js
```
This will output ICS data for neap and spring tides to the console. Redirect it into a file, and import it to your calendar app.

## Running in Appscript
You can create a script that will automatically update a Google Calendar. Clone the repository as described above, then
```
npm run appscript
```
+ In Google Drive, create a new AppScript file.
+ Use `Files +` in the left bar to create a new Script file.
+ Call it "TideCalendar"
+ Replace the contents with the content of the local file `appscript/TideCalendar.gs`
+ Switch to Code.gs, delete eveyrthing there and paste:
```
function createCalendar() {
   createTideCalendar("Liverpool", "eq470fggslkdf44ff5098silf4o@group.calendar.google.com");
}
```
+ Replace the second parameter to `updateTideCalendar` with your calendar ID.
+ Click `Run` in the top bar
