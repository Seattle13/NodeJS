/* Multiplication table

Your task, is to create N×N multiplication table, of size provided in parameter.

For example, when given size is 3:
1 2 3
2 4 6
3 6 9

For the given example, the return value should be:
[ [1, 2, 3], [2, 4, 6], [3, 6, 9] ]
*/

// Answers

function multiplicationTable(size) {
  let table = [];
  for (let i = 1; i <= size; i++) {
    let array = [];
    for (let j = 1; j <= size; j++) {
      array.push(i * j);
    }
    table.push(array);
  }
  return table;
}

console.log(multiplicationTable(1)) // [ [ 1 ] ]
console.log(multiplicationTable(2)) // [ [ 1, 2 ], [ 2, 4 ] ]
console.log(multiplicationTable(3)) // [ [ 1, 2, 3 ], [ 2, 4, 6 ], [ 3, 6, 9 ] ] 