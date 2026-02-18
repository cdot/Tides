// Build appscript/TideCalendar.gs for AppScript
// I tried doing this with webpack and babel, but it was an utter
// pain in the ass. This little script does the job nicely.
const deps = [
  "src/Tide.js",
  "src/Day.js",
  "src/Fetch.js",
  "src/Sun.js",
  "src/BangorTables.js",
  "src/NeapsAndSprings.js",
  "src/TideCalendar.js"
];

import { promises as Fs } from "fs";

Promise.all(deps.map(dep =>
  Fs.readFile(dep)
  .then(buff => buff.toString()
        .replace(/import.*?;/g, "")
        .replace(/export default/g, ""))))
.then(contents => Fs.writeFile("appscript/TideCalendar.gs",
                               contents.join("\n")))
.then(() => console.log("Wrote appscript/TideCalendar.js"));
