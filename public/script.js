var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log(ctx);
// ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
canvas.addEventListener("mousemove", function(evt) {
    // canvas.style.left = evt.layerX - 50 + "px";
    // canvas.style.top = evt.layerY - 50 + "px";
    draw(evt.layerX, evt.layerY, evt.buttons);
});
function draw(x, y, clicked) {
    if (clicked) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        var dataURL = canvas.toDataURL();
        console.log(dataURL);
        document.getElementById("signatures").value = dataURL;
        ctx.moveTo(x, y);
    }
}
