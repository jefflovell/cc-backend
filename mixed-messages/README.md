# Mixed Messages
## CodeCademy Backend Engineering
### Portfolio Project | Fundamentals of Javascript

*For this project, you will build a message generator program. Every time a user runs a program, they should get a new, randomized output. You’re welcome to take the project in a couple of different forms, like an astrology generator, inspirational message, or nonsensical jokes. To make your program truly random, the message that it outputs should be made up of at least three different pieces of data. Take what you know of JavaScript syntax so far to build the program and customize it to your liking.*

#### Project Objectives:
* Build a message generator program using JavaScript
* Use Git version control
* Use command line
* Develop locally on your computer

#### Prerequisites:
* JavaScript
* Git and GitHub
* Command line

## Project Plan

### Goal

I have decided to make an English language haiku generator.  The three lines satisfies the requirement of *at least three different pieces of data* and who doesn't love a good haiku?

>hai•ku
>noun
>origin: Japanese | haikai no ku --> haiku (light verse)
>a Japanese poem of seventeen syllables, in three lines of five, seven, and five, traditionally evoking images of the natural world.

### Considerations

#### Basic Assembly

In order to create a haiku generator I will need not only a comprehensive list of phrases, or words which can be assembled into phrases, but the syllable count of each word so that I can ensure that my lines have the appropriate number of phrases.

There are a few ways I can immediately conceive of to approach this problem:
1. Stochastic method:
  - I can let the program assemble the phrases for each line based purely on concatenation of words to reach the correct number of syllables.
  - "randomness" would depend largely on the size of the dictionary and the selection method.
  - I would assume that this will lead to mostly junk poems but there's a non-zero chance for some hilarious or stochastically profound phrases.
2. Curatorial method:
  - I could build a dictionary of lines and pull from it so that the poems make some amount of sense but this seems time intensive from an authorship standpoint and prone to feeling stale without a very large dictionary.  However this approach would allow me to skip checking the number of syllables
  - For a semi-curatorial approach I could build individual phrases, and do some assembly programmatically, connecting a few phrases together.  This might be the best middle ground.

Regardless of approach, I will need to understand and attempt to handle at least the basic structures of English grammar.  The more effort put into handling nuance the more 'natural' the output will look.  For instance, replacing `a` with `an` if the subject starts with a vowel or adding esses to pluralize words.

#### Data Structures

I intend to use local in-memory data storage, namely either arrays or objects.

I need to store, at minimum, the word and its syllable count.  I may also want to store the word's grammar type (e.g. preposition, noun, verb) and possibly syntactical or semantic variants (plurals, possessives, a(n)).
  * I'm leaning toward arrays and a very simple approach at least for a first version where I use the orderedness of the array to key into the desired value, however objects may prove to be more appropriate in the future.

#### Extensibility & Maintainability

I intend to leverage modules so that my dictionaries are separate from my logic.  If the logic starts to grow complex, I may further refactor to separate the logic out in to various modules and compose them into my main script.



