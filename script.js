let calc = '';
let numbers = Array.from(Array(10).keys()).map(num => String(num));
let operators = Array.from($('.operator')).map(button => button.value);

// Clear screen on reload
$('#area').text('');

// Numbers and parenthesis buttons
Array.from($('.numbers')).forEach(button => button.addEventListener('click', () => calc += button.value));
Array.from($('.parenthesis')).forEach(button => button.addEventListener('click', () => calc += button.value));

// Operators buttons
Array.from($('.operators')).forEach(button => button.addEventListener('click', () => {
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

// Clear and Backspace buttons
$('#clear').click(() => calc = '');
$('#backspace').click(() => calc = calc.slice(0, -1));

// All buttons update screen
Array.from($('button')).forEach(button => button.addEventListener('click', () => $('#screen').text(calc)));

// Make keyboard buttons usable
window.addEventListener('keydown', event => {
  if (event.key == '/' || event.key == 'Enter') {event.preventDefault();}
  else if (event.key == ',') {$('#point').click();}
  try{
    if (event.key != 'Shift') {
      Array.from($('button')).filter(button => button.getAttribute('key') == event.key)[0].click();
    }
  } catch (TypeError) {} // Ignores keys with no matching button
});

// Change color with reload [TEST]
/*$('body').css('background', `radial-gradient(rgb(${color.r}, ${color.g}, ${color.b}), rgb(${comp_color.r}, ${comp_color.g}, ${comp_color.b}))`);
$('#tools > button').css('background-color', `rgba(${comp_color.r}, ${comp_color.g}, ${comp_color.b}, 0.5)`);
$('#tools > button').mouseenter(() => $(this).css('background-color', `rgba(${comp_color.r}, ${comp_color.g}, ${comp_color.b}, 0.7)`));*/