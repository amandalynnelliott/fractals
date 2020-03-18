const bgColor1 = "#F3D6BF";
const bgColor2 = "#73777F";
const bgColor3 = "#303B51";

window.onload = function() {
    const canvas = document.getElementById("canvas");
    /** @type {CanvasRenderingContext2D} */
    const context = canvas.getContext("2d");
	let width = canvas.width = window.innerWidth;
	let height = canvas.height = window.innerHeight;

    const slider = document.getElementById('slider');

    window.onresize = function (ev, ui) {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		drawPage();
	};
	
    slider.oninput = function (ev, ui) {
		context.clearRect(-width / 2, -height / 2, width, height);
        drawPage();
	};

    function drawPage() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate(width / 2, height / 2);

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
        
        function bgFill(bgColor1, bgColor2, bgColor3) {
            const bgGrd = context.createRadialGradient(0, 0, 50, 0, 0, 700);
            bgGrd.addColorStop(0, bgColor1);
            bgGrd.addColorStop(0.5, bgColor2);
            bgGrd.addColorStop(1, bgColor3);
    
            context.fillStyle = bgGrd;
            context.fillRect(-width / 2, -height / 2, width, height);
        }
    
        bgFill(bgColor1, bgColor2, bgColor3);

        koch(p0, p1, slider.value);
        koch(p1, p2, slider.value);
        koch(p2, p0, slider.value);
    
        function koch(p0, p1, limit) {
    
            context.strokeStyle = "#F7F0DF" ;
            
            var dx = p1.x - p0.x,
                dy = p1.y - p0.y,
                dist = Math.sqrt(dx * dx + dy * dy),
                unit = dist / 3,
                angle = Math.atan2(dy, dx),
                pA = {
                    x: p0.x + dx / 3,
                    y: p0.y + dy / 3
                },
                pC = {
                    x: p1.x - dx / 3,
                    y: p1.y - dy / 3
                },
                pB = {
                    x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
                    y: pA.y + Math.sin(angle - Math.PI / 3) * unit
                };
    
            
            if (limit > 0) {
                koch(p0, pA, limit - 1);
                koch(pA, pB, limit - 1);
                koch(pB, pC, limit - 1);
                koch(pC, p1, limit - 1);
            } else if (limit < 0) {
                context.beginPath();
                context.moveTo(p0.x, p0.y);
                context.lineTo(p1.x, p1.y);
                context.stroke();
            } else {
                context.beginPath();
                context.moveTo(p0.x, p0.y);
                context.lineTo(pA.x, pA.y);
                context.lineTo(pB.x, pB.y);
                context.lineTo(pC.x, pC.y);
                context.lineTo(p1.x, p1.y);
                context.stroke();
            }
    
            
        }
    }

    // Single Koch curve demo 
    // var p0 = {
    //         x: 100,
    //         y: height * .75
    //     },
    //     p1 = {
    //         x: width - 100,
    //         y: height * .75
    //     };
    // koch(p0, p1, 0);


    // Koch Snowflake built from triangle

    drawPage();
};