'use strict';

/** Create custom component */
class RuleControl extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('rule-control');
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

customElements.define('rule-control', RuleControl);

class Rule {
    constructor() {
        this.angle = 0;
        this.sx = 1;
        this.sy = 1;
        this.tx = 0;
        this.ty = 0;
        this.weight = 1;
        this.color = "black";
    }
}

// Starting Rules = Barnsley Fern
var defaultRules = [new Rule()];

// The Rules the User Changes
var currentRules = [...defaultRules];

function setupRuleControl(rule) {
    const controlsContainer = document.getElementById('controls');
    const ruleControl = document.createElement('rule-control');
    const ruleNumber = ruleControl.shadowRoot.getElementById('rule-number');
    const deleteButton = ruleControl.shadowRoot.getElementById('delete-button');

    ruleNumber.innerText = `Rule ${currentRules.indexOf(rule) + 1}`;

    const translateX = ruleControl.shadowRoot.getElementById('translate-x');
    const translateXLabel = ruleControl.shadowRoot.getElementById('translate-x-label');
    translateX.value = rule.tx;
    translateXLabel.innerText = `Translate X: ${rule.tx}`
    translateX.oninput = function (ev) {
        rule.tx = Number(this.value);
        translateXLabel.innerText = `Translate X: ${rule.tx}`
    };

    const translateY = ruleControl.shadowRoot.getElementById('translate-y');
    const translateYLabel = ruleControl.shadowRoot.getElementById('translate-y-label');
    translateY.value = rule.ty;
    translateYLabel.innerText = `Translate Y: ${rule.ty}`
    translateY.oninput = function (ev) {
        rule.ty = Number(this.value);
        translateYLabel.innerText = `Translate Y: ${rule.ty}`
    };

    const ScaleX = ruleControl.shadowRoot.getElementById('scale-x');
    const ScaleXLabel = ruleControl.shadowRoot.getElementById('scale-x-label');
    ScaleX.value = rule.sx;
    ScaleXLabel.innerText = `Scale X: ${rule.sx}`
    ScaleX.oninput = function (ev) {
        rule.sx = Number(this.value);
        ScaleXLabel.innerText = `Scale X: ${rule.sx}`
    };

    const ScaleY = ruleControl.shadowRoot.getElementById('scale-y');
    const ScaleYLabel = ruleControl.shadowRoot.getElementById('scale-y-label');
    ScaleY.value = rule.sy;
    ScaleYLabel.innerText = `Scale Y: ${rule.sy}`
    ScaleY.oninput = function (ev) {
        rule.sy = Number(this.value);
        ScaleYLabel.innerText = `Scale Y: ${rule.sy}`
    };

    const Rotation = ruleControl.shadowRoot.getElementById('rotation');
    const RotationLabel = ruleControl.shadowRoot.getElementById('rotation-label');
    Rotation.value = rule.angle * 180 / Math.PI;
    RotationLabel.innerText = `Rotation: ${Rotation.value}`
    Rotation.oninput = function (ev) {
        rule.angle = Number(this.value) * Math.PI / 180;
        RotationLabel.innerText = `Rotation: ${this.value}`
    };

    deleteButton.addEventListener('click', function (ev) {
        controlsContainer.removeChild(ruleControl);
        currentRules.splice(currentRules.indexOf(rule), 1);
        console.log(currentRules);
    });

    controlsContainer.appendChild(ruleControl);
};

/** Use custom component for each rule */


/** Canvas */
window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.translate(width / 2, height);

    const toggleButton = document.getElementById('toggle-button');
    const restartButton = document.getElementById('restart-button');
    const addRuleButton = document.getElementById('add-rule');
    const hideButton = document.getElementById('hide');

    toggleButton.addEventListener('click', function (ev) {
        if (toggleButton.classList.contains('fa-pause')) {
            running = false;
            toggleButton.classList.remove('fa-pause');
            toggleButton.classList.add('fa-play');
        } else {
            running = true;
            toggleButton.classList.remove('fa-play');
            toggleButton.classList.add('fa-pause');
        }
    });

    restartButton.addEventListener('click', function (ev) {
        // Clear Canvas
        context.clearRect(-width / 2, -height, width, height);
        // Delete old rule controls
        const controlsContainer = document.getElementById('controls');
        const ruleControls = Array.from(document.getElementsByTagName('rule-control'));
        ruleControls.forEach(ruleControl => {
            controlsContainer.removeChild(ruleControl);
        });
        // Reset Rules to Default
        currentRules = [...defaultRules];
        currentRules.forEach(function (rule) {
            setupRuleControl(rule);
        });
    });

    hideButton.addEventListener('click', function (ev) {
        const controlsTable = document.getElementById('controls-table');
        controlsTable.style.visibility = controlsTable.style.visibility == 'hidden' ? 'visible' : 'hidden';
        const ruleControls = Array.from(document.getElementsByTagName('rule-control'));
        ruleControls.forEach(ruleControl => {
            ruleControl.style.visibility = ruleControl.style.visibility == 'hidden' ? 'visible' : 'hidden';
        });
        hideButton.innerText = hideButton.innerText == 'Hide' ? 'Show' : 'Hide';
    });

    addRuleButton.addEventListener('click', function (ev) {
        var newRule = new Rule();
        currentRules.push(newRule);
        setupRuleControl(newRule);
    });

    currentRules.forEach(function (rule) {
        setupRuleControl(rule);
    });



    // Fractal Generator 

    var x = Math.random();
    var y = Math.random();
    var running = true;

    iterate();

    function iterate() {
        if (running) {
            for (var i = 0; i < 100; i++) {
                const rule = getRule();

                const a = Math.cos(rule.angle) * rule.sx;
                const b = -Math.sin(rule.angle);
                const c = Math.sin(rule.angle);
                const d = Math.cos(rule.angle) * rule.sy;

                const x1 = x * a + y * b + rule.tx;
                const y1 = x * c + y * d + rule.ty;
                // x = x1;
                // y = y1;
                x = Math.random();
                y = Math.random();

                // console.log(x1, y1);

                plot(x1, y1, rule.color);
            }
        }

        requestAnimationFrame(iterate);
    }

    function getRule() {
        var rand = Math.random();
        for (var i = 0; i < currentRules.length; i++) {
            var rule = currentRules[i];
            if (rand < rule.weight) {
                return rule;
            }
            rand -= rule.weight;
        }
    }

    function plot(x, y, color) {
        context.fillStyle = color;
        context.fillRect(x * 50, -y * 50, 1, 1);
    }

};

