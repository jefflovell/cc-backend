import { subjectsList, objectsList } from "./dictionaries/nouns.js";
import { adjectivesList } from "./dictionaries/adjectives.js";
import { verbsList} from "./dictionaries/verbs.js";
import { conjunctionsList } from "./dictionaries/helpers.js";

// randomize the word
function getRandomWord(list) {
  // generate a random number between 0 and the length of the list - 1
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

function getSubject(list, maxSyllables) {
  // only use words with 3 syllables or less for lines 1 and 3
  if (maxSyllables === 5) {
    let threeSylSubjectList = list.filter(word => word[1] < 4);
    return getRandomWord(threeSylSubjectList);
  }
  // otherwise just return the random word
  return getRandomWord(list);
}

function getArticle(word) {
  let article = "";
  let vowels = "aeiou";
  // generate 1 or 2 randomly
  let picker = Math.floor(Math.random() * 2) + 1;
  // decide whether to use 'a(n)' or 'the' for singular nouns
  if (word[2] === "singular") {
    if (picker === 1) {
      article = ["a"];
      // adjust 'a' to 'an' in the case of a leading vowel
      if (vowels.includes(word[0][0])) {
        article[0] += "n";
      }
    } else {
      article = ["the"];
    }
  }
  // randomly decide whether to include a subject article for plural and collective nouns
  if (word[2] !== "singular") {
    article = ["the"];
  }
  return article;
}

function getNounMatchedVerb(noun, maxSyllables, totalSyllables) {
  // filter the list of verbs to only contain verbs which match the noun's collection type
  let nounMatchedVerbs = verbsList.filter(verb => {
    if (noun[2] === "collective") {
      return verb;
    } else if (noun[2] === "plural" && verb[2] === "plural") {
      return verb;
    } else if (noun[2] === "singular" && verb[2] === "singular") {
      return verb;
    }
  });
  // filter the list of verbs to only contain verbs which fit in the available line syllable count
  let validVerbs = nounMatchedVerbs.filter(verb => (verb[1] + totalSyllables) <= maxSyllables);
  // return a random verb that meets both criteria
  return getRandomWord(validVerbs);
}

function getMoreWords(list, totalSyllables, maxSyllables) {
  // filter the list of adjectives to only contain adjectives which fit in the available line syllable count
  let validWords = list.filter(word => (word[1] + totalSyllables) <= maxSyllables);
  // return a random adjective that meets the criteria
  return getRandomWord(validWords);
}

function getLine(maxSyllables) {
  // the current number of syllables for the generated line
  let totalSyllables = 0;
  // store each word for the line
  let lineItems = [];
  // set the subject
  let subject = getSubject(subjectsList, maxSyllables);
  // add the subject's syllable value to the line value
  totalSyllables += subject[1];
  // add the subject to the lineItems array
  lineItems.push(subject);
  // randomly generate an article for the subject
  let subjectArticle = getArticle(subject);
  // if there is a non-empty string value for subject article, add 1 syllable to the line count
  if (subjectArticle !== " ") {
    totalSyllables += 1;
  }
  // add the subjectArticle to the front of the lineItems array
  lineItems.unshift(subjectArticle);
  // set the subject's verb
  let verb = getNounMatchedVerb(subject, maxSyllables, totalSyllables);
  // add the verb's syllable count to the line count
  totalSyllables += verb[1];
  // add the verb to the end of the lineItems array
  lineItems.push(verb);
  // if more words are needed for short lines, generate an adjective for the subject first
  if (maxSyllables === 5) {
    if (totalSyllables < maxSyllables) {
      let subjectAdjective = getMoreWords(adjectivesList, totalSyllables, maxSyllables);
      // ensure that the line is finished after picking a subject adjective
      while (subjectAdjective[1] !== maxSyllables - totalSyllables) {
        subjectAdjective = getMoreWords(adjectivesList, totalSyllables, maxSyllables);
      }
      // add the adjective's syllable count to the line total
      totalSyllables += subjectAdjective[1];
      // insert the subject adjective between the subject article and the subject
      lineItems.splice(1, 0, subjectAdjective);
      // generate a new article to match the subject adjective
      lineItems[0] = getArticle(subjectAdjective);
    }
  }

  // if more words are needed for the long line, generate an object first
  if (maxSyllables === 7) {
    if (totalSyllables + 1 < maxSyllables) {
      // all objects will be paired with the article 'the',
      // so 1 needs to be added to totalSyllables for filtering
      let object = getMoreWords(objectsList, totalSyllables + 1, maxSyllables);
      // add the object and article syllables to the line total
      totalSyllables += object[1] + 1;
      // add 'the' first
      lineItems.push(["the"]);
      // then add the object
      lineItems.push(object);
    }
    // if still more words are needed, add a conjuction
    if (totalSyllables < maxSyllables) {
      // get a conjection
      let conjunction = getMoreWords(conjunctionsList, totalSyllables, maxSyllables);
      // add the conjunction syllables to the line total
      totalSyllables += conjunction[1];
      // insert the conjunction after the verb and before the object article
      lineItems.splice(-2, 0, conjunction);
    }
    // if even more words are needed, add an object adjective
    if (totalSyllables < maxSyllables) {
      let objectAdjective = getMoreWords(adjectivesList, totalSyllables, maxSyllables);
      // ensure that the line is finished after picking an object adjective
      while (objectAdjective[1] !== maxSyllables - totalSyllables) {
        objectAdjective = getMoreWords(adjectivesList, totalSyllables, maxSyllables);
      }
      // add object adjective syllables to line total
      totalSyllables += objectAdjective[1];
      // insert the object adjective between the object article and the object
      lineItems.splice(-1, 0, objectAdjective);
    }
  }
  // create a new array containing only the word values of each lineItem
  let line = lineItems.map(item => item[0]);
  // output a new string from the array items
  line = line.join(' ');
  // capitalize the first letter of each line
  let leadingCap = line[0].toUpperCase();
  // concatenate the capitalized letter with the rest of the line
  line = leadingCap + line.slice(1);
  // return the completed line
  return line;
}

function generateHaiku() {
  const title = "STOCHASTIC HAIKU GENERATOR";
  const border = "=";
  const border2 = "*";
  const space = " ";
  const line1 = getLine(5);
  const line2 = getLine(7);
  const line3 = getLine(5);

  console.log(border.repeat(80));
  console.log(border2.repeat(80));
  console.log(border2 + space.repeat(78) + border2);
  console.log(border2 + space.repeat((78 - title.length) / 2) + title + space.repeat((78 - title.length) / 2) + border2);
  console.log(border2 + space.repeat(78) + border2);
  console.log(border2 + space.repeat((78 - line1.length) / 2) + line1 + space.repeat((79 - line1.length) / 2) + border2);
  console.log(border2 + space.repeat((78 - line2.length) / 2) + line2 + space.repeat((79 - line2.length) / 2) + border2);
  console.log(border2 + space.repeat((78 - line3.length) / 2) + line3 + space.repeat((79 - line3.length) / 2) + border2);
  console.log(border2 + space.repeat(78) + border2);
  console.log(border2 + space.repeat(78) + border2);
  console.log(border2.repeat(80));
  console.log(border.repeat(80));
}

const testFunctions = () => "app_start: module found > functions.js...";

export {
  generateHaiku,
  testFunctions
};