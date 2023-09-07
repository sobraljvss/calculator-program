let calc = '';

// Clear screen on reload
$('#area').text('');

// Number buttons
Array.from($('.number')).forEach(button => button.addEventListener('click', () => calc += button.value));

// All buttons update screen
Array.from($('button')).forEach(button => button.addEventListener('click', () => $('#screen').text(calc)));

