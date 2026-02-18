/**
 * Generate ICS data for a tides calendar for this year.
 */
import createTideCalendar from "../src/TideCalendar.js";
import Getopt from "posix-getopt";
import fs from "fs";

const options = {
  site: "Liverpool",
  year: new Date().getUTCFullYear()
};

const DESCRIPTION = [
  "DESCRIPTION\nGenerate ICS for tide data.",
  "", "OPTIONS",
  "\t-h, --help - Show this help",
  "\t-n, --nsonly - Only generate calendar entries for neaps and springs",
  `\t-s, --site=ARG - Site, default is ${options.site}`,
  `\t-y, --year=ARG - Year, default is ${options.year}`,
  "\t-o, --output=ARG - Output file path, STDOUT if undefined"
].join("\n");

const go_parser = new Getopt.BasicParser(
  "hn(nsonly)y:(year)s:(site)o:(output)", process.argv);

let option, outfile;
while ((option = go_parser.getopt())) {
  switch (option.option) {

  case "h": console.log(DESCRIPTION); process.exit();
  case "n": options.nsOnly = true; break;
  case 's': options.site = option.optarg; break;
  case 'y': options.year = option.optarg; break;
  case 'o': outfile = option.optarg; break;
  default: throw Error(`Unknown option -${option.option}\n${DESCRIPTION}`);
  }
}

createTideCalendar(options)
.then(tc => {
  if (outfile)
    fs.writeFileSync(outfile, tc.toString());
  else
    console.log(tc.toString());
});
