// calculate('((9-8)+ 20 )/3 * (2*(13-12)) - 16'); // -2
// calculate('((9-8)+ 20 )/3 * (2*(13-12)) - 16'); // -2

// splits each character of the string into elements of an array and combines any numbers larger than single digits into a single element
const cleanStringToArray = (string) => {
  
  const cleanArr = string.replace(/ /g, '').split('');
  let finishedArr = [];

  for (let i = 0; i < cleanArr.length; i++) {
    if (i === 0) {
      finishedArr.push(cleanArr[i]);
    } else {
      if (isNaN(cleanArr[i])) {
        finishedArr.push(cleanArr[i])
      } else {
          if (!isNaN(finishedArr[finishedArr.length - 1])) {
            finishedArr[finishedArr.length - 1] += cleanArr[i]
          } else {
              finishedArr.push(cleanArr[i])
          }
        }
      } 
    }
  return finishedArr;
}

//changes each string that contains a number from a string to a number value
const parseTheNumbers = (arr) => {
  
  let parsedArr = []

  for (element of arr) {
    parsedArr.push(!isNaN(element) ? Number.parseInt(element) : element)
  }
  
  return parsedArr
}

//checks to see if the expression given has an equal number of opened and closed parentheses
const checkForEqualParentheses = (arr) => {
  
  let openPar = 0;
  let closedPar = 0;

  for (element of arr) {
    if (element === '(') { openPar++; }
    else if (element === ')') { closedPar++; }
  }

  return closedPar === openPar;
}

//performs the required operation when given two numbers and a string with the operator
const simpleMath = ({ x, y, operation }) => {
  let result;
  if (operation === '+') {
    result = x + y;
  } else if (operation === '-') {
    result = x - y;
  } else if (operation === '*') {
    result = x * y;
  } else if (operation === '/') {
    result = y === 0 ? 'cannot divide by 0' : x / y;
  }
  return result;
}

const orderOfOperations = (arr) => {
  if (arr.includes('/') || arr.includes('*')) {
    let firstDivision = arr.indexOf('/') 
    let firstMultiplication = arr.indexOf('*')

    if ((firstDivision > 0 && firstDivision < firstMultiplication) || firstDivision > 0 && firstMultiplication < 0) {
      let slicedArray = arr.slice(firstDivision - 1, firstDivision + 2)
      arr.splice(firstDivision - 1, 3, simpleMath({
        x: slicedArray[0],
        y: slicedArray[2],
        operation: slicedArray[1],
        }))
      
        if (arr.includes('You cannot divide by 0!')) { return 'You cannot divide by 0!'}

    } else if (firstMultiplication > 0) {
      
      let slicedArray = arr.slice(firstMultiplication - 1, firstMultiplication + 2)
      
      arr.splice(firstMultiplication - 1, 3, simpleMath({
        x: slicedArray[0],
        y: slicedArray[2],
        operation: slicedArray[1],
        }))
    }
    if (arr.length > 1) { orderOfOperations(arr) }
  }

  if (arr.includes('+') || arr.includes('-')) {
    let firstPlus = arr.indexOf('+') 
    let firstMinus = arr.indexOf('-')

    if (firstMinus < 0 || (firstMinus > 0 && firstPlus > 0 && firstPlus < firstMinus)) {
      let slicedArray = arr.slice(firstPlus - 1, firstPlus + 2)
      arr.splice(firstPlus - 1, 3, simpleMath({
        x: slicedArray[0],
        y: slicedArray[2],
        operation: slicedArray[1],
        }))
    } else {
      let slicedArray = arr.slice(firstMinus - 1, firstMinus + 2)
      arr.splice(firstMinus - 1, 3, simpleMath({
        x: slicedArray[0],
        y: slicedArray[2],
        operation: slicedArray[1],
        }))
    }
    if (arr.length > 1) { orderOfOperations(arr) }
  }
  return arr[0]
}

//takes an array and navigates order of operations to solve the expression
const doTheMath = (arr) => {
  if (arr.includes('(') || arr.includes(')')) {
    
    let openPar = arr.indexOf('(')
    let nextOpenPar = arr.indexOf('(', openPar + 1) >= 0 ? arr.indexOf('(', openPar + 1) : null
    let closedPar = arr.indexOf(')')

    if (nextOpenPar != null && nextOpenPar < closedPar) {
      let slicedArray = arr.slice(nextOpenPar, closedPar + 1);
      arr.splice(nextOpenPar, closedPar - nextOpenPar + 1, doTheMath(slicedArray))
    } else {
      let slicedArray = arr.slice(openPar + 1, closedPar);
      arr.splice(openPar, closedPar - openPar + 1, orderOfOperations(slicedArray))
    }
  }
  if (arr.length != 1 && (arr.includes('(') || arr.includes(')'))) {
    doTheMath(arr)
  } else if (arr.length != 1) {
    orderOfOperations(arr)
  } else {
    return arr[0]
  }
return arr[0]
}

const calculate = (string) => {
  let parsedArray = parseTheNumbers(cleanStringToArray(string))
  if (checkForEqualParentheses(parsedArray) != true) { return 'There is not an equal number of parentheses'}
  let answer = doTheMath(parsedArray)
  console.log(answer)
}

calculate('12    + 12');