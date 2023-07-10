import { readJSON } from './util.js';
import Log from './log.js';
import runTasks from './index.js';

const pkg = readJSON(new URL('../package.json', import.meta.url));

const log = new Log();

const helpText = `Release It! v${pkg.version}

  Usage: release-git <increment> [options]

  Use e.g. "release-git minor" directly as shorthand for "release-git --increment=minor".

  -c --config            Path to local configuration options [default: ".release-git.json"]
  -d --dry-run           Do not touch or write anything, but show the commands
  -h --help              Print this help
  -i --increment         Increment "major", "minor", "patch", or "pre*" version; or specify version [default: "patch"]
     --ci                No prompts, no user interaction; activated automatically in CI environments
     --only-version      Prompt only for version, no further interaction
  -v --version           Print release-git version number
     --release-version   Print version number to be released
     --changelog         Print changelog for the version to be released
  -V --verbose           Verbose output (user hooks output)
  -VV                    Extra verbose output (also internal commands output)

For more details, please see https://github.com/release-git/release-git`;

export let version = () => log.log(`v${pkg.version}`);

export let help = () => log.log(helpText);

export default async options => {
  if (options.version) {
    version();
  } else if (options.help) {
    help();
  } else {
    return runTasks(options);
  }
  return Promise.resolve();
};
