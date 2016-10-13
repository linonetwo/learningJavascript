const { floor } = Math;
const toSource = require('tosource');
const escomplex = require('escomplex');

type OneDPeakType = (arr: [number]) => { index: number; value: number };
const oneDPeak: OneDPeakType = (arrToFindPeak: [number]) => {
  const length: number = arrToFindPeak.length;

  let firstIndex = 0;
  let lastIndex = length - 1;
  let middleIndex;

  while (firstIndex <= lastIndex) {
    middleIndex = floor((firstIndex + lastIndex) / 2);

    const currElement = arrToFindPeak[middleIndex];
    const leftElement = arrToFindPeak[middleIndex - 1];
    const rightElement = arrToFindPeak[middleIndex + 1];

    if (currElement < leftElement) {
      lastIndex = middleIndex - 1;
    } else if (currElement < rightElement) {
      firstIndex = middleIndex + 1;
    } else {
      return { index: middleIndex, value: currElement };
    }
  }
};

const twoDPeak = (arrToFindPeak: [[number]]) => {
  const lengthY: number = arrToFindPeak.length;
  const lengthX: number = arrToFindPeak[0].length;

  let firstIndexY = 0;
  let lastIndexY = lengthY - 1;
  let middleIndexY: number = floor((firstIndexY + lastIndexY) / 2);

  while (firstIndexY <= lastIndexY) {
    middleIndexY = floor((firstIndexY + lastIndexY) / 2);

    const { index: indexX, value: currElement } = oneDPeak(arrToFindPeak[middleIndexY]);
    if (middleIndexY - 1 >= 0 && middleIndexY + 1 < lengthY) {
      const upperElement: number = arrToFindPeak[middleIndexY - 1][indexX];
      const lowerElement: number = arrToFindPeak[middleIndexY + 1][indexX];
      if (currElement < upperElement) {
        lastIndexY = middleIndexY - 1;
      } else if (currElement < lowerElement) {
        firstIndexY = middleIndexY + 1;
      } else {
        return { indexX, indexY: middleIndexY, value: currElement };
      }
    } else if (middleIndexY - 1 < 0) {
      const lowerElement: number = arrToFindPeak[middleIndexY + 1][indexX];
      if (currElement < lowerElement) {
        firstIndexY = middleIndexY + 1;
      } else {
        return { indexX, indexY: middleIndexY, value: currElement };
      }
    } else {
      const upperElement: number = arrToFindPeak[middleIndexY - 1][indexX];
      if (currElement < upperElement) {
        lastIndexY = middleIndexY - 1;
      } else {
        return { indexX, indexY: middleIndexY, value: currElement };
      }
    }
  }
};
const result = escomplex.analyse(toSource(oneDPeak));
console.log(result);
console.log(oneDPeak([1, 2, 7, 8, 3, 4, 5, 6]));
// console.log(twoDPeak([[10, 8, 10, 10],
//                       [14, 13, 12, 11],
//                       [15, 9, 11, 21],
//                       [16, 17, 19, 20]]));
