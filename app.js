//IIFE for collision safety (defense! defense!)

;(function() {
'use strict';
var fs = require('fs');

// file source
var leads = fs.readFileSync(process.argv[2], {'encoding': 'utf8'});
var output = (typeof process.argv[3] !== "undefined") ? process.argv[3] : 'result.json';
var logFile = (typeof process.argv[4] !== "undefined") ? process.argv[4] : 'log.txt';
var switchFunc = process.argv[5];

// optionally, use LoDash to do the hard parts, because honestly I would in real life
var lodash = require('lodash');
  
function initLog() {
  // append newline and date to log file
  fs.appendFileSync(logFile, '-----');
  fs.appendFileSync(logFile, '\n');
  // looks weird, but compact way to get date: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
  fs.appendFileSync(logFile, new Date().toJSON().slice(0,10));
  fs.appendFileSync(logFile, '\n');
};
  
function removeLog(resultsArray, index, lead) {
  var logMsg = 'Element at index ' + index + ' updated:';

  // find the dupe and remove it
  if (resultsArray[index]._id !== lead._id) {
    logMsg += ' ID: ' + resultsArray[index]._id + ' to ' + lead._id;
  }
  if (resultsArray[index].email !== lead.email) {
    logMsg += ' Email: ' + resultsArray[index].email + ' to ' + lead.email;
  }

  console.log(logMsg);
  fs.appendFileSync(logFile, logMsg);
  fs.appendFileSync(logFile, '\n');
};

function findIndex(searchArray, lead) {
  var result = -1;
  searchArray.forEach(function(elem, index) {
    if (elem._id === lead._id || elem.email === lead.email) {
      result = index;
    }
  });
  return result;
};

function useRaw(inputJSON) {
    
  initLog();
  
  var leadsOriginal = JSON.parse(inputJSON).leads || [];
  var leadsResult = [];
  
  leadsOriginal.forEach(function(lead) {
    var matchIndex = findIndex(leadsResult, lead);
    /*var matchIndex = lodash.findIndex(leadsResult, function(elem) {
      return elem._id === lead._id || elem.email === lead.email;
    });*/
    if (matchIndex !== -1) {
      removeLog(leadsResult, matchIndex, lead);
      // remove element
      leadsResult.splice(matchIndex, 1);
    }
    
    // since the array is sorted by date precedence, latest element always gets written
    leadsResult.push(lead);
  });
  
  return { 'leads': leadsResult };
};
  
function useLodash(inputJSON) {
    
  console.log('using lodash');
  initLog();
  
  var leadsOriginal = JSON.parse(inputJSON).leads || [];
  var leadsResult = [];
  
  leadsOriginal.forEach(function(lead) {
    var matchIndex = lodash.findIndex(leadsResult, function(elem) {
      return elem._id === lead._id || elem.email === lead.email;
    });
    if (matchIndex !== -1) {
      removeLog(leadsResult, matchIndex, lead);
      // remove element
      lodash.remove(leadsResult, function(elem) {
        return elem._id === lead._id || elem.email === lead.email;
      });
    }
    
    // since the array is sorted by date precedence, latest element always gets written
    leadsResult.push(lead);
  });
  
  return { 'leads': leadsResult };
};
  
var command = (switchFunc === 'lodash') ? useLodash : useRaw;
  
fs.writeFileSync(output, JSON.stringify(command(leads), null, '\t'));
console.log('Result written to: ' + output);
})();