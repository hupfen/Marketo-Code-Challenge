# Marketo-Code-Challenge
Submission for front-end developer

# Setup
This code requires [NodeJS](https://nodejs.org/). After pulling the code, use a terminal to access the folder and type

> npm install

To install dependencies.

# Running
This is a command-line JavaScript application. With a terminal pointed to the folder, run the application with:

> node app.js [source] [target] [log file] [lodash]

## Settings/Arguments

- Source: the .json file containing the leads being evaluated. Required.
- Target: the .json file to write out the results of de-duping. Optional; defaults to 'result.json'.
- Log File: the file to write out logs of changes. Optional; defaults to 'log.txt'.
- Lodash: use [LoDash](https://lodash.com/) data processing; see below.

## Lodash?

In a realistic, production setting, I'd use libraries to handle as many common algorithms and data parsing actions as possible.
I prefer this approach simply because it reduces the chances of me making a dumb mistake.
However, from doing (and judging) code samples in the past, I know that using something like Lodash fits the letter of the task, but not the spirit.

Therefore: by default, the code runs using hand-written data processing and parsing functions. However,
if the fourth argument given when running the code is 'lodash' (no quotes), the application will instead use the 
Lodash library for those tasks. The outputs should be identical.
