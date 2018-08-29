export default function (str) {
  let result = 0;
  let parts = str.split(' ');
  let nums = parts.map(parseFloat);

  let parsed = [];

  for (var i = parts.length-1; i >= 0; i--) {
    let p = parts[i];
    let num = nums[i];

    if (!isNaN(num)) {
      parsed.push(num);
    } else {
      if (p === '*') {
        let prev = parsed.pop();
        parsed.push(nums[--i] * prev);
      } else if (p === '/') {
        let prev = parsed.pop();
        parsed.push(nums[--i] / prev);
      } else if (p === '-') {
        parsed.push(0 - parsed.pop());
      }
    }
  }

  result = parsed.reduce((n, a) => n + a, 0);
  return result;
}
