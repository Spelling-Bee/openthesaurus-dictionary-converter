#! /usr/bin/env node
var argv = require("yargs")
  .usage("Usage: $0 <command> [options]")
  .command("convert", "Converts a source dictionary")
  .example("$0 count -s foo.txt -t foo.json", "converts a source dictionary")
  .alias("s", "source")
  .nargs("s", 1)
  .describe("s", "Load a source")
  .alias("t", "target")
  .nargs("t", 1)
  .describe("t", "Write to target")
  .demandOption(["s", "t"])
  .help("h")
  .alias("h", "help")
  .epilog("copyright 2020").argv;

const transformDictToJSON = require("../pkg/openthesaurus-dictionary-converter")
  .default;
transformDictToJSON(argv.s, argv.t);
