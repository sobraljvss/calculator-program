var calc = '',
    color,
    color_section,
    sec_color,
    numbers = Array.from(Array(10).keys()).map(num => String(num)),
    s_numbers = numbers.map(num => String(num)),
    operators = Array.from($('.operators')).map(button => button.value);

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
  var notnums = calc.split('').filter(digit => !math.hasNumericValue(digit));
  if (!calc.slice(calc.lastIndexOf(notnums[notnums.length-1])).includes('.')) {
    if (!math.hasNumericValue(calc.charAt(calc.length-1))) {calc += 0;}
    calc += '.';
  }
});

// Equals button
$('#equals').click(() => {
  if (Array.from(calc.matchAll(/[(]/g)).length > Array.from(calc.matchAll(/[)]/g)).length) {calc += ')';} else if (Array.from(calc.matchAll(/[)]/g)).length > Array.from(calc.matchAll(/[(]/g)).length) {calc = '(' + calc;}
  calc = (math.isNaN(math.evaluate(calc))) ? 'Oops :/' : math.evaluate(calc).toLocaleString('en-US', options={maximumFractionDigits: 3});
});

// Clear and Backspace buttons
$('#clear').click(() => calc = '');
$('#backspace').click(() => calc = calc.slice(0, -1));

// All buttons update screen
Array.from($('button')).forEach(button => button.addEventListener('click', () => {
  $('#screen').text(calc);
}));

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

function changeColors(){
  // Change color with reload
  color = {r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256)};
  color_section = [color.r, color.g, color.b][Math.floor(Math.random() * 3)];
  sec_color = {r: 255-color_section, g: 255-color_section, b: 255-color_section}

  if ((color.r > 200 && sec_color.r > 200) || (color.g > 200 && sec_color.g > 200) || (color.b > 200 && sec_color.b > 200)) {changeColors();}

  $('body').css('background', `radial-gradient(rgb(${color.r}, ${color.g}, ${color.b}), rgb(${sec_color.r}, ${sec_color.g}, ${sec_color.b}))`);
  $('#tools').children('button').css('background-color', `rgba(${sec_color.r}, ${sec_color.g}, ${sec_color.b}, 0.5)`);
}
changeColors();