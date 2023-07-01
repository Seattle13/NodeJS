/* Sum of Digits / Digital Root

Digital root is the recursive sum of all the digits in a number.
Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.

Examples:
    16  -->  1 + 6 = 7
   942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2<-->
*/

// Answers
function digitalRoot(n) {
  let result = n.toString().split("");
  while (result.length != 1) {
    result = result.reduce((acc, e) => acc + Number(e), 0).toString().split("");
  }
  return Number(result)
}

console.log(digitalRoot(456))     // 6
console.log(digitalRoot(7029))    // 9
console.log(digitalRoot(123456))  // 3