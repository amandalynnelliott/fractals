window.onload = function () {
    var canvas = document.getElementById("canvas"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    /** @type {CanvasRenderingContext2D} */
    const context = canvas.getContext("2d");

    const bgColor1 = "#987A37";
	const bgColor2 = "#455333";
    const bgColor3 = "#43402F";
    const branchColor = "#D1AA7B";

	function bgFill(bgColor1, bgColor2, bgColor3) {
		const bgGrd = context.createRadialGradient(width/2, height/2, 50, width/2, height/2, 700);
		bgGrd.addColorStop(0, bgColor1);
		bgGrd.addColorStop(0.5, bgColor2);
		bgGrd.addColorStop(1, bgColor3);
		context.fillStyle = bgGrd;
		context.fillRect(0, 0, width, height);
    }
    
    bgFill(bgColor1, bgColor2, bgColor3);

    function recalculate() {
        context.clearRect(0, 0, width, height);
        branchAngleA = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
        branchAngleB = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
        trunkRatio = 0.5;
        bgFill(bgColor1, bgColor2, bgColor3);
        tree(p0, p1, iterations);
    }

    const slider = document.getElementById('slider');

    var iterations = slider.value;

    slider.oninput = function (ev, ui) {
        iterations = this.value;
        recalculate();
    };

    const checkbox = this.document.getElementById('checkbox');

    checkbox.onchange = function (ev, ui) {
        randomAngle = this.checked;
        recalculate();
    };

    var randomAngle = checkbox.checked;

    const branchVarietyCheckbox = this.document.getElementById('branch-variety');

    var branchVariety = branchVarietyCheckbox.checked;

    branchVarietyCheckbox.onchange = function (ev, ui) {
        branchVariety = this.checked;
        recalculate();
    };

    var p0 = {
        x: width / 2,
        y: height - 50
    },
        p1 = {
            x: width / 2,
            y: 50
        },
        branchAngleA = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4,
        branchAngleB = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4,
        trunkRatio = 0.5;

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }

    tree(p0, p1, slider.value, branchColor);

    function tree(p0, p1, limit, branchColor) {
        context.strokeStyle = branchColor;
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(dy, dx),
            branchLength = dist * (1 - trunkRatio),
            pA = {
                x: p0.x + dx * trunkRatio,
                y: p0.y + dy * trunkRatio
            },
            pB = {
                x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
                y: pA.y + Math.sin(angle + branchAngleA) * branchLength
            },
            pC = {
                x: pA.x + Math.cos(angle - branchAngleB) * branchLength,
                y: pA.y + Math.sin(angle - branchAngleB) * branchLength
            }

        // always want to draw the trunk
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(pA.x, pA.y);
        context.stroke();

        if (limit > 0) {
            tree(pA, pC, limit - 1);
            tree(pA, pB, limit - 1);
        }
        else {
            context.beginPath();
            context.moveTo(pB.x, pB.y);
            context.lineTo(pA.x, pA.y);
            context.lineTo(pC.x, pC.y);
            context.stroke();
        }

        // To break perfect self-simularity
        // Makes it so no two branches are exactly alike

        if (branchVariety) {
            branchAngleA += randomRange(-0.02, 0.02);
            branchAngleB += randomRange(-0.02, 0.02);
            trunkRatio += randomRange(-0.05, 0.05);
            if (trunkRatio < 0) {
                trunkRatio = 0;
            }
            if (trunkRatio > 1) {
                trunkRatio = 1;
            }
        }
    }
};