import { testNouns } from "../dictionaries/nouns.js";
import { testAdjectives } from "../dictionaries/adjectives.js";
import { testVerbs } from "../dictionaries/verbs.js";
import { testHelpers } from "../dictionaries/helpers.js";


// check all imported modules for proper pathing
function startUpTest(...args) {
  args.forEach( arg => console.log(arg()));
  console.log("app_start: all modules loaded...");
}

export { testNouns, testAdjectives, testVerbs, testHelpers, startUpTest };