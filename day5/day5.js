const fs = require("fs");

const fileName = './input.txt';
var lowest = 0;

try {
  input = fs.readFileSync(fileName, 'utf8');
} catch (err) {
  console.error('Read error: ', err);
}

function partOne(str) {

  var lowestAr = [];

  var seeds = Array.from(str.substring(input.indexOf(':'), input.indexOf('\n')).matchAll(/\d+/g),
    match => parseInt(match[0]));

  const strBreakPoints = [
    'seed-to-soil map:',
    'soil-to-fertilizer map:',
    'fertilizer-to-water map:',
    'water-to-light map:',
    'light-to-temperature map:',
    'temperature-to-humidity map:',
    'humidity-to-location map:'
  ]
  var fakeseeds = [14];

  seeds.forEach((seed) => {
    lowest = seed;
    for(let i = 0; i < strBreakPoints.length; i++) {
      if(i == 6) {
        let current = str.slice(str.indexOf(strBreakPoints[i]) + strBreakPoints[i].length).trim();
        calcLowest(current, lowest)
      }
      else {
        let current = str.slice(str.indexOf(strBreakPoints[i]) + strBreakPoints[i].length,str.indexOf(strBreakPoints[i+1])).trim();
        calcLowest(current, lowest)
      }
    }

    lowestAr.push(lowest)
  })

  console.log(Math.min(...lowestAr));
}

function partTwo(str, seeds) {

  var lowestAr = [];


  const strBreakPoints = [
    'seed-to-soil map:',
    'soil-to-fertilizer map:',
    'fertilizer-to-water map:',
    'water-to-light map:',
    'light-to-temperature map:',
    'temperature-to-humidity map:',
    'humidity-to-location map:'
  ]

  seeds.forEach((seed) => {
    lowest = seed;
    for(let i = 0; i < strBreakPoints.length; i++) {
      if(i == 6) {
        let current = str.slice(str.indexOf(strBreakPoints[i]) + strBreakPoints[i].length).trim();
        calcLowest(current, lowest)
      }
      else {
        let current = str.slice(str.indexOf(strBreakPoints[i]) + strBreakPoints[i].length,str.indexOf(strBreakPoints[i+1])).trim();
        calcLowest(current, lowest)
      }
    }

    lowestAr.push(lowest)
  })

  return (Math.min(...lowestAr));
}

function partTwoInput(str) {

  var seeds = Array.from(str.substring(input.indexOf(':'), input.indexOf('\n')).matchAll(/\d+/g),
  match => parseInt(match[0]));

  var lowestOfTheLow = [];

  for(let i = 0; i < seeds.length; i += 2) {
    let seedRange = [];
    for(let j = 0; j < seeds[i+1]; j++) {
      seedRange.push(seeds[i]+j);
    }
    lowestOfTheLow.push(partTwo(str, seedRange));
  }

  console.log(Math.min(...lowestOfTheLow));

  
}
function calcLowest(str, seed) {
  const lines = str.split('\n');
  const numAr = lines.map(line => line.split(' ').map(Number));
  for(let i = 0; i < numAr.length; i++) {
    if(seed >= numAr[i][1] && seed < numAr[i][1] + numAr[i][2]) {
      lowest = numAr[i][0] + (seed - numAr[i][1])
      break;
    }
  }
}

partOne(input);
//partTwoInput(input);