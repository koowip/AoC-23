const fs = require("fs");

const fileName = './input.txt';

var input;

try {
  input = fs.readFileSync(fileName, 'utf8');
} catch (err) {
  console.error('Read error: ', err);
}

var inputSplitByNewline = input.split('\r\n');
var regexN = /\d+/;
var regexC = (/\b(?:green|blue|red)\b/);

// //Part 1

// var rules = {
//   'r': 12,
//   'g': 13,
//   'b': 14
// }

// var dict = {};


// for(let i = 0; i < inputSplitByNewline.length; i++) {
//   let cur = inputSplitByNewline[i]
//   let hasDigit = cur.match(regexN);
//   let gameNum = hasDigit[0];
//   dict[gameNum] = gameNum;


//   cur = cur.substring(cur.indexOf(':') + 1)
//   hasDigit = cur.match(regexN);
  
//   while(hasDigit !== null) {
//     amount = hasDigit[0]
//     color = cur.match(regexC)
//       if(rules[color[0].charAt(0)] < +amount) {
//         dict[gameNum] = 0;
//         break;
//       }
//     cur = cur.substring(color.index + color[0].length + 1)
//     hasDigit = cur.match(regexN);
//   }
// }

// var total = 0;

// for(let key in dict) {
//   if(dict[key] !== 0)
//     total += +dict[key]
// }


//Part 2

var dict = [];

var total = 0;

for(let i = 0; i < inputSplitByNewline.length; i++) {
  let cur = inputSplitByNewline[i]
  cur = cur.substring(cur.indexOf(':') + 1)
  gameStats(cur);
}

console.log(total)

function gameStats(gameStr) {
  
  fewestSet = {
    'r': 0,
    'g': 0,
    'b': 0
  };

  hasDigit = gameStr.match(regexN);

  while(hasDigit !== null) {
    color = gameStr.match(regexC)

    if(fewestSet[color[0].charAt(0)] < +hasDigit[0])
      fewestSet[color[0].charAt(0)] = +hasDigit[0]


    gameStr = gameStr.substring(color.index + color[0].length + 1)
    hasDigit = gameStr.match(regexN);
  }


  total += (fewestSet['r'] * fewestSet['g'] * fewestSet['b'])
}