const fs = require("fs");

const fileName = './input.txt';

var input;

try {
  input = fs.readFileSync(fileName, 'utf8');
} catch (err) {
  console.error('Read error: ', err);
}

var inputSplitByNewline = input.split('\n');
var total = 0;


const regex = /(\d)/g;


for (let i = 0; i < inputSplitByNewline.length; i++) {
  inputSplitByNewline[i] = inputSplitByNewline[i].match(regex).join('');
  inputSplitByNewline[i] = inputSplitByNewline[i][0] + inputSplitByNewline[i][inputSplitByNewline[i].length - 1]
  total += +inputSplitByNewline[i];
}

console.log(total);

//Part 1 solution ^


// const frontRegex = /(?:one|two|three|four|five|six|seven|eight|nine|\d)/;
// const backRegex = /(?:eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d)/;
// var values = [];

// const strToIntMap = {
//   'one': '1',
//   'two': '2',
//   'three': '3',
//   'four': '4',
//   'five': '5',
//   'six': '6',
//   'seven': '7',
//   'eight': '8',
//   'nine': '9'
// }

// for (let i = 0; i < inputSplitByNewline.length; i++) {
//   let a = [];
  
//   firstEntry = inputSplitByNewline[i].match(frontRegex)[0];
//   if(Number.isInteger(+firstEntry))
//     a[0] = firstEntry;
//   else
//     a[0] = strToIntMap[firstEntry];
  
  
  
//   let b = inputSplitByNewline[i].split("").reverse().join("");
//   b = b.match(backRegex);

//   secondEntry = b[0].split("").reverse().join("");
//   if(Number.isInteger(+secondEntry))
//     a[1] = secondEntry;
//   else
//     a[1] = strToIntMap[secondEntry];


  
//   values[i] = a[0] + a[1];
//   total += +values[i];
// }

//   console.log(total);
