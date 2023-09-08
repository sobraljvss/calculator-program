let calc = '';
let numbers = Array.from(Array(10).keys()).map(num => String(num));
let operators = Array.from($('.operator')).map(button => button.value);

// Clear screen on reload
$('#area').text('');

// Number buttons
Array.from($('.number')).forEach(button => button.addEventListener('click', () => calc += button.value));

// Operator buttons
Array.from($('.operator')).forEach(button => button.addEventListener('click', () => {
  if (operators.includes(calc.charAt(calc.length-1))) {calc = calc.slice(0, -1);}
  if (calc.charAt(calc.length-1) == '.') {calc += '0';}
  calc += button.value;
}));

// Point button
$('#point').click(() => {
  if (!numbers.includes(calc.charAt(calc.length-1))) {calc += 0;}
  calc += '.';
});

// Equals button
$('#equals').click(() => {
  try {
    if (Array.from(calc.matchAll(/[(]/g)).length > Array.from(calc.matchAll(/[)]/g)).length) {calc += ')';} else if (Array.from(calc.matchAll(/[)]/g)).length > Array.from(calc.matchAll(/[(]/g)).length) {calc = '(' + calc;}
    calc = String(eval(calc));
  } catch (SyntaxError) {
    calc = calc.slice(1);
  }
});

// TODO: test parenthesis

// Clear and Backspace buttons
$('#clear').click(() => calc = '');
$('#backspace').click(() => calc = calc.slice(0, -1));

// All buttons update screen
Array.from($('button')).forEach(button => button.addEventListener('click', () => $('#screen').text(calc)));

