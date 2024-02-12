const fs = require('fs');
const readline = require('readline');

const fileName = './input.txt';
var input = []
var total = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream(fileName);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    input.push(line);
  }
}

function digitIndexes(text) {
  const regex = /\d+/g;
  var indexList = []
  var nextNum;
  while((nextNum = regex.exec(text)) !== null) {
    let startIndex = nextNum.index;
    let endIndex = nextNum.index + nextNum[0].length - 1;
    result = [startIndex, endIndex];
    indexList.push(result);
  }

  return indexList;
  
}

function isAdjacent(text, currentLine, indexPairs) {

  const isSymbol = (char) => /[^0-9.]/.test(char);
  let isMatch = false;
  const offsets = [
    [-1, -1], [-1,  0], [-1,  1],
    [0, -1],            [0,  1],
    [1, -1], [1,  0], [1,  1]
  ];

  
  outerloop:
  for(const [start, end] of indexPairs) {
    for(let index = start; index <= end; index++) {
      const rowIndex = currentLine;
      const colIndex = index;

      for(const [rowOffset, colOffset] of offsets) {
        const newRowIndex = rowIndex + rowOffset;
        const newColIndex = colIndex + colOffset;
        if(newRowIndex >= 0 && newRowIndex < text.length && 
          newColIndex >= 0 && newColIndex < text[currentLine].length) {
            if(isSymbol(text[newRowIndex].charAt(newColIndex))) {
              let r = text[currentLine];
              r = r.substring(start, end + 1)
              total += +r;
              //console.log(r);
              continue outerloop;
            }
        }
      }
    }
  }
}

(async () => {
  await processLineByLine();

  for(let i = 0; i < input.length; i++) {
    let indexPairs = (digitIndexes(input[i]))
    isAdjacent(input, i, indexPairs);
  }

  console.log(total);
})();
