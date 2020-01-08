window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    const slider = document.getElementById('slider');

    const bgColor1 = "#8AAAC8";
    const bgColor2 = "#4D5F78";
    const bgColor3 = "#384554";
    const treeColor1 = "#E3B6CB";

    function bgFill(bgColor1, bgColor2, bgColor3) {
        const bgGrd = context.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 700);
        bgGrd.addColorStop(0, bgColor1);
        bgGrd.addColorStop(0.5, bgColor2);
        bgGrd.addColorStop(1, bgColor3);
        context.fillStyle = bgGrd;
        context.fillRect(0, 0, width, height);
    }

    bgFill(bgColor1, bgColor2, bgColor3);

    slider.oninput = function (ev, ui) {
        context.clearRect(0, 0, width, height);
        branchAngleA = this.value * -(Math.PI / 360)
        // branchAngleA = randomAngle ? randomRange(0, Math.PI / 2) : Math.PI / 4;
        bgFill(bgColor1, bgColor2, bgColor3);
        tree(width / 2 - 75, height, 150, 0, 10);
    };

    //var branchAngleA = randomRange(0, -this.Math.PI / 2);

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }

    //constant branch angle. 
    var branchAngleA = -this.Math.PI / 4;

    tree(width / 2 - 75, height, 150, 0, 10);


    function tree(x, y, size, angle, limit) {
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillStyle = treeColor1;
        context.fillRect(0, 0, size, -size);

        // left branch
        var x0 = 0,
            y0 = -size,
            size0 = Math.abs(Math.cos(branchAngleA) * size),
            angle0 = branchAngleA;

        if (limit > 0) {
            tree(x0, y0, size0, angle0, limit - 1);
        }
        else {
            context.save();
            context.translate(x0, y0);
            context.rotate(angle0);
            context.fillRect(0, 0, size0, -size0);
            context.restore();
        }

        // right branch
        var x1 = x0 + Math.cos(angle0) * size0,
            y1 = y0 + Math.sin(angle0) * size0,
            size1 = Math.abs(Math.sin(branchAngleA) * size),
            angle1 = angle0 + Math.PI / 2;

        if (limit > 0) {
            tree(x1, y1, size1, angle1, limit - 1);
        }
        else {
            context.save();
            context.translate(x1, y1);
            context.rotate(angle1);
            context.fillRect(0, 0, size1, -size1);
            context.restore();
        }

        
        context.restore();
        
    }
};