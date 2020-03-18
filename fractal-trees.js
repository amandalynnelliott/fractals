const bgColor1 = "#987A37";
const bgColor2 = "#455333";
const bgColor3 = "#43402F";
const branchColor = "#D1AA7B";

window.onload = function () {
    const canvas = document.getElementById("canvas");
    /** @type {CanvasRenderingContext2D} */
    const context = canvas.getContext("2d");
    const checkbox = this.document.getElementById('checkbox');
    const branchVarietyCheckbox = this.document.getElementById('branch-variety');
    const slider = document.getElementById('slider');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let p0 = {
        x: width / 2,
        y: height - 50
    };
    let p1 = {
        x: width / 2,
        y: 50
    };
    let randomAngle = checkbox.checked;
    let branchAngleA = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
    let branchAngleB = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
    let trunkRatio = 0.5;
    let branchVariety = branchVarietyCheckbox.checked;
    let iterations = slider.value;

    window.onresize = function (ev, ui) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        p0 = {
            x: width / 2,
            y: height - 50
        };
        p1 = {
            x: width / 2,
            y: 50
        };

        recalculate();
    };

    slider.oninput = function (ev, ui) {
        iterations = this.value;
        recalculate();
    };

    // Vary Angle Checkbox
    checkbox.onchange = function (ev, ui) {
        randomAngle = this.checked;
        if (randomAngle) {
            branchAngleA = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
            branchAngleB = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
        }
        recalculate();
    };

    // Vary Branch Length Checkbox
    branchVarietyCheckbox.onchange = function (ev, ui) {
        branchVariety = this.checked;
        recalculate();
    };

    recalculate();

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }

    function tree(p0, p1, limit, branchAngleA, branchAngleB, trunkRatio) {
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

            tree(pA, pC, limit - 1, branchAngleA, branchAngleB, trunkRatio);
            tree(pA, pB, limit - 1, branchAngleA, branchAngleB, trunkRatio);
        }
        else {
            context.beginPath();
            context.moveTo(pB.x, pB.y);
            context.lineTo(pA.x, pA.y);
            context.lineTo(pC.x, pC.y);
            context.stroke();
        }
    }

    function bgFill(bgColor1, bgColor2, bgColor3) {
        const bgGrd = context.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 700);
        bgGrd.addColorStop(0, bgColor1);
        bgGrd.addColorStop(0.5, bgColor2);
        bgGrd.addColorStop(1, bgColor3);
        context.fillStyle = bgGrd;
        context.fillRect(0, 0, width, height);
    }

    function recalculate() {
        context.clearRect(0, 0, width, height);
        branchAngleA = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
        branchAngleB = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
        trunkRatio = 0.5;

        bgFill(bgColor1, bgColor2, bgColor3);
        tree(p0, p1, iterations, branchAngleA, branchAngleB, trunkRatio);
    }
};