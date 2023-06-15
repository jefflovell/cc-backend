/* eslint-disable max-len */
import { nounsList, animalsList, plantsList, placesList, elementsList } from "./modules/dictionaries/nouns.js";
import { adjectivesList } from "./modules/dictionaries/adjectives.js";
import { actionsList } from "./modules/dictionaries/verbs.js";
import { prepositionsList } from "./modules/dictionaries/helpers.js";
import * as Tests from "./modules/tests/tests.js";

// run start up test
Tests.startUpTest( Tests.testNouns, Tests.testAdjectives, Tests.testVerbs, Tests.testHelpers);

// randomize the word
function randomWord(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function displayWord(entry) {
  return entry[0];
}

function numSyllables(entry) {
  return entry[1];
}


function lineOne() {
  // the maximum number of syllables for line 1
  const maxSyllables = 5;

  // the current number of syllables for line 1
  let totalSyllables = 0;

  // get the subject of line one and add its syllable value to the line total
  let subject = randomWord(nounsList);
  totalSyllables += subject[1];
  
  let action = 



}

// {$ descriptor} ${animal, plant, place, element} ${verb}