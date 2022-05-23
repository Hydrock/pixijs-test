// Example https://embed.plnkr.co/II6lgj511fsQ7l0QCoRi/

var stage = new PIXI.Stage();
stage.scale.x = 10;
stage.scale.y = 10;
var canvas = document.getElementById('canvas');
var renderer = PIXI.autoDetectRenderer(600, 600, { view: canvas });
var g = new PIXI.Graphics();

g.lineStyle(0.2, 0xFFFF00);
g.beginFill(0xFF0000);
g.drawCircle(5, 5, 1);
g.drawCircle(25, 15, 0.3);
g.drawCircle(20, 20, 5);
g.endFill();
// g.drawPolygon([0, 0, 60, 0, 60, 60, 0, 60]);
// g.drawPolygon([15, 15, 0.75 * 60, 15, 0.75 * 60, 0.75 * 60, 15, 0.75 * 60]);
g.drawCircle(60 / 2, 60 / 2, 1);
g.endFill();
stage.addChild(g);

requestAnimationFrame(animate);


function animate() {
    requestAnimationFrame(
        animate);
    renderer.render(stage);
}

function zoom(s, x, y) {

    // s = s > 0 ? 2 : 0.5;

    s = s > 0 ? 1.05 : 0.95;
    console.log('s:', s);
    document.getElementById("oldScale").innerHTML = stage.scale.x.toFixed(4);
    document.getElementById("oldXY").innerHTML = '(' + stage.x.toFixed(4) + ',' + stage.y.toFixed(4) + ')';
    var worldPos = { x: (x - stage.x) / stage.scale.x, y: (y - stage.y) / stage.scale.y };
    var newScale = { x: stage.scale.x * s, y: stage.scale.y * s };

    var newScreenPos = { x: (worldPos.x) * newScale.x + stage.x, y: (worldPos.y) * newScale.y + stage.y };

    stage.x -= (newScreenPos.x - x);
    stage.y -= (newScreenPos.y - y);
    stage.scale.x = newScale.x;
    stage.scale.y = newScale.y;
    document.getElementById("scale").innerHTML = newScale.x.toFixed(4);
    document.getElementById("xy").innerHTML = '(' + stage.x.toFixed(4) + ',' + stage.y.toFixed(4) + ')';

    document.getElementById("c").innerHTML = c;
};

var lastPos = null
$(canvas)
    .mousewheel(function (e) {
        zoom(e.deltaY, e.offsetX, e.offsetY)
    }).mousedown(function (e) {
        lastPos = { x: e.offsetX, y: e.offsetY };
    }).mouseup(function (event) {
        lastPos = null;
    }).mousemove(function (e) {
        if (lastPos) {

            stage.x += (e.offsetX - lastPos.x);
            stage.y += (e.offsetY - lastPos.y);
            lastPos = { x: e.offsetX, y: e.offsetY };
        }

    });
