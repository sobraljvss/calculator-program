math.import({ln: math.log}); // importing natural logarithm

let angUnit = 'deg', // degrees or radians
    operators = Array.from($('.operators')).map(button => button.value), // operators (+, -, ^ etc)
    symbols = Array.from($('.symbols')).map(button => button.value); // symbols (e, pi, i)

// Clear screen on reload
$('#display').val('');

// Numbers and other simple buttons
Array.from($('.simple')).forEach(button => button.addEventListener('click', () => $('#display').val($('#display').val() + button.value)));

// Operators buttons
Array.from($('.operators')).forEach(button => button.addEventListener('click', () => {
  if (operators.includes($('#display').val().charAt($('#display').val().length-1))) {
    if (button.value != '-') {
      $('#display').val($('#display').val().slice(0, -1));
    } else {
      $('#display').val($('#display').val() + '(');
    }
  }

  if ($('#display').val().charAt($('#display').val().length-1) == '.') {
    $('#display').val($('#display').val() + '0');
  }
  $('#display').val($('#display').val() + button.value);
}));

// Point and percentage buttons
Array.from($('.unique')).forEach(button => button.addEventListener('click', () => {
  let notnums = $('#display').val().split('').filter(digit => !math.hasNumericValue(digit));
  if (!$('#display').val().slice($('#display').val().lastIndexOf(notnums[notnums.length-1])).includes(button.value)) {
    if (!math.hasNumericValue($('#display').val().charAt($('#display').val().length-1)) && !symbols.includes($('#display').val().charAt($('#display').val().length-1))) {
      $('#display').val($('#display').val() + '0');
    }
    $('#display').val($('#display').val() + button.value);
  }
}));

// Degree/radian button
$('#angUnit').click(() => {
  angUnit = (angUnit == 'deg') ? 'rad' : 'deg';
  $('#angUnit').text(angUnit);
});

// Euler number, pi and imaginary number 
Array.from($('.symbols')).forEach(button => {
  button.addEventListener('click', () => {
    if (symbols.includes($('#display').val().charAt($('#display').val().length-1))) {
      $('#display').val($('#display').val() + '*');
    }
    $('#display').val($('#display').val() + button.value);
  });
});

// Function-like buttons (MathJS treats them using a keyword and parenthesis)
Array.from($('.functions')).forEach(button => button.addEventListener('click', () => {$('#display').val($('#display').val() + button.value + '(')}));

// Trigonometry-related buttons (sin, cos and tan)
Array.from($('.trigonometry')).forEach(button => button.addEventListener('click', () => $('#display').val($('#display').val() + angUnit + ' ')));

// Equals button
$('#equals').click(() => {
  while (Array.from($('#display').val().matchAll(/[(]/g)).length > Array.from($('#display').val().matchAll(/[)]/g)).length){
    $('#display').val($('#display').val() + ')');
  } 
  while (Array.from($('#display').val().matchAll(/[)]/g)).length > Array.from($('#display').val().matchAll(/[(]/g)).length){
    $('#display').val('(' + $('#display').val());
  }
  expression = $('#display').val();

  try{$('#display').val(math.format(math.evaluate($('#display').val()), {notation: 'auto', lowerExp: -9, upperExp: 9}));}
  catch (Error) {
    $('#display').val('Error');
    $('#display').val('');
  }
});

// Clear and Backspace buttons
$('#clear').click(() => {
  $('#display').val('');
});
$('#backspace').click(() => {
  $('#display').val($('#display').val().slice(0, -1));
});

// Make keyboard buttons usable
window.addEventListener('keydown', event => {
  if ($('#display').is(':focus') && event.key != 'Enter') {}
  else{
    if (event.key == '/' || event.key == 'Enter') {event.preventDefault();}
    else if (event.key == ',') {$('#point').click();}
    try{
      Array.from($('button')).filter(button => button.getAttribute('key') == event.key)[0].click();
    } catch (TypeError) {} // Ignores keys with no matching button
  }
});

function changeColors(){ // Change color on reload
  // Select a rgb color and a secondary rgb color based on 255 minus a random "section" (r, g or b) of the first color for all of their "sections"
  let color = {r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256)},
  colorSection = [color.r, color.g, color.b][Math.floor(Math.random() * 3)],
  secColor = {r: 255-colorSection, g: 255-colorSection, b: 255-colorSection};

  // Remove mixes of bright colors with white (so nobody gets their eyes hurt)
  if (((color.r > 200) && (secColor.r > 200)) || ((color.g > 200 && secColor.g > 200)) || ((color.b > 200) && (secColor.b > 200))) {changeColors();}

  $('body').css('background', `radial-gradient(rgb(${color.r}, ${color.g}, ${color.b}), rgb(${secColor.r}, ${secColor.g}, ${secColor.b}))`);
  $('#tools').children('button').css('background-color', `rgba(${secColor.r}, ${secColor.g}, ${secColor.b}, 0.5)`);
}
changeColors();