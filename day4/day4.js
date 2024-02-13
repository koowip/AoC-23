const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('./input.txt');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

var totals = {
  'partOne': 0,
  'partTwo': 0
}

var cardTotals = [];

function partOne(input) {
  var regexIter = /\d+/g;
  var winners = input.substring(input.indexOf(':'), input.indexOf('|'));
  var card = input.substring(input.indexOf('|'));
  let iterTotal = 0;

  for(const match of card.matchAll(regexIter)) {
    
    let regexWin = new RegExp('\\b' + match[0] + '\\b')
    
    if(regexWin.test(winners)) {
      if(iterTotal > 0)
        iterTotal *= 2;
      else
        iterTotal += 1;
    } 
  }

  totals['partOne'] += iterTotal;
}

function partTwo(input) {

  var regexIter = /\d+/g;
  var cardNumber = input.match(/\d+/);
  var winners = input.substring(input.indexOf(':'), input.indexOf('|'));
  var card = input.substring(input.indexOf('|'));
  var wins = 0;

  

  for(const match of card.matchAll(regexIter)) {  
    let regexWin = new RegExp('\\b' + match[0] + '\\b')
    
    if(regexWin.test(winners)) {
      wins += 1;
    }
  }

  var card = {
    'cardNum': cardNumber,
    'cardWins': wins,
    'cardAmt': 1
  }

  cardTotals.push(card);
}

function partTwoAmt() {
  
  for(let i = 0; i < cardTotals.length; i++) {
    for(let k = 0; k < cardTotals[i].cardAmt; k++) {
      if(cardTotals[i].cardWins === 0) {}
      else {
        for(let j = 0; j < cardTotals[i].cardWins; j++) {
          cardTotals[i+(j+1)].cardAmt += 1;
        }
      }
      
    }
    totals.partTwo += cardTotals[i].cardAmt;
  }
}

rl.on('line', (line) => {
  partOne(line);
  partTwo(line);
})

rl.on('close', () => {

  console.log('Part One Answer: ' + totals['partOne']);
  
  partTwoAmt();
  console.log('Part Two Answer: ' + totals['partTwo']);

});
