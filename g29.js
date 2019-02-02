/* eslint no-console : 0 */


let g = require('logitech-g29');

let options = {
	autocenter : false,
	range      : 900,
};


// g.on('pedals-gas',    (value) => { console.log('pedals-gas    : %s', value); });
g.on('pedals-gas', (value) => {
	let force_value = 0.58 + ((value - 0.16) / 2);

	console.log('pedals-gas    : %s : %s', value, force_value);
	g.leds(0.05 + value);

	g.forceConstant(force_value);

	if (value === 0) {
		g.forceOff();
		g.leds();
	}
});


g.on('pedals-brake',  (value) => { console.log('pedals-brake  : %s', value); });
g.on('shifter-gear',  (value) => { console.log('shifter-gear  : %s', value); });
// g.on('wheel-turn',    (value) => { console.log('wheel-turn    : %s', value); });


// g.on('pedals-clutch', (value) => { console.log('pedals-clutch : %s', value); });
g.on('pedals-clutch', (value) => {
	let force_value = 0.5 - (value / 2);

	console.log('pedals-clutch : %s : %s', value, force_value);
	g.forceConstant(force_value);

	if (value === 0) g.forceOff();
});

// g.on('xxx', (value) => { console.log('xxx: %s', value); });
// g.on('xxx', (value) => { console.log('xxx: %s', value); });
// g.on('xxx', (value) => { console.log('xxx: %s', value); });
// g.on('xxx', (value) => { console.log('xxx: %s', value); });
// g.on('xxx', (value) => { console.log('xxx: %s', value); });


g.connect(options, (error) => {
	console.log('connected');

	if (error) {
		console.log(error);
		process.exit();
	}
});
