import { DIRECTIONS, DX, DY, INFINITY } from "./constants"

const createMaxValueArray = (count: number): number[] => {
    return Array(count).fill(INFINITY)
}

const createWhitePixelNode = (rowIndex: number, columnIndex: number): number[] => {
    const distanceCost = 0;
    return [rowIndex, columnIndex, distanceCost];
}


const search = (rows: number, columns: number, bitmap: number[][]): number[][] => {
   const queue: number[][] = [];
   bitmap.forEach((row: number[], rowIndex: number) => {
     return row.forEach((pixel: number, columnIndex: number) => {
       if (pixel === 1) {
         queue.push(createWhitePixelNode(rowIndex, columnIndex));
       }
     });
   });

   const resultBitmap: number[][] = createMaxValueArray(rows).map(() =>
     createMaxValueArray(columns),
   );

   const isNotVisited = (x: number, y: number): boolean => {
    return resultBitmap[x][y] === INFINITY;
  }

  const isInBoundaries = (x: number, y: number): boolean => {
    return x >= 0 && x < rows && y >= 0 && y < columns;
  }

   const queueLength: number = queue.length;
   while (queueLength > 0 && queue[0]) {
     const currentNode: number[] = queue[0];
     const [rowIndex, columnIndex, distanceCost] = currentNode as [number, number, number];

     if (distanceCost < resultBitmap[rowIndex][columnIndex]) {
       resultBitmap[rowIndex][columnIndex] = distanceCost;
     }

     for (let directionIndex = 0; directionIndex < DIRECTIONS; ++directionIndex) {
       const newRowIndex: number = rowIndex + DX[directionIndex];
       const newColumnIndex: number = columnIndex + DY[directionIndex];
       if (isInBoundaries(newRowIndex, newColumnIndex) && isNotVisited(newRowIndex, newColumnIndex)) {
         resultBitmap[newRowIndex][newColumnIndex] = distanceCost + 1;
         queue.push([newRowIndex, newColumnIndex, distanceCost + 1]);
       }
     }

     queue.shift();
   }

   return resultBitmap;
 }

 export { search };