/*global window,console,$,document:false */
var constants = {
    light: "rgb(200,200,200)",
    shade: 'rgba(255,255,255,0)',
    intervals: 8,
    canvasWidth: 480
};

var none = [];

var monkey_wrench = ["t2", "t12", "t17", "t19", "t20", "t18", "t21", "t23", "t22", "t24", "t25",
                    "t27", "t26", "t28", "t29", "t31", "t97", "t99", "t98", "t114", "t124", "t108",
                     "t109", "t111", "t100", "t101", "t103", "t102", "t104", "t105", "t107", "t106",
                     "t35", "t34", "t50", "t51", "t67", "t66", "t82", "t83", "t45", "t44", "t60",
                     "t61", "t77", "t76", "t92", "t93"];

var shoofly = ["t21", "t37", "t36", "t34", "t55", "t54", "t56", "t57", "t73", "t72", "t70",
                     "t71", "t43", "t27", "t44", "t42", "t85", "t101", "t84", "t82", "t91", "t90",
                     "t92", "t107"];


var flying_geese = ['t2', 't6', 't10', 't12',
                    't17', 't18', 't19', 't21', 't22', 't23', 't25', 't26', 't27', 't28', 't29', 't31',
                    't33', 't34', 't35', 't37', 't38', 't39', 't42', 't44',
                    't50', 't54', 't57', 't58', 't59', 't60', 't61', 't63',
                    't65', 't66', 't67', 't68', 't69', 't71', 't72', 't76',
                    't82', 't84', 't88', 't89', 't91', 't92', 't93', 't95',
                    't97', 't98', 't99', 't100', 't101', 't103', 't104', 't105',
                    't107', 't108', 't109', 't111', 't114', 't116', 't120', 't124'];

var bow_ties = ['t0', 't6', 't9', 't10', 't11', 't12', 't13', 't15',
                    't16', 't17', 't19', 't21', 't22', 't23', 't26', 't28',
                    't32', 't33', 't35', 't37', 't38', 't39', 't42', 't44',
                    't48', 't54', 't57', 't58', 't59', 't60', 't61', 't63',
                    't65', 't66', 't67', 't68', 't69', 't71', 't72', 't78',
                    't82', 't84', 't88', 't89', 't91', 't93', 't94', 't95',
                    't98', 't100', 't104', 't105', 't107', 't109', 't110', 't111',
                    't113', 't114', 't115', 't116', 't117', 't119', 't120', 't126'];

var crossroads = ["t2", "t4", "t10", "t12", "t17", "t19", "t20",
                  "t18", "t21", "t23", "t25", "t27", "t26", "t29", "t28",
                  "t31", "t33", "t35", "t34", "t36", "t37", "t39", "t41",
                  "t43", "t42", "t44", "t45", "t47", "t50", "t52", "t58",
                  "t60", "t66", "t68", "t74", "t76", "t81", "t83", "t82",
                  "t84", "t85", "t87", "t89", "t91", "t90", "t92", "t93",
                  "t95", "t97", "t99", "t98", "t100", "t101", "t103", "t105",
                  "t107", "t106", "t108", "t109", "t111", "t114", "t116", "t122", "t124"];

var northstar = ["t4", "t10", "t20", "t21", "t23", "t25", "t27", "t26", "t33", "t35", "t34", "t36", "t37", "t39", "t38", "t40", "t41", "t43", "t42", "t44", "t45", "t47", "t50", "t52", "t53", "t55", "t54", "t56", "t57", "t59", "t58", "t60", "t66", "t68", "t69", "t71", "t70", "t72", "t73", "t75", "t74", "t76", "t81", "t83", "t82", "t84", "t87", "t85", "t86", "t88", "t89", "t91", "t90", "t92", "t93", "t95", "t100", "t101", "t103", "t105", "t107", "t106", "t116", "t122"];

var nueva = [];
var counter = 0;

var shapeArray = [none, monkey_wrench, shoofly, flying_geese, bow_ties, crossroads, northstar];

var isPainting = false;
var mouseIsDown = false;
var currentColor;

var canvasElement;
var colorElement;

$(document).mousedown(function (event) {
    if (event.which == 1)
        mouseIsDown = true;
});

$(document).mouseup(function () {
    mouseIsDown = false;
});

function drawSingleTriangle(firstPoint, secondPoint, thirdPoint, isGray) {
    var fillColor = constants.light;
    var strokeColor = constants.shade;
    if (isGray) {
        fillColor = constants.shade;
        strokeColor = constants.light;
    }


    canvasElement.drawPath({
        layer: true,
        groups: ['tiles'],
        lineDash: [1, 2],
        fillStyle: fillColor,
        strokeStyle: strokeColor,
        strokeWidth: 1,
        lineDashOffset: [5],
        name: 't' + counter.toString(),
        p1: {
            type: 'line',
            x1: firstPoint.x,
            y1: firstPoint.y,
            x2: secondPoint.x,
            y2: secondPoint.y,
            x3: thirdPoint.x,
            y3: thirdPoint.y,
            x4: firstPoint.x,
            y4: firstPoint.y
        },
        mousedown: function (layer) {
            currentColor = colorElement.val();
            if (layer.fillStyle != currentColor) {
                isPainting = true;
                canvasElement.setLayer(layer, {
                    fillStyle: currentColor
                }).drawLayer(layer.name);
            } else {
                isPainting = false;
                canvasElement.setLayer(layer, {
                    fillStyle: fillColor
                }).drawLayer(layer.name);
            }
        },
        mouseover: function (layer) {
            if (mouseIsDown) {
                if (isPainting) {
                    if (layer.fillStyle != currentColor) {
                        canvasElement.setLayer(layer, {
                            fillStyle: currentColor
                        }).drawLayer(layer.name);
                    }
                } else if (!isPainting) {
                    if (layer.fillStyle != fillColor) {
                        canvasElement.setLayer(layer, {
                            fillStyle: fillColor
                        }).drawLayer(layer.name);
                    }
                }
            }
        },
        touchmove: function (layer) {
            if (isPainting) {
                if (layer.fillStyle != currentColor) {
                    canvasElement.setLayer(layer, {
                        fillStyle: currentColor
                    }).drawLayer(layer.name);
                }
            } else if (!isPainting) {
                if (layer.fillStyle != fillColor) {
                    canvasElement.setLayer(layer, {
                        fillStyle: fillColor
                    }).drawLayer(layer.name);
                }
            }
        }
    });

    counter++;
}

function drawWhiteTriangles(id) {
    var xPos = id % constants.intervals;
    var yPos = Math.floor(id / constants.intervals);

    var squareSize = constants.canvasWidth / constants.intervals;

    var topLeft = {
        x: squareSize * xPos,
        y: squareSize * yPos
    };
    var topRight = {
        x: squareSize * (xPos + 1),
        y: squareSize * yPos
    };
    var bottomLeft = {
        x: squareSize * xPos,
        y: squareSize * (yPos + 1)
    };
    var bottomRight = {
        x: squareSize * (xPos + 1),
        y: squareSize * (yPos + 1)
    };

    if (yPos % 2) {
        if (id % 2) {
            drawSingleTriangle(topLeft, bottomRight, topRight, true);
            drawSingleTriangle(topLeft, bottomRight, bottomLeft, true);
        } else {
            drawSingleTriangle(topLeft, topRight, bottomLeft, true);
            drawSingleTriangle(topRight, bottomLeft, bottomRight, true);
        }
    } else {
        if (id % 2) {
            drawSingleTriangle(topRight, bottomLeft, bottomRight, true);
            drawSingleTriangle(topLeft, bottomLeft, topRight, true);
        } else {
            drawSingleTriangle(topLeft, bottomRight, bottomLeft, true);
            drawSingleTriangle(topLeft, bottomRight, topRight, true);
        }
    }
}

$(window).load(function () {
    colorElement = $('#colorInput');
    var canContainer = document.getElementById('canvasContainer');
    var myCanvas = document.getElementById('myCanvas');
    var canWidth = canContainer.clientWidth - 30;
    myCanvas.width = canWidth;
    myCanvas.height = canWidth;
    constants.canvasWidth = canWidth;
    canvasElement = $(myCanvas);
    currentColor = colorElement.val();
    update();
});

function update() {
    nueva = [];
    constants.intervals = $('#gridSize').val();
    canvasElement.clearCanvas();
    canvasElement.removeLayers();
    counter = 0;
    var stepLimit = constants.intervals * constants.intervals;
    for (var i = 0; i < stepLimit; i++) {
        drawWhiteTriangles(i);
    }
    document.getElementById('submitBtn').addEventListener("click", uploadImage, false);
}

function selectTemplate() {
    var templateSelector = parseInt(document.getElementById('templateSelector').value);
    var codeArray = shapeArray[templateSelector];
    update();
    codeArray.forEach(function (entry) {
        canvasElement.addLayerToGroup(entry, 'g1');
    });
    canvasElement.setLayerGroup('g1', {
        fillStyle: '#36b'
    }).drawLayers();
}

function uploadImage() {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            var xsize = img.width;
            var ysize = img.height;

            var mainSize = (xsize > ysize) ? xsize : ysize;
            var scaleNr = canvasElement.width() / mainSize;

            canvasElement.removeLayer('bgImage');

            canvasElement.drawImage({
                name: 'bgImage',
                layer: true,
                source: img,
                scale: scaleNr,
                x: xsize * scaleNr / 2,
                y: ysize * scaleNr / 2
            }).moveLayer('bgImage', 0).drawLayers();
        };
        img.src = event.target.result;
        if (img.complete) {
            $(img).trigger('load');
        }
    };
    reader.readAsDataURL(document.getElementById('imageLoader').files[0]);
}