//canvas-test server

var Router = require('easy-router');

var port = 3030;

Router()
  .setMap('**/*', '**/*')
  .listen(port);

console.log('http://127.0.0.1:' + port + '/menu.html');
function renderDepth(canvas, scene, camera, maxDepth) {
    if (!canvas || !canvas.getContext)
        return;

    var ctx = canvas.getContext("2d");
    if (!ctx.getImageData)
        return;

    var w = canvas.attributes.width.value;
    var h = canvas.attributes.height.value;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, w, h);

    var imgdata = ctx.getImageData(0, 0, w, h);
    var pixels = imgdata.data;

    scene.initialize();
    camera.initialize();

    var i = 0;
    for (var y = 0; y < h; y++) {
        var sy = 1 - y / h;
        for (var x = 0; x < w; x++) {
            var sx = x / w;
            var ray = camera.generateRay(sx, sy);
            var result = scene.intersect(ray);
            if (result.geometry) {
                var depth = 255 - Math.min((result.distance / maxDepth) * 255, 255);
                pixels[i] = depth;
                pixels[i + 1] = depth;
                pixels[i + 2] = depth;
                pixels[i + 3] = 255;
            }
            i += 4;
        }
    }

    ctx.putImageData(imgdata, 0, 0);
}