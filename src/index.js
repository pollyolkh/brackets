module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketPairs = {};
  const openBrackets = new Set();
  const closeBrackets = new Set();
  const sameBrackets = new Set();

  for (const [open, close] of bracketsConfig) {
    bracketPairs[close] = open;

    openBrackets.add(open);
    closeBrackets.add(close);

    if (open === close) {
      sameBrackets.add(open);
    }
  }

  for (const char of str) {
    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (closeBrackets.has(char)) {
      if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
        return false;
      }
    } else if (openBrackets.has(char)) {
      stack.push(char);
    } else {
      return false;
    }
  }

  return stack.length === 0;
};
