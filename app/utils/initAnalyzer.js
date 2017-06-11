var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
function initAnalyzer (audio) {
	context = new AudioContext();
	analyser = context.createAnalyser();
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}

function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#00b2b3'; // Color of the bars
	bars = 170;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 2;
		bar_width = 1.1;
		bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}
module.exports = initAnalyzer;