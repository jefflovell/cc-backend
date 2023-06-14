/* eslint-disable max-len */
import { animal, plant, place, element } from "./modules/dictionaries/nouns.js";
import { descriptor } from "./modules/dictionaries/adjectives.js";
import { action } from "./modules/dictionaries/verbs.js";
import { preposition } from "./modules/dictionaries/helpers.js";
import * as tests from "./modules/tests/tests.js";

// run start up test
tests.startUpTest( tests.testNouns, tests.testAdjectives, tests.testVerbs, tests.testHelpers);