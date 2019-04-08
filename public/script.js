var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dataURL;

console.log(ctx);
// ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
canvas.addEventListener("mousemove", function(evt) {
    draw(evt.layerX, evt.layerY, evt.buttons);
});
function draw(x, y, clicked) {
    if (clicked) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        dataURL = canvas.toDataURL();
        console.log(dataURL);
        document.getElementById("signatures").value = dataURL;
        ctx.moveTo(x, y);
    }
}
