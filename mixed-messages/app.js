/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import { subjectsList, objectsList } from "./modules/dictionaries/nouns.js";
import { adjectivesList } from "./modules/dictionaries/adjectives.js";
import { verbsList } from "./modules/dictionaries/verbs.js";
import { prepositionsList } from "./modules/dictionaries/helpers.js";
import * as Tests from "./modules/tests/tests.js";

// run start up test
Tests.startUpTest( Tests.testNouns, Tests.testAdjectives, Tests.testVerbs, Tests.testHelpers);

// randomize the word
function randomWord(list) {
  // generate a random number between 0 and the length of the list - 1
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function getWord(list, maxSyllables) {

  // only use words with 3 syllables or less for lines 1 and 3
  if (maxSyllables === 5) {
    list = list.filter(word => word[1] < 4);
    return randomWord(list);
  }
  // otherwise just return the random word
  return randomWord(list);
}

function articleGenerator(noun) {

  let article = "";
  let vowels = "aeiou";

  // generate 1 or 2 randomly
  let picker = Math.floor(Math.random() * 2) + 1;

  // decide whether to use 'a(n)' or 'the' for singular nouns
  if (noun[2] === "singular") {
    if (picker === 1) {
      article = "a";
      // adjust 'a' to 'an' in the case of a leading vowel
      if (vowels.includes(noun[0][0])) {
        article += "n";
      }
    } else {
      article = "the";
    }
  }

  // randomly decide whether to include a subject article for plural and collective nouns
  if (noun[2] !== "singular") {
    if (picker === 1) {
      article = "the";
    }
  }
  return article;
}

function nounMatchedVerb(noun, maxSyllables, totalSyllables) {
  console.log(maxSyllables, totalSyllables);
  // filter the list of verbs to only contain verbs which match the noun's collection type
  let nounMatchedVerbs = verbsList.filter(verb => verb[2] === (noun[2] || "collective"));

  // filter the list of verbs again to only contain verbs which fit in the available line syllable count
  let validVerbs = nounMatchedVerbs.filter(verb => (verb[1] + totalSyllables) <= maxSyllables);

  // return a random verb that meets both criteria
  return randomWord(validVerbs);
}

function generateLine(maxSyllables) {

  // the current number of syllables for the generated line
  let totalSyllables = 0;

  // set the subject
  let subject = getWord(subjectsList);

  // add the subject's syllable value to the line value
  totalSyllables += subject[1];

  // randomly generate an article for the subject
  let subjectArticle = articleGenerator(subject);

  // if there is a non-empty string value for subject article, add 1 syllable to the line count
  if (subjectArticle !== " ") {
    totalSyllables += 1;
  }

  // set the subject's verb
  let verb = nounMatchedVerb(subject, maxSyllables, totalSyllables);

  // add the verb's syllable count to the line count
  totalSyllables += verb[1];

  // while there are less syllables than the line requires. . .

  // add a subject adjective

  // add an adverb

  // add a conjunction and object

  // add an object adjective

  // randomly pick which solution to use



  // trim the interpolated string in case there is a blank character at the beginning
  let line = `${subjectArticle} ${subject[0]} ${verb[0]} | totalSyllables: ${totalSyllables} | maxSyllables: ${maxSyllables}`.trim();

  // capitalize the first letter of the string
  let capitalize = line[0].toUpperCase();

  // recombine the capitalized first letter with the rest of the string
  line = capitalize + line.slice(1);

  // return the completed line
  return line;
}

console.log(generateLine(5));
console.log(generateLine(7));
console.log(generateLine(5));