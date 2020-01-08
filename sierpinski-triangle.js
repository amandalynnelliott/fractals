window.onload = function () {
	var canvas = document.getElementById("canvas"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	/** @type {CanvasRenderingContext2D} */
	const context = canvas.getContext("2d");

	context.translate(width / 2, height / 2);

	const slider = document.getElementById('slider');

	const bgColor1 = "#F6CAB4";
	const bgColor2 = "#4CA69C";
	const bgColor3 = "#EA5356";

	function bgFill(bgColor1, bgColor2, bgColor3) {
		const bgGrd = context.createRadialGradient(0, 0, 50, 0, 0, 700);
		bgGrd.addColorStop(0, bgColor1);
		bgGrd.addColorStop(0.5, bgColor2);
		bgGrd.addColorStop(1, bgColor3);

		context.fillStyle = bgGrd;
		context.fillRect(-width / 2, -height / 2, width, height);
	}

	bgFill(bgColor1, bgColor2, bgColor3);

	slider.oninput = function (ev, ui) {
		context.clearRect(-width / 2, -height / 2, width, height);
		bgFill(bgColor1, bgColor2, bgColor3);
		sierpinski(p0, p1, p2, this.value);
	};
	
	const p0 = {
		x: 0,
		y: -321
		},
		p1 = {
			x: 278,
			y: 160
		},
		p2 = {
			x: -278,
			y: 160
		};


	const triGrd = context.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
	triGrd.addColorStop(0, "#F2657B");
	triGrd.addColorStop(0.25, "#EA5356");
	triGrd.addColorStop(1, "#B9C482");

	sierpinski(p0, p1, p2, slider.value);

	// drawTriangle(p0, p1, p2);

	function sierpinski(p0, p1, p2, limit) {

		if (limit > 0) {
			const pA = {
				x: (p0.x + p1.x) / 2,
				y: (p0.y + p1.y) / 2
				},
				pB = {
					x: (p1.x + p2.x) / 2,
					y: (p1.y + p2.y) / 2
				},
				pC = {
					x: (p2.x + p0.x) / 2,
					y: (p2.y + p0.y) / 2
				};

			sierpinski(p0, pA, pC, limit - 1);
			sierpinski(pA, p1, pB, limit - 1);
			sierpinski(pC, pB, p2, limit - 1);

		}
		else {
			drawTriangle(p0, p1, p2);
		}
	}


	function drawTriangle(p0, p1, p2) {

		context.fillStyle = triGrd;

		context.beginPath();
		context.moveTo(p0.x, p0.y);
		context.lineTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);

		context.fill();
		
		
		if (slider.value <= 4) {
			context.lineJoin = "round";
			context.lineWidth = 20;
			context.strokeStyle = "#C9CC95";
			context.lineWidth = 3;
			context.closePath();
			context.stroke();
		}
	}

};